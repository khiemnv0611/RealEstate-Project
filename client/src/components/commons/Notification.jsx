import React, { useContext, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { List, ListItem, ListItemText } from "@mui/material";
import { apiGetNotifications, apiUpdateNotificationStatus } from "~/apis/user";
import { useNavigate } from "react-router-dom/dist";
import path from "~/utils/path";

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await apiGetNotifications();

        console.log(response.submission);

        if (response.success) {
          setNotifications(response.submission);
        }
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

  const handleNotificationClick = async (notification) => {
    try {
      // Task 1: Update isRead status to true
      const res = await apiUpdateNotificationStatus(notification.id, {
        isRead: true,
      });

      // Task 2: Navigate to the property page
      navigate(`${path.PROPERTIES}/${notification.propertyId}`, {
        state: { name: res.propertyName },
      });

      setNotifications((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <Badge badgeContent={unreadCount} color="error">
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
        <Typography
          sx={{ p: 2, fontWeight: "bold", textAlign: "center" }}
          className="border-b-2 sticky top-0 bg-white z-10"
        >
          Thông báo của bạn
        </Typography>

        <List className="max-h-96 overflow-auto cursor-pointer">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <ListItem
                button
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className="flex flex-col"
              >
                <div className="flex gap-2 w-full items-center">
                  {/* Nội dung thông báo */}
                  <ListItemText
                    primary={notification.message}
                    sx={{
                      fontWeight: !notification.isRead ? "bold" : "normal",
                      color: !notification.isRead ? "red" : "inherit",
                    }}
                    className="max-w-60"
                  />

                  {/* Dấu chấm xanh dương nếu chưa đọc */}
                  {!notification.isRead && (
                    <span className="rounded-full w-2 h-2 bg-blue-500"></span>
                  )}
                </div>

                {/* Thời gian hiển thị dưới dòng thông báo */}
                <div className="flex justify-start w-full">
                  <Typography variant="body2" color="textSecondary">
                    {new Date(notification.createdAt).toLocaleString("vi-VN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </Typography>
                </div>
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
