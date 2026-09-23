#!/usr/bin/env bash
# Consumer smoke: install @notiflyio/sdk into a fresh project BY NAME and check that CommonJS,
# ESM and TypeScript (nodenext) consumers all see the same top-level exports as @notiflyio/api.
#
# Usage: test/consumer-smoke.sh <install-spec>
#   <install-spec> is a packed tarball path (CI, before publish) or `@notiflyio/sdk@<version>`
#   (after publish, against the registry).
set -euo pipefail

spec="${1:?usage: consumer-smoke.sh <tarball-path | @notiflyio/sdk@version>}"
case "$spec" in
  *.tgz) spec="$(cd "$(dirname "$spec")" && pwd)/$(basename "$spec")" ;;
esac

dir="$(mktemp -d)"
trap 'rm -rf "$dir"' EXIT
cd "$dir"
npm init -y >/dev/null
npm install --no-audit --no-fund "$spec" typescript@5.8.3 >/dev/null

node -e '
const assert = require("node:assert/strict");
const sdk = require("@notiflyio/sdk");
const api = require("@notiflyio/api");
assert.equal(sdk, api);
console.log("cjs  ok:", Object.keys(sdk).sort().join(","));
'

node --input-type=module -e '
import assert from "node:assert/strict";
import * as sdk from "@notiflyio/sdk";
import * as api from "@notiflyio/api";
import { Notifly } from "@notiflyio/sdk";
assert.deepEqual(Object.keys(sdk).sort(), Object.keys(api).sort());
assert.equal(Notifly, api.Notifly);
console.log("esm  ok:", Object.keys(sdk).sort().join(","));
'

cat > check.mts <<'EOF'
import { Notifly, computeSubscriberHash } from "@notiflyio/sdk";
const notifly: Notifly = new Notifly({ security: { secretKey: "sk_consumer" } });
const hash: Promise<string> = computeSubscriberHash("sk_consumer", "subscriber_1");
void notifly;
void hash;
EOF
npx tsc --module nodenext --moduleResolution nodenext --target es2022 --lib es2022,dom --strict --noEmit check.mts
echo "tsc  ok: @notiflyio/sdk types resolve by package name"
