import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../context/firbase"; 

const sendNotification = async ({ name, img }) => {
  try {
    await addDoc(collection(db, "notifications"), {
      name,
      img,
      timestamp: serverTimestamp(),
    });
    console.log("Notification created");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

export default sendNotification;
