import nodemailer from 'nodemailer';

// Email Setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Verification Email
export const sendVerificationEmail = async (email, userId) => {
  const url = `http://localhost:${process.env.PORT}/api/auth/verify/${userId}`;
  const message = `Click the following link to verify your account: ${url}`;
  
  await transporter.sendMail({
    from: `"Wallet App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify your email',
    text: message,
  });
};

// Send Transaction Email
export const sendTransactionEmail = async (email, status, amount) => {
  const message = `Your transaction of ${amount} was ${status}.`;
  
  await transporter.sendMail({
    from: `"Wallet App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Transaction ${status}`,
    text: message,
  });
};
