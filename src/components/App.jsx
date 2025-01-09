import React, { useState }from 'react';
import NotificationConfig from './NotificationConfig'; // Add the NotificationConfig component
import '../styles/main.scss'; // Import your global styles

function App() {
    const [dailyLimits, setDailyLimits] = useState({
        Monday: { hours: 1, minutes: 0, notifications: [] },
        Tuesday: { hours: 1, minutes: 0, notifications: [] },
        Wednesday: { hours: 1, minutes: 0, notifications: [] },
        Thursday: { hours: 1, minutes: 0, notifications: [] },
        Friday: { hours: 1, minutes: 0, notifications: [] },
        Saturday: { hours: 1, minutes: 0, notifications: [] },
        Sunday: { hours: 1, minutes: 0, notifications: [] }
    ]);

    const updateNotification = (index, updatedNotification) => {
        const newNotifications = [...notifications];
        newNotifications[index] = updatedNotification;
        setNotifications(newNotifications);
    };

    return (
        <div className="app">
            <h1>Computer Time Limiter</h1>

        </div>
    );
}

export default App;