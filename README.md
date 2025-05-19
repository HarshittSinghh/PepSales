# X.com Clone

[Demo Video](https://drive.google.com/file/d/15VPp4y_uZ3z_dIpNzyszj6KJ0H1tTsqh/view) | [Live Demo](https://clone-x-com.netlify.app/)

A Twitter-like social media web application clone built with React for the frontend and Node.js with Express for the backend. This project demonstrates modern web development practices, including user authentication, tweet posting, and email notifications.

---

## Features

- Responsive React frontend using Material UI  
- Backend API built with Express and MongoDB  
- Email notifications on new tweet posts (using Nodemailer)  
- Firebase integration for authentication and data management  
- Twitter embed components  
- Secure and optimized build for production  

---

## Technologies Used

### Frontend

- React 18  
- Material UI  
- Axios  
- Firebase  
- React Router DOM  
- React Twitter Embed  

### Backend

- Node.js  
- Express.js  
- MongoDB  
- Firebase Admin SDK  
- Nodemailer  
- CORS  
- dotenv for environment variables  

---

## Getting Started

### Prerequisites

- Node.js (v14 or above)  
- npm (comes with Node.js)  
- MongoDB database (local or cloud)  
- Firebase project for authentication  
- Gmail account (for sending email notifications) or your preferred SMTP provider  

---

### Installation

#### Frontend Setup

```bash
cd client
npm init -y
npm install
npm install @emailjs/browser @emotion/react @emotion/styled @mui/icons-material @mui/material @testing-library/jest-dom @testing-library/react @testing-library/user-event axios caniuse-lite firebase moment react react-copy-to-clipboard react-dom react-google-button react-redux react-router-dom react-scripts react-twitter-embed web-vitals
npm start
```

#### Backend Setup
```bash
cd server
npm init -y
npm install
npm install body-parser cors dotenv express firebase-admin mongodb nodemailer nodemon
npm start
```

## Security and Environment Variables

> ⚠️ **Important:**  
> Some sensitive information such as Firebase API keys, MongoDB connection passwords, and SMTP credentials for Nodemailer are **not included** in this public repository to protect security and privacy.  
>  
> These credentials are managed using environment variables configured in `.env` files, which are excluded from version control by `.gitignore`.  
>  
> To run this project locally, create your own `.env` files for both client and server directories with the required keys and passwords.



#### Author: Harshit Kumar Singh
#### Roll Number: 22052118
#### Email: harshit.kr.singh.work@gmail.com
