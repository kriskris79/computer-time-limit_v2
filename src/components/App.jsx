import React, { useState, useEffect, useRef } from 'react';
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
    const startTimeRef = useRef(new Date());
    const triggeredNotificationsRef = useRef({});
    const preNotificationShownRef = useRef(false);
    const sessionEndedRef = useRef(false);

    const handleTimeChange = (day, field, value) => {
        const updatedDay = { ...dailyLimits[day], [field]: value || 0 };
        setDailyLimits({ ...dailyLimits, [day]: updatedDay });
    };

    const handleAddNotification = (day) => {
        const updatedNotifications = [...dailyLimits[day].notifications, { minutesLeft: 1, message: '' }];
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

    const handleTimeLimitCheck = () => {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const today = daysOfWeek[new Date().getDay()];

        if (!dailyLimits[today]) return;

        const totalMinutes = dailyLimits[today].hours * 60 + dailyLimits[today].minutes;
        const now = new Date();
        const elapsedMinutes = (now - startTimeRef.current) / (1000 * 60);
        const remainingMinutes = totalMinutes - elapsedMinutes;

        if (!triggeredNotificationsRef.current[today]) {
            triggeredNotificationsRef.current[today] = new Set();
        }

        // **Session End Notification (only show once)**
        if (remainingMinutes <= 0 && !sessionEndedRef.current) {
            sessionEndedRef.current = true;
            setModalContent({
                title: `Session Ended for ${today}`,
                message: `Time is up! Please save your work.`,
            });
            setIsModalOpen(true);
            return;
        }

        if (remainingMinutes > 0) {
            sessionEndedRef.current = false; // Reset if there's still time left for the day
        }

        // **Pre-notification (1 minute before end)**
        if (remainingMinutes <= 1 && remainingMinutes > 0 && !preNotificationShownRef.current) {
            setModalContent({
                title: `Final Warning for ${today}`,
                message: `The system will shut down in 1 minute. Get ready!`,
            });
            setIsModalOpen(true);
            preNotificationShownRef.current = true; // Ensure this only triggers once
            return;
        }

        // **Custom Main Notifications (show only once)**
        dailyLimits[today].notifications.forEach((notification, index) => {
            if (remainingMinutes <= notification.minutesLeft && !triggeredNotificationsRef.current[today].has(index)) {
                setModalContent({
                    title: `Notification for ${today}`,
                    message: `${notification.message || 'Your time is almost up!'}. You have ${Math.max(0, Math.round(remainingMinutes))} minutes left.`,
                });
                setIsModalOpen(true);
                triggeredNotificationsRef.current[today].add(index); // Mark this notification as shown
            }
        });
    };

    const resetNotificationsForNewDay = () => {
        triggeredNotificationsRef.current = {}; // Clear all notifications at midnight
        preNotificationShownRef.current = false; // Reset the pre-notification for the new day
        sessionEndedRef.current = false; // Reset the session-ended notification for the new day
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const interval = setInterval(handleTimeLimitCheck, 5000); // Check every 5 seconds
        return () => clearInterval(interval);
    }, [dailyLimits]);

    useEffect(() => {
        const resetInterval = setInterval(resetNotificationsForNewDay, 86400000); // Reset once per day
        return () => clearInterval(resetInterval);
    }, []);

    return (
        <div className="app">
            <h1>Computer Time Limiter</h1>

            <CustomModal
                isOpen={isModalOpen}
                title={modalContent.title}
                message={modalContent.message}
                onClose={handleCloseModal}
            />

            {Object.keys(dailyLimits).map(day => (
                <div key={day}>
                    <h2>{day}</h2>
                    <div className="time-inputs">
                        <label htmlFor={`${day}-hours`}>Hours:</label>
                        <input
                            type="number"
                            id={`${day}-hours`}
                            name={`${day}-hours`}
                            value={dailyLimits[day].hours}
                            onChange={(e) => handleTimeChange(day, 'hours', parseInt(e.target.value, 10) || 0)}
                        />

                        <label htmlFor={`${day}-minutes`}>Minutes:</label>
                        <input
                            type="number"
                            id={`${day}-minutes`}
                            name={`${day}-minutes`}
                            value={dailyLimits[day].minutes}
                            onChange={(e) => handleTimeChange(day, 'minutes', parseInt(e.target.value, 10) || 0)}
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
