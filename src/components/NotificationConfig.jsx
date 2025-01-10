import React from 'react';

function NotificationConfig({ index, notification, updateNotifications, removeNotification }) {
    if (!notification) return null;

    const handleMinutesChange = (e) => {
        const newMinutes = parseInt(e.target.value, 10) || 0;
        updateNotifications({ ...notification, minutesLeft: newMinutes });
    };

    const handleMessageChange = (e) => {
        updateNotifications({ ...notification, message: e.target.value || '' });
    };

    return (
        <div className="notification-config">
            <label>Notification {index + 1} (Minutes Remaining):</label>
            <input
                type="number"
                min="1"
                max="1440"
                value={notification.minutesLeft || 0}
                onChange={handleMinutesChange}
            />
            <span className="info-text">Enter the minutes left when the notification should appear</span>
            <input
                type="text"
                placeholder="Custom message (e.g., Time is running out!)"
                value={notification.message || ''}
                onChange={handleMessageChange}
            />
            <button onClick={() => removeNotification(index)}>Remove</button>
        </div>
    );
}

export default NotificationConfig;
