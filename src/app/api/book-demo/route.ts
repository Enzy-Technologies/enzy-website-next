import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type Payload = {
  firstName: string;
  lastName: string;
  email: string;
  companySize: string;
  phone: string;
  contactPreference: "email" | "text";
  salesEmployeesRange: "1-10" | "10-50" | "50-100" | "100+";
};

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.DEMO_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Missing DEMO_WEBHOOK_URL" },
      { status: 500 }
    );
  }

  const body = (await req.json().catch(() => null)) as Payload | null;
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const required: Array<keyof Payload> = [
    "firstName",
    "lastName",
    "email",
    "companySize",
    "phone",
    "contactPreference",
    "salesEmployeesRange",
  ];

  for (const k of required) {
    const v = body[k];
    if (typeof v !== "string" || v.trim().length === 0) {
      return NextResponse.json({ error: `Missing ${k}` }, { status: 400 });
    }
  }

  const forwardPayload = {
    ...body,
    source: "enzy-website",
    path: "/book-demo",
    submittedAt: new Date().toISOString(),
    ip: req.headers.get("x-forwarded-for") ?? null,
    userAgent: req.headers.get("user-agent") ?? null,
  };

  const secret = process.env.DEMO_WEBHOOK_SECRET;
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(secret ? { "X-Enzy-Webhook-Secret": secret } : null),
    },
    body: JSON.stringify(forwardPayload),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Webhook error (${res.status})` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

