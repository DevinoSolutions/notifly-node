"use strict";
// CommonJS smoke: @notiflyio/sdk must expose exactly what @notiflyio/api exposes.
const assert = require("node:assert/strict");
const sdk = require("..");
const api = require("@notiflyio/api");

assert.equal(sdk, api, "require('@notiflyio/sdk') must be the @notiflyio/api module object");
assert.deepEqual(Object.keys(sdk).sort(), Object.keys(api).sort());
assert.equal(typeof sdk.Notifly, "function", "Notifly client class missing");
const client = new sdk.Notifly({ security: { secretKey: "sk_smoke_test" } });
assert.equal(typeof client.trigger, "function", "Notifly#trigger missing");
console.log(`cjs ok: ${Object.keys(sdk).length} exports`);
