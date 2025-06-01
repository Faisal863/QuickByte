import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || "21bd1a665dcsmc@gmail.com",
        pass: process.env.EMAIL_PASS || "fpqrcdyloqemndpg",
      },
    });

    await transporter.sendMail({
      from: `"QuickByte" <${process.env.EMAIL_USER || "21bd1a665dcsmc@gmail.com"}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log('Email sent to:', to);
  } catch (err) {
    console.error('Email sending error:', err);
  }
};

export default sendEmail;
