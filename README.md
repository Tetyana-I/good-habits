# Good Habits
GoodHabits project was developed as a part of a Springboard Full-Stack Software Engineering curriculum. This is an evenly focused full-stack application. This project was completed in approximately 70 hours.

### Description
This application is designed to help in building desirable habits. We know that adding a desirable habit, building a new routine, takes time, usually a couple of months. And the goal is to to get a long streak for the habit user is working on. It could take a few attempts to reach the goal. The application designed for people who love todo-lists as I do :), and who would like to have a convenient planner and tracker of success in building good habits (or cutting bad ones ;) ).

This application could be used not only as habit-building-helper, but also as a planner or checklist for user's everyday already established routines. 


## Technologies used

**Front End**: 
- React
- CSS
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


**Back End**: 
- *Database*: PostgreSQL
- *API*: Node.js, Express.js
- *External API reference*: "Inspiration" (https://inspiration.goprogram.ai/docs/)


## Deployment
... (coming soon :) )

## Local Deployment
**Requirements:** PostgreSQL, Node.js, npm

1. Initialize PostgreSQL. 
2. Create databases (habits and habits_test):

        psql < habits.sql

3. Change the current working directory to the location where you want the cloned directory. Clone Repository:

        git clone https://github.com/Tetyana-I/good-habits.git

4. Switch to the application directory:

        cd good-habits

2. Change the current working directory, install dependencies and start a server:

        cd habits-backend
        npm install
        node server.js

The server will start on http://localhost:3007

3. Open a new terminal window, go to the main application directory (*"good-habits"*).

4. Make *habits-frontend* a current working directory, install dependencies and start the application:

        cd habits-frontend
        npm install
        npm start

The application will be open in a browser.

5. If you don't want to create a new user account and "just browsing", you can use these credentials for login: "username" =  testuser and "password" = password.  

### Features
The application includes features:

- user authentication and authorisation:
    - Even though the application will not be collecting any sensitive information, before getting access to the app any user should create an account and login. Authorization/authentication will allow the application to keep track of user's data, and prevent changing other's user data. Moreover, it's allow user to use application from any device with a browser.
- new habit creation and deletion;
- streak days counter for each habit; 
- maximum streak counter for eack habit;
- daily tracker for each habit; 
- percentage of goal achivement for each habit;
- daily motivational quotes;

