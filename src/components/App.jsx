import React, { useState }from 'react';
import NotificationConfig from './NotificationConfig'; // Add the NotificationConfig component
import '../styles/main.scss'; // Import your global styles

function App() {
    const [notifications, setNotifications] = useState([
        { percent: 20, message: 'Take a break' },
        { percent: 50, message: 'Halfway there!' },
    ]);

    const updateNotification = (index, updatedNotification) => {
        const newNotifications = [...notifications];
        newNotifications[index] = updatedNotification;
        setNotifications(newNotifications);
    };

    return (
        <div className="app">
            <h1>Computer Time Limiter</h1>
            <h2>Set your daily time limit and notifications</h2>

            {notifications.map((notification, index) => (
                <NotificationConfig
                    key={index}
                    index={index}
                    notification={notification}
                    updateNotifications={updateNotification}
                />
            ))}
        </div>
    );
}

export default App;