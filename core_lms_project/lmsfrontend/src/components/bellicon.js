// src/components/BellIcon.js
import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const BellIcon = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const client = new W3CWebSocket('ws://localhost:8000/ws/notifications/');

    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      setNotifications(prevNotifications => [...prevNotifications, dataFromServer.message]);
      setNotificationCount(prevCount => prevCount + 1);
    };

    return () => {
      client.close();
    };
  }, []);

  const handleDropdownOpen = () => {
    // Optionally, handle dropdown opening behavior here
    // For example, mark notifications as read or fetch more notifications
    // You can implement this based on your application's requirements
  };

  return (
    <div className="dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        id="bellDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={handleDropdownOpen}
      >
        <i className="fas fa-bell"></i>
        {notificationCount > 0 && (
          <span className="badge bg-danger">{notificationCount}</span>
        )}
      </a>
      <ul className="dropdown-menu" aria-labelledby="bellDropdown">
        {notifications.map((notification, index) => (
          <li key={index} className="dropdown-item">
            {notification}
          </li>
        ))}
        {notifications.length === 0 && (
          <li className="dropdown-item text-muted">No new notifications</li>
        )}
      </ul>
    </div>
  );
};

export default BellIcon;
