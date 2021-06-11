# Class Managment System

This is the backend for class management system application, where teacher can manage classes & students in their classes.
Teacher can create classes, delete classes, add students in it, delete students from it, update students data from their end, get list of students of every class they made.

### Prerequisites to run this app on your local machine -

* Install NPM, Nodejs on your system.
* Install MongoDB on your system.
* Clone this file and run git clone <url> on your terminal. This will make a directory in your system's home
* Open the directory & run ' npm install ' in terminal inside the directory. This will install all the packages in node modules of your app.
* now run 'npm start' & the app will be running on the port 9000 of your localhost.
* Install Postman on your system to run all these API's.

# API's for every actions

## To register a teacher

#### http://localhost:9000/api/v1/register/teacher
* Teacher's name, email & password will be given via body [ You can easily find it on Postman ]

## To register a student 

#### http://localhost:9000/api/v1/register/student
* Student's name, email & password will be given via body

## To Login as a Teacher 

#### http://localhost:9000/api/v1/login/teacher
* Teacher's email & password will be given via body
* On logging in you will get all the user's data & a jwt web token , use those web token for authorizations as i've coded

## To Login as a Student 

#### http://localhost:9000/api/v1/login/student
* Student's email & password will be given via body
* On logging in you will get all the user's data & a jwt web token , use those web token for authorizations as i've coded

## Teacher's can create a classroom via api - 

#### http://localhost:9000/api/v1/class/createClass/:id
* Teacher's id will be given via string parameter
* pass the jwt webtoken of teacher in bearer token header to authorize the user

## Teacher's can get a list of all the classrooms they made -

#### http://localhost:9000/api/v1/class/all/:id
* Teacher's id will be given via string parameter

## Teacher's can delete a class

#### http://localhost:9000/api/v1/class/deleteClass/:id
* Class's id will be given via string parameter

## Teacher's can update a class's data

#### http://localhost:9000/api/v1/class/updateClass/:id
* Class's id will be given via string parameter

## Teacher's can add a student in a class

#### http://localhost:9000/api/v1/class/addStudent/
* Class's id in which student is to be added & student id (which student to be added ) will be given via query parameters

## Teacher's can delete a student from a class

#### http://localhost:9000/api/v1/class/deleteStudent/
* Class's id in which student is to be added & student id (which student to be added ) will be given via query parameters