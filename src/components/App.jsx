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

    const handleAddNotification = (day) => {
        const updatedNotifications = [...dailyLimits[day].notifications, { percent: 0, message: '' }];
        setDailyLimits({
            ...dailyLimits,
            [day]: { ...dailyLimits[day], notifications: updatedNotifications }
        });
    };

    const updateNotification = (day, index, updatedNotification) => {
        const newNotifications = [...dailyLimits[day].notifications];
        newNotifications[index] = updatedNotification;
        setDailyLimits({
            ...dailyLimits,
            [day]: { ...dailyLimits[day], notifications: newNotifications }
        });
    };

    const removeNotification = (day, index) => {
        const filteredNotifications = dailyLimits[day].notifications.filter((_, i) => i !== index);
        setDailyLimits({
            ...dailyLimits,
            [day]: { ...dailyLimits[day], notifications: filteredNotifications }
        });
    };

    return (
        <div className="app">
            <h1>Computer Time Limiter</h1>
            {Object.keys(dailyLimits).map((day) => (
                <div key={day}>
                    <h2>{day}</h2>
                    {/* Input fields for time and buttons for notifications */}
                    {dailyLimits[day].notifications.map((notification, index) => (
                        <NotificationConfig
                            key={index}
                            notification={notification}
                            updateNotifications={(updatedNotification) =>
                                updateNotification(day, index, updatedNotification)}
                            removeNotification={() => removeNotification(day, index)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default App;