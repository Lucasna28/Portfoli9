import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Opret en transporter til at sende emails
const transporter = nodemailer.createTransport({
  host: "smtp.mail.me.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Valider input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Navn, email og besked er påkrævet" },
        { status: 400 }
      );
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Brug din egen iCloud email som afsender
      replyTo: email, // Sæt reply-to til afsenderens email
      to: "lucas.n.a@icloud.com",
      subject: subject || `Ny besked fra ${name} via portfolio`,
      text: `
        Navn: ${name}
        Email: ${email}
        Emne: ${subject || 'Ingen emne angivet'}
        
        Besked:
        ${message}
      `,
      html: `
        <h3>Ny besked fra din portfolio</h3>
        <p><strong>Navn:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Emne:</strong> ${subject || 'Ingen emne angivet'}</p>
        <br/>
        <p><strong>Besked:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sendt med succes" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: "Der opstod en fejl ved afsendelse af email" },
      { status: 500 }
    );
  }
} 