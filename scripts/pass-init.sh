#!/usr/bin/env bash
set -euo pipefail

PASS_APP_ENTRY="${PASS_APP_ENTRY:-apps/sonix/local}"

if ! command -v pass >/dev/null 2>&1; then
  echo "ERROR: 'pass' CLI not found in PATH." >&2
  exit 1
fi

if pass show "${PASS_APP_ENTRY}" >/dev/null 2>&1; then
  echo "Pass entry already exists: ${PASS_APP_ENTRY}"
else
  cat <<'EOF' | pass insert -m "${PASS_APP_ENTRY}"
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
OPENAI_API_KEY=
GEMINI_API_KEY=
EOF
  echo "Created pass entry: ${PASS_APP_ENTRY}"
fi

echo
echo "Next:"
echo "1) Edit values:"
echo "   pass edit ${PASS_APP_ENTRY}"
echo "2) Generate .env.local if you are wiring real providers:"
echo "   ./scripts/env-sync.sh"