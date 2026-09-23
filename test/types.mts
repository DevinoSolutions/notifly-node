// Type-level smoke (ESM consumer). Also type-checks the README quickstart calls, so the
// documented usage cannot drift from the real @notiflyio/api surface.
import { Notifly, isValidDeviceToken } from "../index.js";

const ok: boolean = isValidDeviceToken("fcm", "token");
void ok;

export async function readmeQuickstart(secretKey: string): Promise<void> {
  const notifly = new Notifly({ security: { secretKey } });

  const { result } = await notifly.workflows.list({ limit: 1 });
  const count: number = result.totalCount;
  void count;

  await notifly.trigger({
    workflowId: "welcome",
    to: "subscriber_123",
    payload: { name: "Ada" },
  });
}
