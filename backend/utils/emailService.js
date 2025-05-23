import nodemailer from 'nodemailer';

export const sendEmailAlert = async (to, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"NewsHunt Alerts" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Email sending failed');
  }
};
