export function generateOTP() {
    const otp = Math.floor(10000 + Math.random() * 90000); // 5 xonali raqam yaratish
    return otp.toString(); // Raqamni string formatiga aylantirish
}
