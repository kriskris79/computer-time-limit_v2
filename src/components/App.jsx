import React, { useState, useEffect } from 'react';
import NotificationConfig from './NotificationConfig';
import '../styles/main.scss';
import CustomModal from './CustomModal';

function App() {
    const [dailyLimits, setDailyLimits] = useState({
        Monday: { hours: 1, minutes: 0, notifications: [] },
        Tuesday: { hours: 1, minutes: 0, notifications: [] },
        Wednesday: { hours: 1, minutes: 0, notifications: [] },
        Thursday: { hours: 1, minutes: 0, notifications: [] },
        Friday: { hours: 1, minutes: 0, notifications: [] },
        Saturday: { hours: 1, minutes: 0, notifications: [] },
        Sunday: { hours: 1, minutes: 0, notifications: [] }
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '' });

    const handleTimeChange = (day, field, value) => {
        const updatedDay = { ...dailyLimits[day], [field]: value };
        setDailyLimits({ ...dailyLimits, [day]: updatedDay });
    };

    const handleAddNotification = (day) => {
        const updatedNotifications = [...dailyLimits[day].notifications, { percent: 10, message: 'Time is running out!' }];
        setDailyLimits({ ...dailyLimits, [day]: { ...dailyLimits[day], notifications: updatedNotifications } });
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

    // Function to handle time limit checks
    const handleTimeLimitCheck = () => {
        Object.keys(dailyLimits).forEach((day) => {
            const totalMinutes = dailyLimits[day].hours * 60 + dailyLimits[day].minutes;
            const usedMinutes = Math.floor(Math.random() * totalMinutes); // Simulating time usage for testing
            const remainingTimePercent = ((totalMinutes - usedMinutes) / totalMinutes) * 100;

            dailyLimits[day].notifications.forEach((notification) => {
                if (remainingTimePercent <= notification.percent) {
                    setModalContent({
                        title: `Alert for ${day}`,
                        message: `${notification.message}. You have ${remainingTimePercent.toFixed(1)}% of your time left.`,
                    });
                    setIsModalOpen(true);
                }
            });
        });
    };

    // Call time limit check every minute
    useEffect(() => {
        const interval = setInterval(handleTimeLimitCheck, 60000); // Check every 60 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, [dailyLimits]);

    return (
        <div className="app">
            <h1>Computer Time Limiter</h1>

            {/* Custom Modal for Alerts */}
            <CustomModal
                isOpen={isModalOpen}
                title={modalContent.title}
                message={modalContent.message}
                onClose={() => setIsModalOpen(false)}
            />

            {Object.keys(dailyLimits).map(day => (
                <div key={day}>
                    <h2>{day}</h2>
                    <div className="time-inputs">
                        <label>Hours:</label>
                        <input
                            type="number"
                            value={dailyLimits[day].hours}
                            onChange={(e) => handleTimeChange(day, 'hours', parseInt(e.target.value, 10))}
                        />
                        <label>Minutes:</label>
                        <input
                            type="number"
                            value={dailyLimits[day].minutes}
                            onChange={(e) => handleTimeChange(day, 'minutes', parseInt(e.target.value, 10))}
                        />
                    </div>
                    <button onClick={() => handleAddNotification(day)}>Add Notification</button>

                    {dailyLimits[day].notifications.map((notification, index) => (
                        <NotificationConfig
                            key={index}
                            index={index}
                            notification={notification}
                            updateNotifications={(updatedNotification) => updateNotification(day, index, updatedNotification)}
                            removeNotification={() => removeNotification(day, index)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default App;
