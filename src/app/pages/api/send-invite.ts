import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, type } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      // Setup transporter for Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.GMAIL_USER, // Your Gmail address
          pass: process.env.GMAIL_PASS, // Your Gmail password or App password
        },
      });

      // Send email
      const info = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: `Invitation to join as a ${type}`,
        text: `You have been invited to join our platform as a ${type}. Please follow the link to complete your registration.`,
        html: `<p>You have been invited to join our platform as a ${type}. Please <a href="https://your-platform-url.com/register">click here</a> to complete your registration.</p>`,
      });

      console.log('Message sent: %s', info.messageId);
      res.status(200).json({ message: 'Invite sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending invite' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
