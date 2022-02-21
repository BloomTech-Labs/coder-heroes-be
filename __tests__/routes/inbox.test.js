const request = require('supertest');
const express = require('express');
const inbox = require('../../api/inbox/inboxModel');
const inboxRouter = require('../../api/inbox/inboxRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/inbox/inboxModel.js');
jest.mock('../../api/middleware/authRequired.js', () =>
  jest.fn((req, res, next) => next())
);

describe('inboxs router endpoints', () => {
  beforeAll(() => {
    server.use(['/inbox', '/inboxs'], inboxRouter);
    jest.clearAllMocks();
  });
});

describe('GET /inbox/', () => {
  it('should return 200 and all inboxes', async () => {
    inbox.getInboxes.mockResolvedValue([]);
    const res = await request(server).get('/inbox/');

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(0);
    expect(inbox.getInboxes.mock.calls.length).toBe(1);
  });
});
