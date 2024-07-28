# LMS (Learning Management System) Project

This project is a comprehensive Learning Management System (LMS) built with Django and React. It provides separate portals and functionalities for three main types of users: Admins, Teachers, and Students. Each user type operates within isolated functions to ensure a seamless and personalized experience.

## Features

### Admin Portal
- Full access to all functionalities.
- Manage teachers and students.
- Oversee course creation and management.
- Monitor quiz and assignment submissions.
- Generate and view reports on system usage and user performance.
- Real-time notifications for system-wide activities.

### Teacher Portal
- Create and manage their own courses.
- Add and manage quizzes and assignments for their courses.
- View and grade student submissions.
- Receive real-time notifications for student activities in their courses.
- Change profile settings.

### Student Portal
- Enroll in courses.
- List and view enrolled courses.
- Attempt and submit quizzes and assignments.
- Receive real-time notifications for course activities, new assignments, and quiz availability.
- Change profile settings.

## Real-Time Notifications
- All users receive real-time notifications for relevant activities, such as new assignments, quiz updates, and course enrollments.
- WebSocket (Socket.IO) integration to ensure instant updates and notifications.

## Technology Stack
- **Backend**: Django (Python)
- **Frontend**: React (JavaScript)
- **Styling**: Bootstrap 
- **Real-Time Communication**: WebSocket (Socket.IO)
- **Database**: SQLite3
- **Authentication**: Django Models



