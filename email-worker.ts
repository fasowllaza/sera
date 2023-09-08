import amqp from 'amqplib'
const nodemailer = require('nodemailer');

async function main() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'email-queue';

  await channel.assertQueue(queue, { durable: true });
  console.log(`Waiting for messages in ${queue}. To exit, press CTRL+C`);

  channel.consume(queue, (message) => {
    if (message !== null) {
      const emailData = JSON.parse(message.content.toString());

      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'noe.waelchi38@ethereal.email',
            pass: 'QRZe8FBE5VPgKmrGQP'
        }
      });

      let mailOptions = {
        from: 'noe.waelchi38@ethereal.email',
        to: 'saya@yopmail.com',
        subject: 'Test',
        text: 'your account created'
      };

      transporter.sendMail(mailOptions, (error:any, info:any) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      channel.ack(message);
    }
  });
}

main().catch(console.error);
