// import { PrismaClient } from "@prisma/client";
// import crypto from "crypto";

// const prisma = new PrismaClient();

// export async function POST(request) {
//   try {
//     const { transactionId } = await request.json();
//     if (!transactionId)
//       return Response.json({ error: "Missing transactionId" }, { status: 400 });

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

//     const path = `/pg/v1/status/${merchantId}/${transactionId}`;
//     const checksum =
//       crypto
//         .createHash("sha256")
//         .update(path + saltKey)
//         .digest("hex") + "###1";

//     console.log("Merchant:", merchantId);
//     console.log("Base URL:", baseUrl);
//     const response = await fetch(`${baseUrl}${path}`, {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         "X-VERIFY": checksum,
//         "X-MERCHANT-ID": merchantId,
//       },
//     });

//     const data = await response.json();

//     if (data.success && data.code === "PAYMENT_SUCCESS") {
//       // ✅ Update order in database
//       await prisma.order.update({
//         where: { merchantTxnId: transactionId },
//         data: {
//           status: "SUCCESS",
//           paymentMode: data.data?.paymentInstrument?.type || "UNKNOWN",
//         },
//       });

//       return Response.json({
//         success: true,
//         message: "Payment successful",
//         details: data.data,
//       });
//     } else {
//       await prisma.order.updateMany({
//         where: { merchantTxnId: transactionId },
//         data: { status: "FAILED" },
//       });

//       return Response.json({
//         success: false,
//         message: "Payment not completed",
//         details: data.data,
//       });
//     }
//   } catch (err) {
//     console.error("Verification error:", err);
//     return Response.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

import crypto from "crypto";

export async function POST(request) {
  try {
    const { merchantTransactionId } = await request.json();

    const merchantId = process.env.PHONEPE_MERCHANT_ID_SANDBOX;
    const saltKey = process.env.PHONEPE_SALT_KEY_SANDBOX;
    const baseUrl = process.env.PHONEPE_BASE_URL_SANDBOX;

    const path = `/pg/v1/status/${merchantId}/${merchantTransactionId}`;
    const checksum =
      crypto
        .createHash("sha256")
        .update(path + saltKey)
        .digest("hex") + "###1";

    const response = await fetch(`${baseUrl}${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": merchantId,
      },
    });

    const data = await response.json();
    console.log("✅ Verify Response:", data);

    if (data.success) {
      return Response.json({ status: data.data.state });
    }

    return Response.json({ error: data.code, message: data.message }, { status: 400 });
  } catch (err) {
    console.error("❌ verifyPayment error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
