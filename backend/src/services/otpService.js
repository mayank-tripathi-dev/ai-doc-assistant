const prisma = require('../config/database');

function generateOTPCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function createOTP(email, type = 'LOGIN') {
  // Invalidate any existing OTPs for this email
  await prisma.oTP.updateMany({
    where: { email, verified: false },
    data: { verified: true },
  });

  const code = generateOTPCode();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const otp = await prisma.oTP.create({
    data: {
      email,
      code,
      type,
      expiresAt,
    },
  });

  return otp;
}

async function verifyOTPCode(email, code) {
  const otp = await prisma.oTP.findFirst({
    where: {
      email,
      code,
      verified: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!otp) {
    return null;
  }

  // Mark as verified
  await prisma.oTP.update({
    where: { id: otp.id },
    data: { verified: true },
  });

  return otp;
}

async function sendOTPEmail(email, code) {
  // In development, log to console
  if (process.env.NODE_ENV !== 'production') {
    console.log('\n========================================');
    console.log(`  OTP Code for ${email}: ${code}`);
    console.log('========================================\n');
    return true;
  }

  // In production, integrate with email service (SendGrid, Resend, etc.)
  // For now, still log it
  console.log(`[PRODUCTION] Would send OTP ${code} to ${email}`);
  return true;
}

async function sendMagicLinkEmail(email, token) {
  const link = `${process.env.FRONTEND_URL}/auth/callback?token=${token}&type=magic-link`;

  if (process.env.NODE_ENV !== 'production') {
    console.log('\n========================================');
    console.log(`  Magic Link for ${email}:`);
    console.log(`  ${link}`);
    console.log('========================================\n');
    return true;
  }

  console.log(`[PRODUCTION] Would send magic link to ${email}: ${link}`);
  return true;
}

module.exports = {
  generateOTPCode,
  createOTP,
  verifyOTPCode,
  sendOTPEmail,
  sendMagicLinkEmail,
};
