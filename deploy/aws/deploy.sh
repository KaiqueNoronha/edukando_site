#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
ENV_FILE="$(dirname "$0")/.env"

export PATH="${HOME}/.local/bin:${PATH}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Rode primeiro: ./deploy/aws/setup.sh"
  exit 1
fi

# shellcheck disable=SC1090
source "$ENV_FILE"

AWS_REGION="${AWS_REGION:-us-east-1}"
S3_BUCKET="${S3_BUCKET:-}"
DIST_ID="${CLOUDFRONT_DISTRIBUTION_ID:-}"

if [[ -z "$S3_BUCKET" || -z "$DIST_ID" ]]; then
  echo "S3_BUCKET ou CLOUDFRONT_DISTRIBUTION_ID ausente em $ENV_FILE. Rode setup.sh."
  exit 1
fi

echo "→ Build (Next.js static export → out/)..."
cd "$ROOT"
npm run build

if [[ ! -d out ]]; then
  echo "Pasta out/ não encontrada. Confira next.config.ts (output: 'export')."
  exit 1
fi

echo "→ Upload para s3://$S3_BUCKET ..."
aws s3 sync out/ "s3://$S3_BUCKET" \
  --delete \
  --region "$AWS_REGION" \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html" \
  --exclude "*.html" \
  --exclude "404.html" \
  --exclude "404/index.html"

# HTML com cache curto (Next export)
while IFS= read -r -d '' file; do
  key="${file#out/}"
  aws s3 cp "$file" "s3://$S3_BUCKET/$key" \
    --region "$AWS_REGION" \
    --cache-control "public,max-age=0,must-revalidate" \
    --content-type "text/html; charset=utf-8"
done < <(find out -type f -name '*.html' -print0)

echo "→ Invalidando cache CloudFront ($DIST_ID)..."
aws cloudfront create-invalidation \
  --distribution-id "$DIST_ID" \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text

CF_URL="${CLOUDFRONT_DOMAIN:-}"
echo ""
echo "✓ Deploy concluído"
if [[ -n "$CF_URL" ]]; then
  echo "  URL: https://$CF_URL"
fi
if [[ -n "${DOMAIN:-}" ]]; then
  echo "  Domínio (após DNS): https://${DOMAIN}"
fi
