import axios from "axios";

const sendMailNotification = async ({ name, img, content }) => {
  try {
    await axios.post("https://localhost:5000/send-mail", {
      tweetAuthor: name,
      content,
      authorImage: img,
    });
    console.log("Notification email sent.");
  } catch (error) {
    console.error("Failed to send notification email:", error);
  }
};

export default sendMailNotification;
