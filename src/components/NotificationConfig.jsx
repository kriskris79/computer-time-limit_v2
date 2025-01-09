import React from 'react';

function NotificationConfig({ index, notification, updateNotifications, removeNotification }) {

    if (!notification) {
        return null;
    }

    const handlePercentChange = (e) => {
        const newPercent = parseInt(e.target.value, 10);
        updateNotifications({ ...notification, percent: newPercent });
    };

    const handleMessageChange = (e) => {
        updateNotifications({ ...notification, message: e.target.value });
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
            />
            %
            <input
                type="text"
                value={notification.message}
                onChange={handleMessageChange}
            />
            <button onClick={() => removeNotification(index)}>Remove</button>
        </div>
    );
}

export default NotificationConfig;
