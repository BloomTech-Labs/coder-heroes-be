const request = require('supertest');
const express = require('express');
const Newsfeed = require('../../api/newsfeed/newsfeedModel');
const newsfeedRouter = require('../../api/newsfeed/newsfeedRouter');
const server = express();
server.use(express.json());

jest.mock('../../api/newsfeed/newsfeedModel.js');
jest.mock('../../api/middleware/authRequired.js', () =>
  jest.fn((req, res, next) => next())
);

describe('newsfeeds router endpoints', () => {
  beforeAll(() => {
    server.use(['/newsfeed', '/newsfeeds'], newsfeedRouter);
    jest.clearAllMocks();
  });

  describe('GET /newsfeed', () => {
    it('should return 200', async () => {
      Newsfeed.getNewsfeed.mockResolvedValue([]);
      const res = await request(server).get('/newsfeed');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(0);
      expect(Newsfeed.getNewsfeed.mock.calls.length).toBe(1);
    });
  });

  describe('GET /newsfeed/:id', () => {
    it('should return 200 when newsfeed is found', async () => {
      Newsfeed.findByNewsfeedId.mockResolvedValue({ id: 1 });
      const res = await request(server).get('/newsfeed/1');

      expect(res.status).toBe(200);
      expect(res.body.id).toBe(1);
      expect(Newsfeed.findByNewsfeedId.mock.calls.length).toBe(1);
    });

    it('Should return 404 when no newsfeed found', async () => {
      Newsfeed.findByNewsfeedId.mockResolvedValue();
      const res = await request(server).get('/newsfeed/100');

      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Newsfeed Not Found');
    });
  });

  describe('POST /newsfeed', () => {
    it('Should return 201 when newsfeed is added', async () => {
      const newsfeed = {
        title: 'Test NewsFeed',
        link: 'test',
        description: 'New Test newsfeed',
      };
      Newsfeed.findByNewsfeedId.mockResolvedValue([]);
      Newsfeed.addNewsfeed.mockResolvedValue([newsfeed]);

      const res = await request(server).post('/newsfeed').send(newsfeed);

      expect(res.status).toBe(201);
      expect(Newsfeed.addNewsfeed.mock.calls.length).toBe(1);
    });
  });

  describe('PUT /newsfeed', () => {
    it('should return 200 when newsfeed is edited', async () => {
      const newsfeed = {
        title: 'Check out these coding camps!',
        link: 'test',
        description: 'Testing PUT newsfeed',
      };
      Newsfeed.findByNewsfeedId.mockResolvedValue(1);
      Newsfeed.updateNewsfeed.mockResolvedValue([newsfeed]);

      const res = await request(server).put('/newsfeed/1').send(newsfeed);
      expect(res.status).toBe(200);
      expect(res.body.description).toBe('Testing PUT newsfeed');
      expect(Newsfeed.updateNewsfeed.mock.calls.length).toBe(1);
    });
  });
});
