import React from 'react';

function NotificationConfig({ index, notification, updateNotifications }) {
    const handlePercentChange = e => {
        updateNotifications(index, { ...notification, percent: e.target.value });
    };

    const handleMessageChange = e => {
        updateNotifications(index, { ...notification, message: e.target.value });
    };

    return (
        <div className="notification-config">
            <label>Notification {index + 1}:</label>
            <input
                type="number"
                min="0"
                max="100"
                value={notification.percent}
                onChange={handlePercentChange}
            />%
            <input
                type="text"
                value={notification.message}
                onChange={handleMessageChange}
            />
            <button onClick={() => updateNotifications(index, null)}>Remove</button>
        </div>
    );
}

export default NotificationConfig;