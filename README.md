<img src="https://user-images.githubusercontent.com/65091914/139889762-1616d68b-d31b-4898-ac77-ecd000daabd0.png">
Source: https://app.dbdesigner.net/designer/schema/0-codeheroes-99ad6258-244f-484c-a12f-151cb4aec1b2

<img src="https://user-images.githubusercontent.com/65091914/139889762-1616d68b-d31b-4898-ac77-ecd000daabd0.png">
Source: https://app.dbdesigner.net/designer/schema/0-codeheroes-99ad6258-244f-484c-a12f-151cb4aec1b2

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
  bio: STRING,
  rating: INTEGER
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
  description: STRING,
  subject: STRING,
  prereq: TEXT ARRAY,
}
```` 

<h1>Schedules</h1>

````
{
  id: INCREMENT,
  course_id: INTEGER,
  instructor_id: INTEGER,
  size: INTEGER,
}
```` 

<h1>Sessions</h1>

````
{
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
  approved: BOOLEAN,
  approved_by: INTEGER,
}
```` 

<h1>Resources</h1>

````
{
  id: INCREMENT,
  il_id: INTEGER,
  resource: STRING,
  task: BOOLEAN,
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
| [POST]   | /api/auth/register |                                       |
| [POST]   | /api/auth/login    |                                       |

#### Profile:

| Method   | URL             | Description                                                                                                |
| ------   | --------------  | ---------------------------------------------------------------------------------------------------------- |
| [GET]    | /profile/       | Requires a username, password, name, and email. Registers a new user.                                      |
| [GET]    | /profile/:okta  | Requires a username and password. Logs the user in.                                                        |
| [POST]   | /profile/       |                                       |
| [PUT]    | /profile/       |                                       |
| [DELETE] | /profile/:okta  |                                       |

#### Admin:

| Method   | URL             | Description                                                                                                |
| ------   | --------------  | ---------------------------------------------------------------------------------------------------------- |
| [GET]    | /admin/         | Returns an array filled with event objects.                                                                |
| [GET]    | /admin/:id      | Returns an event object with the specified `id`.                                                           |
| [POST]   | /admin/         |                                                            |
| [PUT]    | /admin/         |                                                            |
| [DELETE] | /admin/:id      |                                                            |

#### Parent:

| Method   | URL                    | Description                                                                                              |
| ------   | ---------------------  | -------------------------------------------------------------------------------------------------------- |
| [GET]    | /parent/               | Returns an array filled with event objects.                                                              |
| [GET]    | /parent/:id            | Returns an event object with the specified `id`.                                                         |
| [GET]    | /parent/:id/children/  |                                                            |
| [GET]    | /parent/:id/schedules/ |                                                            |
| [POST]   | /parent/               |                                                            |
| [PUT]    | /parent/               |                                                            |
| [DELETE] | /parent/:id            |                                                            |

#### Instructor:

| Method   | URL                      | Description                                                                                                |
| ------   | -----------------------  | ---------------------------------------------------------------------------------------------------------- |
| [GET]    | /instructor/             |                                       |
| [GET]    | /instructor/:id          |                                       |
| [GET]    | /instructor/:id/courses  |                                       |
| [POST]   | /instructor/             |                                       |
| [PUT]    | /instructor/             |                                       |
| [DELETE] | /instructor/:id          |                                       |

#### User:

| Method   | URL             | Description                                                                                                |
| ------   | --------------  | ---------------------------------------------------------------------------------------------------------- |
| [GET]    | /user/          |                                       |

#### Course:

| Method   | URL             | Description                                                                                                         |
| ------   | --------------  | ------------------------------------------------------------------------------------------------------------------- |
| [GET]    | /course/        | Returns an array filled with event objects.                                                                         |
| [GET]    | /course/:name   | Returns the event object with the specified `subject`.                                                              |
| [POST]   | /course/        | Contains fields: `description`, `subject`, and  `prereq`. Returns the event object with the specified `subject`.    |
| [PUT]    | /course/        | Updates the event with the specified `subject` using data from the `request body`. Returns the modified event       |
| [DELETE] | /course/:name   | Removes the event with the specified `subject` and returns the deleted event.                                       |

#### Schedule:

| Method   | URL                | Description                                                                                                |
| ------   | -----------------  | ---------------------------------------------------------------------------------------------------------- |
| [GET]    | /schedule/         |                                       |
| [GET]    | /schedule/:id      |                                       |
| [POST]   | /schedule/         |                                       |
| [POST]   | /schedule/sessions |                                       |
| [PUT]    | /schedule/         |                                       |
| [DELETE] | /schedule/:id      |                                       |

#### Children:

| Method   | URL                       | Description                                                                                                |
| ------   | ------------------------  | ---------------------------------------------------------------------------------------------------------- |
| [GET]    | /children/                |                                       |
| [GET]    | /children/:id             |                                       |
| [GET]    | /children/:id/enrollments |                                       |
| [POST]   | /children/:id/enrollments |                                       |
| [POST]   | /children/                |                                       |
| [PUT]    | /children/                |                                       |
| [DELETE] | /children/enrollments/:id |                                       |

#### Newsfeed:

| Method   | URL           | Description                                                                                                |
| ------   | ------------  | ---------------------------------------------------------------------------------------------------------- |
| [GET]    | /newsfeed/    |                                       |
| [GET]    | /newsfeed/:id |                                       |
| [POST]   | /newsfeed/    |                                       |
| [PUT]    | /newsfeed/    |                                       |
| [DELETE] | /newsfeed/    |                                       |

#### Data:

| Method   | URL      | Description                                                                                                |
| ------   | -------  | ---------------------------------------------------------------------------------------------------------- |
| [GET]    | /data/   |                                       |


<br />
