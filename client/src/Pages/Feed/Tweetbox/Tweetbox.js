import React, { useState } from "react";
import "./Tweetbox.css";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import axios from "axios";
import { useUserAuth } from "../../../context/UserAuthContext";
import sendNotification from "../../../hooks/sendNotification"; 
import sendMailNotification from "../../../hooks/sendMailNotification"; 

const Tweetbox = () => {
  const [post, setpost] = useState("");
  const [imageurl, setimageurl] = useState("");
  const [isloading, setisloading] = useState(false);
  const { user } = useUserAuth();

  const defaultAvatar = "https://www.gravatar.com/avatar/?d=mp&f=y";
  const userprofilepic = user?.photoURL || defaultAvatar;
  const finalName = user?.displayName || "Anonymous";
  const finalUsername = user?.email?.split("@")[0] || "unknown";

  const handleuploadimage = (e) => {
    setisloading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=b0ea2f6cc0f276633b2a8a86d2c43335",
        formData
      )
      .then((res) => {
        setimageurl(res.data.data.display_url);
        setisloading(false);
      })
      .catch((e) => {
        console.log(e);
        setisloading(false);
      });
  };

  const handletweet = async (e) => {
    e.preventDefault();

    if (!finalName) {
      console.error("User name not available");
      return;
    }

    const userpost = {
      profilephoto: userprofilepic,
      post: post,
      photo: imageurl,
      username: finalUsername,
      name: finalName,
      email: user?.email,
    };

    setpost("");
    setimageurl("");

    fetch("https://x-com-clone-q3le.onrender.com/post", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userpost),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Send existing notification
        sendNotification({
          name: finalName,
          img: userprofilepic,
        });

        // Send email notification
        sendMailNotification({
          name: finalName,
          img: userprofilepic,
          content: post,
        });
      })
      .catch((error) => {
        console.error("Error posting tweet:", error);
      });
  };

  return (
    <div className="tweetBox">
      <form onSubmit={handletweet}>
        <div className="tweetBox__input">
          <Avatar src={userprofilepic} />
          <input
            type="text"
            placeholder="What's happening?"
            onChange={(e) => setpost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">
            {isloading ? (
              <p>Uploading Image</p>
            ) : (
              <p>{imageurl ? "Image Uploaded" : <AddPhotoAlternateOutlinedIcon />}</p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="imageInput"
            onChange={handleuploadimage}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            Tweets
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Tweetbox;
