const express = require('express');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const generateEmailHTML = require('../Template/mailTemplate');

const router = express.Router();

admin.initializeApp({
  credential: admin.credential.cert(require('use your path')),
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '<email>',
    pass: '<password>',
  },
});

router.post('/send-mail', async (req, res) => {
  try {
    const { content, tweetAuthor, authorImage } = req.body;
    const subject = "New Tweet on X (Twitter Clone)";
    const users = [];
    const listAllUsers = async (nextPageToken) => {
      const result = await admin.auth().listUsers(1000, nextPageToken);
      result.users.forEach(userRecord => {
        if (userRecord.email) {
          users.push({ email: userRecord.email, name: userRecord.displayName || "User" });
        }
      });
      if (result.pageToken) {
        await listAllUsers(result.pageToken);
      }
    };
    await listAllUsers();

    const mailPromises = users.map(user => {
      const htmlContent = generateEmailHTML({
        name: user.name,
        tweet: content,
        img: authorImage,
      });

      return transporter.sendMail({
        from: '"X(Twitter Clone) App" <kinghjnpkkt@gmail.com>',
        to: user.email,
        subject,
        html: htmlContent,
      });
    });

    await Promise.all(mailPromises);
    res.status(200).json({ message: 'Emails sent to all registered users.' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'Failed to send emails.' });
  }
});

module.exports = router;
