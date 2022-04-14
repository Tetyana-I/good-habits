# Capstone Project 2 - GoodHabits
### Project Proposal
GoodHabits is an application designed to help in building desirable habits. 
This is a multi-platform application. It is supposed to be evenly focused full-stack application.
For this project I'm going to use Node, React and Postgres. 

I consider this project like a game application where user competes with themself. We know that adding a desirable habit, building a new routine, takes time, usually a couple of months. And the goal is to to get a long streak for the habit user is working on. It could take a few attempts to reach the goal. This application could be used not only as habit-building-helper, but also as a planner or checklist for user's everyday already established routines. 

The application designed for people who love todo-lists as I do :), and who would like to have a convenient planner and tracker of success in building good habits (or cutting bad ones ;) ).

#### Features
The application will include features:

- track multiple habits (repeated todos or habit-goals) with own schedules;
- streak days counter for each goal;
- percentage of goal achivement for each habit;
- motivational quotes (and from users'community also);

#### Data
To implement this functionality I'm going to include following data in the application database: 
- users: 
    - user_id,
    - username,
    - password;
    - type (admin/not_admin)
    -----> habits
- habits:
    - habit_id,
    - user_id ("owner" of the habit),
    - habit (or todo),
    - schedule (which days in a week:
        - daily,
        - specific days in a week),
    - start_day,
    - goal (goal in days, default = 66 days),
    - max_streak,
    - current_counter;
- track_log:
    - habit_id,
    - user_id, 
    - date,
    - checked (done).
        
I'm going to use external API for motivations quotes, and create the own one to work with application database.

The application will not be collecting any sensitive information.  But before getting access to the application any user should create an account and login. Authorization/authentication will allow the application to keep track of user's data.

#### User Flow
The user flow:
- user login/signup;
- new signed-up user can:
    - create a new habit with a goal schedule; 
    - read a user-guide;
    - read motivation quotes;

- established user also can:
    - delete/edit a habit;
    - check todos that scheduled for today;
    - check statistics (watch daily streak increase, percentage success);

#### Stretch Goals
My stretch goals for this application:
- add different flexible goals like: number of times per day/month, etc.;
- stats-graphs with success percentage / streak;
- users' "twitter" (to add user's success story, share user's expirience and so on).



