const express = require('express');

const { sendEmail, addToList } = require('../../api/email/emailHelper');
const server = express();

server.use(express.json());

jest.mock('../../api/email/emailHelper.js');
jest.mock('../../api/email/emailHelper.js', () =>
  jest.fn((req, res, next) => next())
);

const newStudent = {
  dynamic_template_data: {
    name: 'New Student Here',
  },
  to: 'someperson@somewhere.com',
  // The from email must be the email address of a verified sender in SendGrid account. If/when you verify the domain, an email coming from the domain is likely good enough.
  from: 'someperson@somewhere.com',
  template_id: 'd-a6dacc6241f9484a96554a13bbdcd971',
};

const newParent = {
  dynamic_template_data: {
    name: 'New Parent Here',
  },
  to: 'someperson@somewhere.com',
  from: 'someperson@somewhere.com',
  template_id: 'd-19b895416ae74cea97e285c4401fcc1f',
};

const newInstructor = {
  dynamic_template_data: {
    name: 'New Parent Here',
  },
  to: 'someperson@somewhere.com',
  from: 'someperson@somewhere.com',
  template_id: 'd-a4de80911362438bb35d481efa068398',
};

const newStudentContact = {
  list_ids: ['e7b598d9-23ca-48df-a62b-53470b5d1d86'],
  email: 'someperson@somewhere.com',
  name: 'new student firstname',
};

const newParentContact = {
  list_ids: ['e7b598d9-23ca-48df-a62b-53470b5d1d86'],
  email: 'someperson@somewhere.com',
  name: 'new parent firstname',
};

const newInstructorContact = {
  list_ids: ['e7b598d9-23ca-48df-a62b-53470b5d1d86'],
  email: 'someperson@somewhere.com',
  name: 'new instructor firstname',
};

describe('Send different email types', () => {
  describe('Send an email to a new student', () => {
    it('Should return 202 when it successfully posts a new student email to SendGrid', async () => {
      const res = await sendEmail(newStudent);
      expect(res.status).toBe(202);
      expect(res.headers.date.length).not.toBe(0);
    });
  });
  describe('Send an email to a new parent', () => {
    it('Should return 202 when it successfully posts a new parent email to SendGrid', async () => {
      const res = await sendEmail(newParent);
      expect(res.status).toBe(202);
      expect(res.headers.date.length).not.toBe(0);
    });
  });
  describe('Send an email to a new instructor', () => {
    it('Should return 202 when it successfully posts a new instructor email to SendGrid', async () => {
      const res = await sendEmail(newInstructor);
      expect(res.status).toBe(202);
      expect(res.headers.date.length).not.toBe(0);
    });
  });
});

describe('Add users to a contact list on SendGrid', () => {
  describe('Add a new student to a contact list', () => {
    it('Should return 202 when it successfully adds a new student to a contact list', async () => {
      const res = await addToList(newStudentContact);
      expect(res.status).toBe(202);
      expect(res.headers.date.length).not.toBe(0);
    });
  });
  describe('Add a new parent to a contact list', () => {
    it('Should return 202 when it successfully adds a new parent to a contact list', async () => {
      const res = await addToList(newParentContact);
      expect(res.status).toBe(202);
      expect(res.headers.date.length).not.toBe(0);
    });
  });
  describe('Add a new instructor to a contact list', () => {
    it('Should return 202 when it successfully adds a new instructor to a contact list', async () => {
      const res = await addToList(newInstructorContact);
      expect(res.status).toBe(202);
      expect(res.headers.date.length).not.toBe(0);
    });
  });
});
