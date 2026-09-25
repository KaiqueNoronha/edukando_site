#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
ENV_FILE="$(dirname "$0")/.env"

export PATH="${HOME}/.local/bin:${PATH}"

if ! command -v aws >/dev/null 2>&1; then
  echo "AWS CLI não encontrado. Instale: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html"
  exit 1
fi

if [[ ! -f "$ENV_FILE" ]]; then
  cp "$(dirname "$0")/.env.example" "$ENV_FILE"
  echo "Criei $ENV_FILE — edite DOMAIN (ou deixe vazio) e rode de novo."
  exit 1
fi

# shellcheck disable=SC1090
source "$ENV_FILE"

STACK_NAME="${STACK_NAME:-edukando-site-static}"
AWS_REGION="${AWS_REGION:-us-east-1}"
DOMAIN="${DOMAIN:-}"
WWW_DOMAIN="${WWW_DOMAIN:-}"

echo "→ Conta AWS:"
aws sts get-caller-identity

PARAMS=(
  "ParameterKey=DomainName,ParameterValue=${DOMAIN}"
  "ParameterKey=WwwDomainName,ParameterValue=${WWW_DOMAIN}"
)

echo "→ Criando/atualizando stack CloudFormation: $STACK_NAME (região $AWS_REGION)..."

aws cloudformation deploy \
  --stack-name "$STACK_NAME" \
  --template-file "$(dirname "$0")/cloudformation.yaml" \
  --parameter-overrides "${PARAMS[@]}" \
  --capabilities CAPABILITY_IAM \
  --region "$AWS_REGION" \
  --no-fail-on-empty-changeset

BUCKET="$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" \
  --output text)"

DIST_ID="$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='DistributionId'].OutputValue" \
  --output text)"

CF_DOMAIN="$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDomain'].OutputValue" \
  --output text)"

grep -v '^S3_BUCKET=\|^CLOUDFRONT_DISTRIBUTION_ID=\|^CLOUDFRONT_DOMAIN=' "$ENV_FILE" > "${ENV_FILE}.tmp" || true
mv "${ENV_FILE}.tmp" "$ENV_FILE"
{
  echo "S3_BUCKET=$BUCKET"
  echo "CLOUDFRONT_DISTRIBUTION_ID=$DIST_ID"
  echo "CLOUDFRONT_DOMAIN=$CF_DOMAIN"
} >> "$ENV_FILE"

echo ""
echo "✓ Infraestrutura pronta"
echo "  Bucket:     $BUCKET"
echo "  CloudFront: https://$CF_DOMAIN"
echo "  Dist ID:    $DIST_ID"

if [[ -n "$DOMAIN" ]]; then
  echo ""
  echo "→ Próximo passo DNS (domínio $DOMAIN):"
  echo "  1. No ACM (us-east-1), valide o certificado — adicione os CNAME de validação no DNS."
  echo "  2. CNAME: $DOMAIN → $CF_DOMAIN"
  if [[ -n "$WWW_DOMAIN" ]]; then
    echo "  3. CNAME: $WWW_DOMAIN → $CF_DOMAIN"
  fi
fi

echo ""
echo "→ Publique o site: ./deploy/aws/deploy.sh"
