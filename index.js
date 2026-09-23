"use strict";
// @notiflyio/sdk is the same client as @notiflyio/api under a second package name.
// Re-exporting the module object itself (not a copy) keeps both names identical at runtime:
// CommonJS `require` gets the very same exports, and Node's ESM loader detects this
// `module.exports = require(...)` form as a re-export, so named ESM imports resolve exactly
// as they do from @notiflyio/api.
module.exports = require("@notiflyio/api");
