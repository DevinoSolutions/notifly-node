// Type-level smoke (CommonJS consumer): the published declarations resolve through the package root.
import { Notifly, computeSubscriberHash } from "..";

const notifly: Notifly = new Notifly({ security: { secretKey: "sk_types" } });
const hash: Promise<string> = computeSubscriberHash("sk_types", "subscriber_1");
void notifly;
void hash;
