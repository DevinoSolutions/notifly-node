// ESM smoke: named, namespace and default imports resolve exactly as they do from @notiflyio/api.
import assert from "node:assert/strict";
import * as sdk from "../index.js";
import * as api from "@notiflyio/api";
import sdkDefault, { Notifly } from "../index.js";
import apiDefault from "@notiflyio/api";

assert.deepEqual(Object.keys(sdk).sort(), Object.keys(api).sort());
assert.equal(Notifly, api.Notifly, "named import Notifly must be the @notiflyio/api class");
assert.equal(sdkDefault, apiDefault, "default import must be the @notiflyio/api module object");
console.log(`esm ok: ${Object.keys(sdk).length} namespace keys`);
