const request = require('supertest');
const express = require('express');
const Parents = require('../../api/parent/parentModel');
const parentRouter = require('../../api/parent/parentRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/parent/parentModel');
jest.mock('../../api/middleware/authRequired', () =>
  jest.fn((req, res, next) => next())
);

describe('parents router endpoints', () => {
  beforeAll(() => {
    server.use(['/parent', '/parents'], parentRouter);
    jest.clearAllMocks();
  });

  describe('GET /parents', () => {
    it('should return 200', async () => {
      Parents.getParents.mockResolvedValue([]);
      const res = await request(server).get('/parents');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Parents.getParents.mock.calls.length).toBe(1);
    });
  });

  describe('GET /parents/:id', () => {
    it('should return 200 when profile found', async () => {
      Parents.findByParentId.mockResolvedValue({
        id: '40',
        name: 'Test Test',
        email: 'test@test.com',
      });
      const res = await request(server).get('/parents/40');

      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Test Test');
      expect(Parents.getParents.mock.calls.length).toBe(1);
    });

    it('should return 404 when no user found', async () => {
      Parents.findByParentId.mockResolvedValue();
      const res = await request(server).get('/parents/1234123412341234');
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('parentNotFound');
    });
  });
});
