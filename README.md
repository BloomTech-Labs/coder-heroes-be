<img src="https://user-images.githubusercontent.com/65091914/139889762-1616d68b-d31b-4898-ac77-ecd000daabd0.png">
Source: https://app.dbdesigner.net/designer/schema/0-codeheroes-99ad6258-244f-484c-a12f-151cb4aec1b2

<img src="https://user-images.githubusercontent.com/65091914/139889762-1616d68b-d31b-4898-ac77-ecd000daabd0.png">
Source: https://app.dbdesigner.net/designer/schema/0-codeheroes-99ad6258-244f-484c-a12f-151cb4aec1b2

**NOTE: !!!! indicates to be changed after approval.**

<h1>Profiles</h1>

````
{
  key: INCREMENT,
  okta: STRING,
  name: STRING,
  email: STRING,
  avatarUrl: STRING,
}
```` 

<h1>Admins</h1>

````
{
  id: INCREMENT,
  user_id: INTEGER,
}
```` 

<h1>Parents</h1>

````
{
  id: INCREMENT,
  user_id: INTEGER,
}
````

<h1>Children</h1>

````
{
  id: INCREMENT,
  user_id: INTEGER,
  parent_id: INTEGER,
  username: STRING,
  age: INTEGER,
}
```` 

<h1>Instructors</h1>

````
{
  id: INCREMENT,
  user_id: INTEGER,
  approved: BOOLEAN,!!!!
  approved_by: INTEGER,!!!!
  bio: STRING,
  rating: INTEGER,!!!!
}
```` 

<h1>Inboxes</h1>

````
{
  id: INCREMENT,
  user_id: INTEGER,
}
```` 

<h1>Messages</h1>

````
{
  id: INCREMENT,
  inbox_id: INTEGER,
  sender_id: INTEGER,
  sent_at: TIMESTAMP,
  title: STRING,
  message: STRING,
  read: BOOLEAN,
}
```` 

<h1>Courses</h1>

````
{
  id: INCREMENT,
  size: INTEGER,
  description: STRING,
  subject: STRING,
  prereq: INTEGER!!!!
}
```` 

<h1>Schedules</h1>

````
{
  id: INCREMENT,
  course_id: INTEGER,
  instructor_id: INTEGER,
  start_time: TIME,
  end_time: TIME,
  start_date: DATE,
  end_date: DATE,
  location: STRING,
}
```` 

<h1>Enrollments</h1>

````
{
  id: INCREMENT,
  child_id: INTEGER,
  course_id: INTEGER,
}
```` 

<h1>Instructors List</h1>

````
{
  id: INCREMENT,
  instructor_id: INTEGER,
  course_id: INTEGER,
}
```` 

<h1>Resources</h1>

````
{
  id: INCREMENT,
  il_id: INTEGER,
  resource: STRING,
}
```` 

<h1>Newsfeed</h1>

````
{
  id: INCREMENT,
  title: INTEGER,
  link: INTEGER,
  description: STRING,
  posted_at: TIMESTAMP,
}
````

#### Authentication:

| Method   | URL                | Description                                                                                                |
| ------   | --------------     | ---------------------------------------------------------------------------------------------------------- |
| [POST]   | /api/auth/register | Requires a username, password, name, and email. Registers a new user.                                      |
| [POST]   | /api/auth/login    | Requires a username and password. Logs the user in.                                                        |

#### Courses:

| Method   | URL                 | Description                                                                                                    |
| ------   | --------------      | ---------------------------------------------------------------------------------------------------------      |
| [POST]   | /api/course/        | Requires `size`, `description`, `subject`, and  `prereq`. Returns the event object with the specified `subject`.                                               |
| [GET]    | /api/course/        | Returns an array filled with event objects.                                                                    |
| [GET]    | /api/course/:name     | Returns the event object with the specified `subject`.                                                        |
| [DELETE] | /api/course/:name     | Removes the event with the specified `subject` and returns the deleted event.                                 |
| [PUT]    | /api/course/     | Updates the event with the specified `subject` using data from the `request body`. Returns the modified event |

<br />
<p style="padding: 0; margin: 0; font-size: 2rem; text-align: center; font-family: 
