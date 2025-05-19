import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './feedback.css';

function Feedback() {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState('');
  const [statusColor, setStatusColor] = useState(''); 

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_wk03bwl',
        'template_zqn91tu',
        form.current,
        'KUvBzsjxwvCA3b6DE'
      )
      .then(
        () => {
          setStatusMessage('Message sent successfully!');
          setStatusColor('green');
          form.current.reset();
        },
        (error) => {
          setStatusMessage('Failed to send message. Please try again.');
          setStatusColor('red');
          console.error('EmailJS Error:', error);
        }
      );
  };

  return (
    <div className="feedback-page">
      <h2 className="feedback-page-title">We Value Your Feedback</h2>
      <form ref={form} onSubmit={sendEmail} className="feedback-form">
        <input type="text" name="user_name" placeholder="Your Name" required />
        <input type="email" name="user_email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required />
        <button type="submit">Send</button>
        {statusMessage && <p style={{ color: statusColor }}>{statusMessage}</p>}
      </form>
    </div>
  );
}

export default Feedback;
