import React, { useState } from "react";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  NotificationsNone as NotificationsNoneIcon,
  MailOutline as MailOutlineIcon,
  Feedback as FeedbackIcon,
  ListAlt as ListAltIcon,
  PermIdentity as PermIdentityIcon,
  More as MoreIcon,
  MoreHoriz as MoreHorizIcon,
  Done as DoneIcon,
} from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  useMediaQuery,
} from "@mui/material";
import "./sidebar.css";
import Customlink from "./Customlink";
import Sidebaroption from "./Sidebaroption";
import { useNavigate } from "react-router-dom";
import useLoggedinuser from "../../hooks/useLoggedinuser";
import TwitterIcon from "../../image/icon.jpeg";

const Sidebar = ({ handlelogout, user }) => {
  const [anchorE1, setanchorE1] = useState(null);
  const openmenu = Boolean(anchorE1);
  const [loggedinuser] = useLoggedinuser();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");
  const handleclick = (e) => setanchorE1(e.currentTarget);
  const handleclose = () => setanchorE1(null);
  const result = user?.email?.split("@")[0];

  const profileImage = loggedinuser[0]?.profileImage || user?.photoURL;
  const displayName = loggedinuser[0]?.name || user?.displayName;

  return (
    <div className={`sidebar ${isMobile ? "sidebar--mobile" : ""}`}>
      <img src={TwitterIcon} alt="Twitter Icon" className="sidebar__twitterIcon" />

      <Customlink to="/home/feed">
        <Sidebaroption active Icon={HomeIcon} text={isMobile ? "" : "Home"} />
      </Customlink>
      <Customlink to="/home/explore">
        <Sidebaroption Icon={SearchIcon} text={isMobile ? "" : "Explore"} />
      </Customlink>
      <Customlink to="/home/notification">
        <Sidebaroption Icon={NotificationsNoneIcon} text={isMobile ? "" : "Notifications"} />
      </Customlink>
      <Customlink to="/home/messages">
        <Sidebaroption Icon={MailOutlineIcon} text={isMobile ? "" : "Messages"} />
      </Customlink>
      <Customlink to="/home/Feedback">
        <Sidebaroption Icon={FeedbackIcon} text={isMobile ? "" : "Feedback"} />
      </Customlink>
      <Customlink to="/home/lists">
        <Sidebaroption Icon={ListAltIcon} text={isMobile ? "" : "Lists"} />
      </Customlink>
      <Customlink to="/home/profile">
        <Sidebaroption Icon={PermIdentityIcon} text={isMobile ? "" : "Profile"} />
      </Customlink>
      <Customlink to="/home/more">
        <Sidebaroption Icon={MoreIcon} text={isMobile ? "" : "More"} />
      </Customlink>

      <div className="Profile__info">
        <Avatar src={profileImage} />
        {!isMobile && (
          <div className="user__info">
            <h4>{displayName}</h4>
            <h5>@{result}</h5>
          </div>
        )}
        <IconButton size="small" onClick={handleclick}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorE1}
          open={openmenu}
          onClick={handleclose}
          onClose={handleclose}
        >
          <MenuItem
            className="Profile__info1"
            onClick={() => navigate("/home/profile")}
          >
            <Avatar src={profileImage} />
            <div className="user__info subUser__info">
              <div>
                <h4>{displayName}</h4>
                <h5>@{result}</h5>
              </div>
              <ListItemIcon className="done__icon">
                <DoneIcon />
              </ListItemIcon>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleclose}>Add an existing account</MenuItem>
          <MenuItem onClick={handlelogout}>Log out @{result}</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
