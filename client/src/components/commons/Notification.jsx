import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { List, ListItem, ListItemText } from "@mui/material";
import { apiGetNotifications } from "~/apis/user";

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await apiGetNotifications();
        setNotifications(response.notifications.rows);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon sx={{ color: "white" }} />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        disableScrollLock={true}
      >
        {/* <Typography sx={{ p: 2 }}>Thông báo của bạn!</Typography> */}
        <List sx={{ width: "300px" }}>
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <ListItem key={notification.id}>
                <ListItemText
                  primary={notification.message}
                  secondary={notification.time}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="Không có thông báo nào gần đây." />
            </ListItem>
          )}
        </List>
      </Popover>
    </div>
  );
};

export default Notification;
