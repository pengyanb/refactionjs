const superTest = require('supertest');
const _ = require('lodash');
const app = require('../../index');
const request = superTest(app);

describe('data.server.route.test', () => {
  it('post name key to "/data/read" should return filtered data array', async (done) => {
    try {
      const res = await request.post('/data/read').send({
        filterInfo: {
          name: 'j',
        },
      });
      expect(res.body.error === false).toBeTruthy();
      expect(res.body.data).toBeDefined();
      expect(_.isEqual(res.body.data, [
        {
          name: 'Jim',
          age: 30,
          gender: 'male',
          _id: 'b3Fshn8F976TZCTg',
        },
        {
          name: 'Jane',
          age: 55,
          gender: 'female',
          _id: 'k3nEqkqlKmWZNejC',
        },
      ])).toBeTruthy();
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it('post gender key to "/data/read" should return filtered data array', async (done) => {
    try {
      const res = await request.post('/data/read').send({
        filterInfo: {
          gender: ['male'],
        },
      });
      expect(res.body.error === false).toBeTruthy();
      expect(res.body.data).toBeDefined();
      expect(_.isEqual(res.body.data, [
        {
          name: 'Jim',
          age: 30,
          gender: 'male',
          _id: 'b3Fshn8F976TZCTg',
        },
        {
          name: 'Bob',
          age: 20,
          gender: 'male',
          _id: 'oqnu2ZnPTebp04bG',
        },
      ])).toBeTruthy();
      done();
    } catch (err) {
      done.fail(err);
    }
  });

  it('post age key to "/data/read" should return filtered data array', async (done) => {
    try {
      const res = await request.post('/data/read').send({
        filterInfo: {
          age: { $gte: 30 },
        },
      });
      expect(res.body.error === false).toBeTruthy();
      expect(res.body.data).toBeDefined();
      expect(_.isEqual(res.body.data, [
        {
          name: 'Jim',
          age: 30,
          gender: 'male',
          _id: 'b3Fshn8F976TZCTg',
        },
        {
          name: 'Jane',
          age: 55,
          gender: 'female',
          _id: 'k3nEqkqlKmWZNejC',
        },
      ])).toBeTruthy();
      done();
    } catch (err) {
      done.fail(err);
    }
  });
});
