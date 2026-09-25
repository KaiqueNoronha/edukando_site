# Deploy AWS — Edukando (landing estática)

Stack: **S3 + CloudFront** (mesmo padrão do Fora do Jogo / Amaré Saúde).

## Pré-requisitos

- AWS CLI v2 (`~/.local/bin/aws`)
- Credenciais IAM (ex.: `fora-do-jogo-deploy`)

## 1. Infraestrutura (uma vez)

```bash
chmod +x deploy/aws/setup.sh deploy/aws/deploy.sh
./deploy/aws/setup.sh
```

Sem `DOMAIN` no `.env`, o site fica só na URL `*.cloudfront.net`.

## 2. Publicar

```bash
./deploy/aws/deploy.sh
```

Faz `npm run build` (export estático → `out/`), sync no S3 e invalida o CloudFront.

## Domínio customizado (opcional)

1. Preencha `DOMAIN=` (e opcionalmente `WWW_DOMAIN=`) em `deploy/aws/.env`
2. Rode `./deploy/aws/setup.sh` de novo
3. Valide o certificado ACM (CNAME no DNS)
4. Aponte o domínio como CNAME para `CLOUDFRONT_DOMAIN`
