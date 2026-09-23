# @notiflyio/sdk

Official Node.js / TypeScript client SDK for the [Notifly](https://notifly.io) notification API
(in-app inbox, push, email, SMS, chat).

**`@notiflyio/sdk` and [`@notiflyio/api`](https://www.npmjs.com/package/@notiflyio/api) are the same
client.** This package re-exports the `@notiflyio/api` top-level entry point unchanged: the same
`Notifly` client class, helpers and types, with the same behaviour, so anything you import from
`"@notiflyio/api"` you can import from `"@notiflyio/sdk"` instead.

Subpath imports (`@notiflyio/api/models/components`, `/models/errors`, `/models/operations`,
`/funcs/*`, `/core.js`) are **not** re-exported. If you need them (for example the typed error
classes for `instanceof` checks), install `@notiflyio/api` directly and import those paths from it.

## Install

```bash
npm install @notiflyio/sdk
```

Works with CommonJS (`require`) and ES modules (`import`), and ships TypeScript declarations.

## Quickstart

Store your environment's secret key (Dashboard → API Keys) as `NOTIFLY_SECRET_KEY`, then:

```js
// notifly-check.mjs (ES module: top-level await). Run: node notifly-check.mjs
import { Notifly } from "@notiflyio/sdk";

const secretKey = process.env.NOTIFLY_SECRET_KEY;
if (!secretKey) throw new Error("NOTIFLY_SECRET_KEY is not set");

const notifly = new Notifly({ security: { secretKey } });

const { result } = await notifly.workflows.list({ limit: 1 });
console.log(`Connected to Notifly: ${result.totalCount} workflow(s)`);
```

Trigger a workflow for a subscriber:

```js
await notifly.trigger({
  workflowId: "welcome",
  to: "subscriber_123",
  payload: { name: "Ada" },
});
```

CommonJS works the same way:

```js
const { Notifly } = require("@notiflyio/sdk");
```

## Versioning

`@notiflyio/sdk` depends on `@notiflyio/api` with a caret range, so installing it pulls in the
latest compatible `@notiflyio/api` release. For the full API reference, see the
[`@notiflyio/api`](https://www.npmjs.com/package/@notiflyio/api) package and
[notifly.io](https://notifly.io).

## License

This client SDK is MIT-licensed — see [LICENSE](LICENSE). The license covers this SDK only; the
Notifly platform and API it talks to are proprietary.
