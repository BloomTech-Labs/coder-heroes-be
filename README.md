<img src="https://user-images.githubusercontent.com/65091914/142253036-074f454e-62ab-445d-a30c-26e371e76e0a.png">
Source: https://app.dbdesigner.net/designer/schema/0-codeheroes-99ad6258-244f-484c-a12f-151cb4aec1b2  ===> `old table`

Updated table Source: https://dbdesigner.page.link/WTZRbVeTR7EzLvs86

[Loom Video PT1](https://www.loom.com/share/4543abe4659540698c327058362f90f3)
[Loom Video PT2](https://www.loom.com/share/c4e8c8f38cb14fdb8ac43e6a2342f159)
[Loom Video PT3](https://www.loom.com/share/39128df605f44263b1b4a5b8ddbcddb3)
[Loom Video PT4](https://www.loom.com/share/7da5fc043d3149afb05876c28df9bd3d)

<h1>Profiles</h1>

```
{
  profile_id: INCREMENT,
  okta_id: STRING,
  name: STRING,
  email: STRING,
  role_id: INTEGER,
  avatarUrl: STRING,
}
```

<h1>Super Admins</h1>

```
{
  super_admin_id: INCREMENT,
  profile_id: INTEGER,
}
```

<h1>Admins</h1>

```
{
  admin_id: INCREMENT,
  profile_id: INTEGER,
}
```

<h1>Parents</h1>

```
{
  parent_id: INCREMENT,
  profile_id: INTEGER,
}
```

<h1>Children</h1>

```
{
  child_id: INCREMENT,
  profile_id: INTEGER,
  username: STRING,
  age: INTEGER,
  parent_id: INTEGER,
}
```

<h1>Instructors</h1>

```
{
  instructor_id: INCREMENT,
  rating: INTEGER,
  availability: STRING,
  bio: STRING,
  profile_id: INTEGER,
  status: STRING (default: 'pending'),
  approved_by: INTEGER (references admin_id),
}
```

<h1>Inboxes</h1>

```
{
  inbox_id: INCREMENT,
  profile_id: INTEGER,
}
```

<h1>Messages</h1>

```
{
  messages_id: INCREMENT,
  sent_at: TIMESTAMP,
  title: STRING,
  read: BOOLEAN,
  message: STRING,
  sent_by_profile_id: INTEGER,
  inbox_id: INTEGER,
}
```

<h1>Programs</h1>

```
{
  program_id: INCREMENT,
  program_name: STRING,
  program_description: STRING,
}
```

<h1>Courses</h1>

```
{
  course_id: INCREMENT,
  course_name: STRING,
  course_description: STRING,
  days_of_week: ARRAY (strings),
  max_size: INTEGER,
  min_age: INTEGER,
  max_age: INTEGER,
  instructor_id: INTEGER,
  program_id: INTEGER,
  start_time: TIME,
  end_time: TIME,
  start_date: DATE,
  end_date: DATE,
  location: STRING,
  number_of_sessions: INTEGER,
}
```

<h1>Instructors' Program Types (Programs instructors are approved to teach)</h1>

```
{
  instructors_program_types_id: INCREMENT,
  instructor_id: INTEGER,
  program_id: INTEGER,
}
```

<h1>Enrollments</h1>

```
{
  enrollments_id: INCREMENT,
  completed: BOOLEAN (default: false),
  child_id: INTEGER,
  course_id: INTEGER,
}
```

<h1>Resources</h1>

```
{
  resource_id: INCREMENT,
  resource: STRING,
  description: STRING,
  task: BOOLEAN,
  instructor_id: INTEGER,
}
```

<h1>Newsfeed</h1>

```
{
  newsfeed_id: INCREMENT,
  title: STRING,
  link: STRING,
  description: STRING,
  posted_at: TIMESTAMP,
}
```

#### Profile:

| Method   | URL                         | Description                                                                                                              |
| -------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [GET]    | /profile/                   | Returns an array filled with event objects.                                                                              |
| [GET]    | /profile/:okta_id/             | Returns an event object with the specified `okta id`.                                                                       |
| [GET]    | /profiles/users/:profile_id | Returns an array filled with event objects that contains information based on profile_id and role_id.                    |
| [GET]    | /profile/role/role:id       | Returns an array filled with event objects that contain information based on role_id for all profiles of a role_id type. |
| [POST]   | /profile/                   | Requires a name, password, and email. Registers a new user.                                                              |
| [PUT]    | /profile/                   | Returns an event object with the specified `okta`. Updates specific profile.                                             |
| [DELETE] | /profile/:okta/             | Returns an event object with the specified `okta`. Deletes specific profile.                                             |

#### Parent:

| Method | URL                    | Description                                                         |
| ------ | ---------------------- | ------------------------------------------------------------------- |
| [GET]  | /parent/:profile_id/children/  | Returns an array filled with children event objects with the specified `profile_id`. |
| [GET]  | /parent/:profile_id/schedules/ | Returns an array filled with schedules event objects with the specified `profile_id`. |

#### Instructor:

| Method | URL                      | Description                                                         |
| ------ | ------------------------ | ------------------------------------------------------------------- |
| [GET]  | /instructor/:profile_id/courses/ | Returns an array filled with instructor event objects with the specified `profile_id`. (BUGGED) |

#### User:

| Method | URL              | Description                                                             |
| ------ | ---------------- | ----------------------------------------------------------------------- |
| [GET]  | /user/           | Returns an event object with the specified `okta` and `type`.           |
| [GET]  | /user/inbox/     | Returns an event object with the specified `okta`. (NOT IMPLEMENTED)                      |
| [GET]  | /user/schedules/ | Returns an event object with the specified `okta`.                      |
| [PUT]  | /user/           | Returns an event object with the specified `id`. Updates specific user. |

#### Inbox:

| Method   | URL              | Description                                                                              |
| -------- | ---------------- | ---------------------------------------------------------------------------------------- |
| [GET]    | /inbox/          | Returns an array filled with inbox event objects.                                              |
| [GET]    | /inbox/:profile_id/    | Retrieves an inbox with the specified inbox id (incorrectly labeled as profile_id). |
| [POST]   | /inbox/          | Creates an inbox and returns the newly created inbox.                 |
| [POST]   | /inbox/messages/ | Returns the event object with the specified `inbox_id`. Sends a message.                 |
| [PUT]    | /inbox/:profile_id   | Returns an array filled with event objects with the specific `profile_id`. Updates an inbox.   |
| [DELETE] | /inbox/:profile_id/    | Returns an array filled with event objects with the specific `okta`. Deletes an inbox.   |

#### Program:

| Method   | URL          | Description                                                                                                  |
| -------- | ------------ | ------------------------------------------------------------------------------------------------------------ |
| [GET]    | /program/    | Returns an array filled with program objects.                                                                |
| [GET]    | /program/:id | Returns the program object with the specified `id`.                                                          |
| [POST]   | /program/    | Contains fields: `program_name` and `program_description`. Returns the newly created program object.         |
| [PUT]    | /program/:id | Updates the program with the specified `id` using data from the `request body`. Returns the modified program |
| [DELETE] | /program/:id | Removes the program with the specified `id` and returns deletion success message .                           |

#### Course:

| Method   | URL                       | Description                                                                 |
| -------- | ------------------------- | --------------------------------------------------------------------------- |
| [GET]    | /course          | Returns an array containing all course objects                         |
| [GET]    | /course/:course_id | Returns the course object with the specified `course_id`.                           |
| [PUT]    | /course/:course_id | Updates and returns the updated course object with the specified `course_id`. |
| [DELETE] | /course/:course_id | Deletes the course object with the specified `course_id` and returns a message containing the deleted course_id on successful deletion   |

#### Schedule (Not Implemented):

| Method   | URL                 | Description                                                                  |
| -------- | ------------------- | ---------------------------------------------------------------------------- |
| [GET]    | /schedule/          | Returns an array filled with event objects.                                  |
| [GET]    | /schedule/:id/      | Returns the event object with the specified `id`.                            |
| [POST]   | /schedule/          | Returns the event object with the specified `id`. Creates a schedule.        |
| [POST]   | /schedule/sessions/ | Returns the event object with the specified `id`. Creates a session.         |
| [PUT]    | /schedule/          | Returns the event object with the specified `id`. Updates specific schedule. |
| [DELETE] | /schedule/:id/      | Returns the event object with the specified `id`. Deletes specific schedule. |

#### Children:

| Method   | URL                       | Description                                                                        |
| -------- | ------------------------- | ---------------------------------------------------------------------------------- |
| [GET]    | /children                  | Returns an array containing all existing children.   
| [GET]    | /children/:id | Returns the child with the given 'id'.   
| [GET]    | /children/:id/enrollments | Returns an array filled with event objects with the specified `id`.                |
| [POST]   | /children/:id/enrollments | Returns the event object with the specified `id`. Enrolls a student.               |
| [PUT]    | /children/enrollments/    | Returns the event object with the specified `id`. Updates a student's enrollments. (Not Implemented)|
| [DELETE] | /children/enrollments/:id | Returns the event object with the specified `id`. Unenrolls student from course. (Not Implemented)  |

#### Newsfeed:

| Method   | URL            | Description                                                                |
| -------- | -------------- | -------------------------------------------------------------------------- |
| [GET]    | /newsfeed/     | Returns an array containing all newsfeed objects.                                |
| [GET]    | /newsfeed/:newsfeed_id/ | Returns the event object with the specified `newsfeed_id`.                          |
| [POST]   | /newsfeed/     | Creates a new newsfeed object and returns the newly created newsfeed.     |
| [PUT]    | /newsfeed/:newsfeed_id     | Updates the newsfeed object with the given newsfeed_id and returns the newly updated newsfeed |
| [DELETE] | /newsfeed/:newsfeed_id/ | Deletes the newsfeed object with the given newsfeed_id and returns the deleted newsfeed. |

<br />
