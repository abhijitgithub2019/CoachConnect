// import { PrismaClient } from "@prisma/client";
// import crypto from "crypto";

// const prisma = new PrismaClient();

// export async function POST(request) {
//   try {
//     console.log("✅ [API] /api/createPayment hit");

//     // Step 1: Parse JSON body
//     const body = await request.json();
//     console.log("📦 Request body:", body);

//     let { amount, userId } = body;
//     userId = "cmhqc6zxk0002sz5k47pn85fx";
//     if (!amount || !userId) {
//       console.error("❌ Missing amount or userId");
//       return Response.json(
//         { error: "Missing amount or userId" },
//         { status: 400 }
//       );
//     }

//     // Step 2: Load environment variables
//     const isLocal = process.env.NEXT_PUBLIC_ENV_MODE === "local";
//     const merchantId = isLocal
//       ? process.env.PHONEPE_MERCHANT_ID_SANDBOX
//       : process.env.PHONEPE_MERCHANT_ID_PROD;
//     const saltKey = isLocal
//       ? process.env.PHONEPE_SALT_KEY_SANDBOX
//       : process.env.PHONEPE_SALT_KEY_PROD;
//     const baseUrl = isLocal
//       ? process.env.PHONEPE_BASE_URL_SANDBOX
//       : process.env.PHONEPE_BASE_URL_PROD;
//     const redirectUrl = isLocal
//       ? process.env.PHONEPE_REDIRECT_URL_SANDBOX
//       : process.env.PHONEPE_REDIRECT_URL_PROD;

//     console.log("isLocal:", isLocal, "baseUrl:", baseUrl);

//     console.log("🔑 ENV:", {
//       merchantId,
//       baseUrl,
//       redirectUrl,
//       saltKeyDefined: !!saltKey,
//     });

//     if (!merchantId || !saltKey || !baseUrl) {
//       console.error("❌ Missing PhonePe environment variables");
//       return Response.json(
//         { error: "Missing PhonePe environment variables" },
//         { status: 500 }
//       );
//     }

//     // Step 3: Prepare transaction
//     const merchantTransactionId = "TXN_" + Date.now();
//     console.log("🆔 Transaction ID:", merchantTransactionId);

//     // Step 4: Optional — save in DB (you can comment this if DB not ready)
//     // await prisma.order.create({
//     //   data: {
//     //     userId,
//     //     merchantTxnId: merchantTransactionId,
//     //     amount,
//     //     status: "PENDING",
//     //   },
//     // });

//     // Step 5: Build payload
//     const payload = {
//       merchantId,
//       merchantTransactionId,
//       merchantUserId: userId || "guest_" + Date.now(),
//       amount: amount * 100,
//       redirectUrl,
//       redirectMode: "POST",
//       callbackUrl: redirectUrl,
//       paymentInstrument: { type: "PAY_PAGE" },
//     };
//     console.log("📤 Payload:", payload);

//     // Step 6: Encode payload and create checksum
//     const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString(
//       "base64"
//     );

//     const stringToSign = payloadBase64 + "/pg/v1/pay" + saltKey;
//     console.log("🧮 StringToSign:", stringToSign);

//     const checksum =
//       crypto
//         .createHash("sha256")
//         .update(payloadBase64 + "/pg/v1/pay" + saltKey)
//         .digest("hex") + "###1";

//     console.log("✅ Encoded Payload:", payloadBase64.slice(0, 100) + "...");
//     console.log("✅ Checksum:", checksum);

//     // Step 7: Call PhonePe API
//     const response = await fetch(`${baseUrl}/pg/v1/pay`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-VERIFY": checksum,
//         "X-MERCHANT-ID": merchantId,
//       },
//       body: JSON.stringify({ request: payloadBase64 }),
//     });

//     console.log("📡 Sent request to:", `${baseUrl}/pg/v1/pay`);
//     console.log("📡 Response status:", response.status);

//     const data = await response.json().catch((err) => {
//       console.error("❌ JSON Parse Error:", err);
//       throw new Error("Invalid JSON from PhonePe");
//     });

//     console.log("💬 PhonePe Response:", data);

//     // Step 8: Handle PhonePe response
//     if (data.success && data.data?.instrumentResponse?.redirectInfo?.url) {
//       console.log(
//         "✅ Payment URL:",
//         data.data.instrumentResponse.redirectInfo.url
//       );
//       return Response.json({
//         url: data.data.instrumentResponse.redirectInfo.url,
//       });
//     }

//     // If failure
//     return Response.json(
//       { error: "PhonePe returned error", code: data.code || "UNKNOWN", data },
//       { status: 400 }
//     );
//   } catch (err) {
//     console.error("❌ createPayment API error:", err);
//     return Response.json(
//       { error: err.message || "Internal Server Error", stack: err.stack },
//       { status: 500 }
//     );
//   }
// }

import crypto from "crypto";

export async function POST(request) {
  try {
    const { amount = 100, userId = "guest" } = await request.json();

    // Sandbox credentials
    const merchantId = process.env.PHONEPE_MERCHANT_ID_SANDBOX;
    const saltKey = process.env.PHONEPE_SALT_KEY_SANDBOX;
    const baseUrl = process.env.PHONEPE_BASE_URL_SANDBOX;
    const redirectUrl = process.env.PHONEPE_REDIRECT_URL_SANDBOX;

    const merchantTransactionId = "TXN_" + Date.now();

    const payload = {
      merchantId,
      merchantTransactionId,
      merchantUserId: userId,
      amount: amount * 100, // convert to paise
      redirectUrl,
      redirectMode: "POST",
      callbackUrl: redirectUrl,
      paymentInstrument: { type: "PAY_PAGE" },
    };

    const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");
    const checksum =
      crypto
        .createHash("sha256")
        .update(payloadBase64 + "/pg/v1/pay" + saltKey)
        .digest("hex") + "###1";

    const response = await fetch(`${baseUrl}/pg/v1/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
      body: JSON.stringify({ request: payloadBase64 }),
    });

    const data = await response.json();
    console.log("💬 PhonePe sandbox response:", data);

    if (data.success && data.data?.instrumentResponse?.redirectInfo?.url) {
      return Response.json({ url: data.data.instrumentResponse.redirectInfo.url });
    }

    return Response.json({ error: data.code, data }, { status: 400 });
  } catch (err) {
    console.error("❌ createPayment error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

