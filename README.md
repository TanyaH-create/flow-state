<p align="center">
  <img src="https://github.com/user-attachments/assets/433a9344-3677-4874-a71e-4d3fb5d83159" alt="FullLogoRepo" width="500">
</p>

Flow State is a gamified task management web application designed for individuals with ADHD or anyone who struggles with organization and motivation. This interactive full-stack application allows users to create, edit, and complete tasks while earning points, ranks, and badges to stay motivated. Users can track their progress on a personalized dashboard, making productivity feel rewarding and engaging.

## Table of Contents
- [Features](#features)
- [Deployed Application](#deployed-application) 
- [Installation](#installation)
- [Usage](#Usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Contributers](#contributers)


## Features
✅ User Authentication – Secure sign-up and login using JWT authentication.

✅ Gamified Task Management – Earn points, ranks, and badges as you complete tasks to stay motivated.

✅ Task Creation & Editing – Add, update, and delete tasks with a simple interface.

✅ Personalized Dashboard – View your progress, completed tasks, and achievements in one place.

✅ Progress Tracking – Monitor task completion rates and rank up as you stay productive.

✅ Responsive Design – Works seamlessly across desktops, tablets, and mobile devices.

✅ Seamless User Experience – Built with a modern full-stack architecture using React, Node.js, Express, and PostgreSQL.

✅ **Daily Motivation** – Receive an inspirational quote from [Zen Quotes](https://zenquotes.io/) when the site is visited.



## Installation
If you'd like to run Flow State locally, follow these steps:

1. Clone the repository to your local machine:
   ```bash
   git clone git@github.com:TanyaH-create/flow-state.git
   
2. Navigate to the project directory 
   ```bash
   cd flow-state

3. Install required dependencies:
   ```bash
   npm install
   
4. Set up environment variables (create a .env file in the root directory)
    ~~~bash
    DB_NAME='tasks_db'
    DB_USER='postgres'
    DB_PASSWORD='your_password'
    JWT_SECRET_KEY='secret_key_used_for_token'

6. Set Up Database
   ~~~bash
   psql -U postgres
   \i schema.sql

6. Build and Run the development application
   ~~~bash
   npm run build && npm start:dev

7. Open your browser and go to http://localhost:3001 to view the project.

## Usage
Register/Login: Create an account or log in with existing credentials.

Create Tasks: Add tasks to your dashboard.

Complete Tasks: Mark tasks as complete to earn points.

Track Progress: View achievements and progress on the dashboard.

## Deployed Application
Check out the application [here](https://flow-state.onrender.com)

## GitHub Repository
The source code for this project can be found here [GitHub Repository](https://github.com/TanyaH-create/flow-state) .

## Technologies Used
- Front-End: React.js, HTML, CSS, JavaScript
- Back-End: Node.js, Express.js
- Database: PostgreSQL with Sequelize ORM
- Authentication: JSON Web Tokens (JWT)
- Deployment: Render (both frontend and backend with PostgreSQL database)
- APIs:
  -  [Zen Quotes](https://zenquotes.io/)

## Contributing
Contributions are welcome! Please follow these steps:
1.	Fork the repository.
2.	Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature-name
3.	Commit your changes:
    ```bash
    git commit -m "Add feature-name"
4.	Push your branch:
    ```bash
    git push origin feature-name
5.	Submit a pull request.

## Future Development
- Daily Streaks: Reward users for consistent productivity.
- Team Collaboration: Allow users to work on shared tasks with teammates.
- AI Powered Task Generator: Enter a task and use AI to break it down into smaller, manageble tasks.

## Contributers - feel free to reach out with questions:
- [Tanya Hauck](https://github.com/TanyaH-create)
- [Javier Valdez](https://github.com/ForfietBlock95)
- [Devin Nguyen](https://github.com/DevinNguyen879)
  
## License
This project is licensed under the MIT License.



