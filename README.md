Computer Time Limiter - Frontend Only
-------------------------------------

This is the frontend for a computer time limiter app. It lets you set daily time limits, show notifications, and send shutdown warnings when time is running out.

Overview
--------

This app tracks computer usage and alerts users when they are close to reaching their daily time limit. The interface works well, but the backend isn’t finished yet. In future updates, the backend will save session data and handle system actions.

Features
--------

- Set time limits for each day of the week.
- Show notifications and warnings as time runs out.
- Customize messages and alerts.
- Pop-up windows for time limit warnings.
- Future backend plans to log user session data.

Current Status
--------------

The backend (for saving data and handling shutdowns) is not done yet. The project is still being developed, and I’ll finish it when I learn more about backend technologies like Node.js and Express.

Technologies Used
-----------------

- **React** – User interface
- **SCSS** – Styling
- **Electron** – Desktop app framework
- **JavaScript (ES6)** – Logic and state management
- **HTML** – Component structure

File Overview
-------------

- `App.jsx`: Main component that handles the app’s state and UI.
- `NotificationConfig.jsx`: Sub-component for setting up custom notifications.
- `CustomModal.jsx`: Component for showing warning pop-ups.
- `main.js`: Electron setup for running the desktop app.
- `styles/main.scss`: Main app styling.
- `styles/modal.scss`: Styling for pop-up alerts.

License
-------

This project is freely available for use under the MIT License. 
