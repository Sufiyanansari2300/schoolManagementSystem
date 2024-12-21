# schoolManagementSystem
School Management System

Step 1 :- git clone the project in local
Step 2 :- Install mongodb in local
Step 3 :- Create a database named as "schoolManagementDb" in local mongo db. Command (use schoolManagementDb)
Step 4 :- Create a collection named as "users" in "schoolManagementDb" database. Command (db.users.insertOne({
    name: 'Super User',
    email: 'superuser@yopmail.com',
    password: '$2a$10$ibdL8It9eWVjl1HmM3QaFO78Z4xsh1AO2xZXd2xzbVKpPGByR56bC', (Need to be encrypted using bycrypt)
    role: 1,
    schoolIds: []
});
)
Step 5 :- In .env file replace the <username> and <password> with the your own user who has access to the DB.
Step 6 :- Replace <jwt secret> with the your public key to generating jwt token.
Step 7 :- Run "npm install" command to install all the dependencies
Step 9 :- Run "npm start" command, Application will start at port 8000
Step 10 :- Once the application is up and running. Use the login api (refer to api documentation) to generate the jwt token by passing the credentials of user created in step 4
Step 11 :- Once the jwt token is generated any api can be executed of the functionality.