export async function GET() {
    return Response.json({
      envMode: process.env.NEXT_PUBLIC_ENV_MODE,
      merchantId: process.env.PHONEPE_MERCHANT_ID_SANDBOX,
      baseUrl: process.env.PHONEPE_BASE_URL_SANDBOX,
    });
  }