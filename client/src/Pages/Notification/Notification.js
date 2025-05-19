import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../context/firbase"; 
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notifications"));
        const notifData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            img: data.img || "https://via.placeholder.com/50",
            timestamp: data.timestamp ? data.timestamp.toDate().toLocaleString() : "No date",
          };
        });
        setNotifications(notifData);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notif-container">
      <h1 className="notif-pageTitle">Notifications</h1>
      <div className="notif-page">
        {loading ? (
          <p>Loading...</p>
        ) : notifications.length === 0 ? (
          <p className="no-notif-msg">No notifications to display.</p>
        ) : (
          notifications.map(({ id, name, img, timestamp }) => (
            <div className="notif-card" key={id}>
              <div className="notif-imgPart">
                <img src={img} alt={`Profile of ${name}`} />
              </div>
              <div className="notif-textPart">
                <p><strong>{name}</strong> added a post.</p>
                <div className="notif-date">
                  <strong>{timestamp}</strong>
                </div>
              </div>
              <div className="notif-btn">See Post</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
