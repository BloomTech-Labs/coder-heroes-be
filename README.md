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
  key: INCREMENT,
  okta: STRING,
  name: STRING,
  email: STRING,
  avatarUrl: STRING,
}
```

<h1>Admins</h1>

```
{
  id: INCREMENT,
  user_id: INTEGER,
}
```

<h1>Parents</h1>

```
{
  id: INCREMENT,
  user_id: INTEGER,
}
```

<h1>Children</h1>

```
{
  id: INCREMENT,
  user_id: INTEGER,
  parent_id: INTEGER,
  username: STRING,
  age: INTEGER,
}
```

<h1>Instructors</h1>

```
{
  id: INCREMENT,
  user_id: INTEGER,
  bio: STRING,
  rating: INTEGER
}
```

<h1>Inboxes</h1>

```
{
  id: INCREMENT,
  user_id: INTEGER,
}
```

<h1>Messages</h1>

```
{
  id: INCREMENT,
  inbox_id: INTEGER,
  sender_id: INTEGER,
  sent_at: TIMESTAMP,
  title: STRING,
  message: STRING,
  read: BOOLEAN,
}
```

<h1>Courses</h1>

```
{
  id: INCREMENT,
  description: STRING,
  subject: STRING,
  prereq: TEXT ARRAY,
}
```

<h1>Schedules</h1>

```
{
  id: INCREMENT,
  course_id: INTEGER,
  instructor_id: INTEGER,
  size: INTEGER,
}
```

<h1>Sessions</h1>

```
{
  start_time: TIME,
  end_time: TIME,
  start_date: DATE,
  end_date: DATE,
  location: STRING,
}
```

<h1>Enrollments</h1>

```
{
  id: INCREMENT,
  child_id: INTEGER,
  course_id: INTEGER,
}
```

<h1>Instructors List</h1>

```
{
  id: INCREMENT,
  instructor_id: INTEGER,
  course_id: INTEGER,
  approved: BOOLEAN,
  approved_by: INTEGER,
}
```

<h1>Resources</h1>

```
{
  id: INCREMENT,
  il_id: INTEGER,
  resource: STRING,
  task: BOOLEAN,
}
```

<h1>Newsfeed</h1>

```
{
  id: INCREMENT,
  title: INTEGER,
  link: INTEGER,
  description: STRING,
  posted_at: TIMESTAMP,
}
```

#### Profile:

| Method   | URL             | Description                                                                  |
| -------- | --------------- | ---------------------------------------------------------------------------- |
| [GET]    | /profile/       | Returns an array filled with event objects.                                  |
| [GET]    | /profile/:okta/ | Returns an event object with the specified `okta`.                           |
| [POST]   | /profile/       | Requires a name, password, and email. Registers a new user.                  |
| [PUT]    | /profile/       | Returns an event object with the specified `okta`. Updates specific profile. |
| [DELETE] | /profile/:okta/ | Returns an event object with the specified `okta`. Deletes specific profile. |

#### Admin:

| Method   | URL         | Description                                                                |
| -------- | ----------- | -------------------------------------------------------------------------- |
| [GET]    | /admin/     | Returns an array filled with event objects.                                |
| [GET]    | /admin/:id/ | Returns an event object with the specified `id`.                           |
| [POST]   | /admin/     | Returns an event object with the specified `user_id`. Creates a new admin. |
| [PUT]    | /admin/     | Returns an event object with the specified `id`. Updates specific admin.   |
| [DELETE] | /admin/:id/ | Returns an event object with the specified `id`. Deletes specific admin.   |

#### Parent:

| Method   | URL                    | Description                                                                    |
| -------- | ---------------------- | ------------------------------------------------------------------------------ |
| [GET]    | /parent/               | Returns an array filled with event objects.                                    |
| [GET]    | /parent/:id/           | Returns an event object with the specified `id`.                               |
| [GET]    | /parent/:id/children/  | Returns an array filled with event objects with the specified `id`.            |
| [GET]    | /parent/:id/schedules/ | Returns an array filled with event objects with the specified `id`.            |
| [POST]   | /parent/               | Returns an event object with the specified `user_id`. Creates a new parent.    |
| [PUT]    | /parent/               | Returns an event object with the specified `user_id`. Updates specific parent. |
| [DELETE] | /parent/:id/           | Returns an event object with the specified `id`. Deletes specific parent.      |

#### Instructor:

| Method   | URL                      | Description                                                                     |
| -------- | ------------------------ | ------------------------------------------------------------------------------- |
| [GET]    | /instructor/             | Returns an array filled with event objects.                                     |
| [GET]    | /instructor/:id/         | Returns an event object with the specified `id`.                                |
| [GET]    | /instructor/:id/classes/ | Returns an array filled with event objects with the specified `id`.             |
| [POST]   | /instructor/             | Returns an event object with the specified `user_id`. Creates a new instructor. |
| [PUT]    | /instructor/             | Returns an event object with the specified `id`. Updates specific instructor.   |
| [DELETE] | /instructor/:id/         | Returns an event object with the specified `id`. Deletes specific instructor.   |

#### User:

| Method | URL              | Description                                                             |
| ------ | ---------------- | ----------------------------------------------------------------------- |
| [GET]  | /user/           | Returns an event object with the specified `okta` and `type`.           |
| [GET]  | /user/inbox/     | Returns an event object with the specified `okta`.                      |
| [GET]  | /user/schedules/ | Returns an event object with the specified `okta`.                      |
| [PUT]  | /user/           | Returns an event object with the specified `id`. Updates specific user. |

#### inbox:

| Method   | URL              | Description                                                                              |
| -------- | ---------------- | ---------------------------------------------------------------------------------------- |
| [GET]    | /inbox/          | Returns an array filled with event objects.                                              |
| [GET]    | /inbox/:okta/    | Returns an array filled with event objects with the specific `okta`. Retrieves an inbox. |
| [POST]   | /inbox/          | Returns the event object with the specified `user_id`. Creates an inbox.                 |
| [POST]   | /inbox/messages/ | Returns the event object with the specified `inbox_id`. Sends a message.                 |
| [PUT]    | /inbox/          | Returns an array filled with event objects with the specific `okta`. Updates an inbox.   |
| [DELETE] | /inbox/:okta/    | Returns an array filled with event objects with the specific `okta`. Deletse an inbox.   |

#### Course:

| Method   | URL              | Description                                                                                                     |
| -------- | ---------------- | --------------------------------------------------------------------------------------------------------------- |
| [GET]    | /course/         | Returns an array filled with event objects.                                                                     |
| [GET]    | /course/:subject | Returns the event object with the specified `subject`.                                                          |
| [POST]   | /course/         | Contains fields: `description`, `subject`, and `prereq`. Returns the event object with the specified `subject`. |
| [PUT]    | /course/         | Updates the event with the specified `subject` using data from the `request body`. Returns the modified event   |
| [DELETE] | /course/:subject | Removes the event with the specified `subject` and returns the deleted event.                                   |

#### Class:

| Method | URL |
Description |
| ----- | ------------------- | --------------------------------------------------- | ----------- |
| [GET] | /class-instance | Returns an array filled with specific class objects |
| [GET] | /class-instance/:class-id | Returns the class with specified `id`.  
| [POST] | /class-instance | Returns the class object with the specified `id`. Creates a class.
| [PUT] | /class-instance/:class-id | Returns the class object with the specified `id`. Updates a specific class.
| [DELETE]| /class-instance/:class-id | Returns the class object with the specified `id`. Deletes specific class.

#### Schedule:

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
| [GET]    | /children/                | Returns an array filled with event objects.                                        |
| [GET]    | /children/:id/            | Returns the event object with the specified `id`.                                  |
| [GET]    | /children/:id/enrollments | Returns an array filled with event objects with the specified `id`.                |
| [POST]   | /children/:id/enrollments | Returns the event object with the specified `id`. Enrolls a student.               |
| [POST]   | /children/                | Returns the event object with the specified `user_id`. Creates a student.          |
| [PUT]    | /children/                | Returns the event object with the specified `id`. Updates a student.               |
| [PUT]    | /children/enrollments/    | Returns the event object with the specified `id`. Updates a student's enrollments. |
| [DELETE] | /children/:id/            | Returns the event object with the specified `inbox_id`. Delete's specific student. |
| [DELETE] | /children/enrollments/:id | Returns the event object with the specified `id`. Unenrolls student from course.   |

#### Newsfeed:

| Method   | URL            | Description                                                                |
| -------- | -------------- | -------------------------------------------------------------------------- |
| [GET]    | /newsfeed/     | Returns an array filled with event objects.                                |
| [GET]    | /newsfeed/:id/ | Returns the event object with the specified `id`.                          |
| [POST]   | /newsfeed/     | Returns the event object with the specified `id`. Creates a new obect.     |
| [PUT]    | /newsfeed/     | Returns the event object with the specified `id`. Updates specific object. |
| [DELETE] | /newsfeed/:id/ | Returns the event object with the specified `id`. Deletes specific object. |

<br />
