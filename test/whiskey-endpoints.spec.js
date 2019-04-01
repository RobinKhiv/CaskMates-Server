/* eslint-disable no-undef */
'use strict';

const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Things Endpoints', function() {
  let db;

  const { testUsers, testWhiskey, testReviews } = helpers.makeWhiskeyFixtures();

  // function makeAuthHeader(user) {
  //   const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64');
  //   return `Bearer ${token}`;
  // }

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('Protected endpoints', () => {
    beforeEach('insert whiskey', () =>
      helpers.seedWhiskeyTables(db, testUsers, testWhiskey, testReviews)
    );

    describe('GET /api/whiskeys/:whiskey_id', () => {
    //   it('responds with 401 \'Missing bearer token\' when no bearer token', () => {
    //     return supertest(app)
    //       .get('/api/whiskey/123')
    //       .expect(401, { error: 'Missing bearer token' });
    //   });
    //   it('responds 401 \'Unauthorized request\' when invalid JWT secret', () => {
    //     const validUser = testUsers[0];
    //     const invalidSecret = 'bad-secret';
    //     return supertest(app)
    //       .post('/api/whiskey/123')
    //       .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
    //       .expect(401, { error: 'Unauthorized request' });
    //   });
      it('responds 401 \'Unauthorized request\' when invalid sub in payload', () => {
        const invalidUser = { user_name: 'user-not-existy', id: 1 };
        return supertest(app)
          .post('/api/whiskeys')
          .set('Authorization', helpers.makeAuthHeader(invalidUser))
          .expect(401, { error: 'Unauthorized request' });
      });
    });
  });

  describe('GET /api/whiskeys', () => {
    context('Given no whiskeys', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('/api/whiskeys')
          .expect(200, []);
      });
    });

    context('Given there are whiskeys in the database', () => {
      beforeEach('insert whiskeys', () =>
        helpers.seedWhiskeyTables(db, testUsers, testWhiskey, testReviews)
      );

      it('responds with 200 and all of the whiskeys', () => {
        const expectedWhiskeys = testWhiskey.map(whiskey =>
          helpers.makeExpectedWhiskey(testUsers, whiskey, testReviews)
        );
        return supertest(app)
          .get('/api/whiskeys')
          .expect(200)
          .expect(res => {
            expect(res.body[0].id).to.eql(expectedWhiskeys[0].id);
            expect(res.body[0].whiskey_name).to.eql(expectedWhiskeys[0].whiskey_name);
            expect(res.body[0].content).to.eql(expectedWhiskeys[0].content);
            expect(res.body[0].image).to.eql(expectedWhiskeys[0].image);
            // const expectedDate = new Date(expectedWhiskeys[0].date_created).toLocaleString('en', {timeZone:'UTC'});
            // const actualDate = new Date(res.body[0].date_created).toLocaleString();
            // expect(actualDate).to.eql(expectedDate);
          });
      });
    });

    context('Given an XSS attack whiskey', () => {
      const testUser = helpers.makeUsersArray()[1];
      const { maliciousWhiskey, expectedWhiskey } = helpers.makeMaliciousWhiskey(
        testUser
      );

      beforeEach('insert malicious whiskey', () => {
        return helpers.seedMaliciousWhiskey(db, testUser, maliciousWhiskey);
      });

      it('removes XSS attack content', () => {
        return supertest(app)
          .get('/api/whiskeys')
          .expect(200)
          .expect(res => {
            expect(res.body[0].whiskey_name).to.eql(expectedWhiskey.whiskey_name);
            expect(res.body[0].content).to.eql(expectedWhiskey.content);
          });
      });
    });
  });

  describe.only('GET /api/whiskeys/:whiskey_id', () => {
    context('Given no whiskeys', () => {
      beforeEach('insert whiskeys', () => 
        helpers.seedWhiskeyTables(db, testUsers));
      it('responds with 404', () => {
        const whiskeyId = 123456;
        return supertest(app)
          .get(`/api/whiskeys/${whiskeyId}`)
        //   .set('Authorization', helpers.makeAuthHeader(testUsers[0], process.env.JWT_SECRET))
          .expect(404, { error: 'Whiskey doesn\'t exist' });
      });
    });

    context('Given there are whiskeys in the database', () => {
      beforeEach('insert whiskeys', () =>
        helpers.seedWhiskeyTables(db, testUsers, testWhiskey, testReviews)
      );

      it('responds with 200 and the specified thing', () => {
        const whiskeyId = 2;
        const expectedWhiskey = helpers.makeExpectedWhiskey(
          testUsers,
          testWhiskey[whiskeyId - 1],
          testReviews
        );

        return supertest(app)
          .get(`/api/whiskeys/${whiskeyId}`)
        //   .set('Authorization', helpers.makeAuthHeader(testUsers[0], process.env.JWT_SECRET))
          .expect(200)
          .expect(res => {
            expect(res.body.whiskey_name).to.eql(expectedWhiskey.whiskey_name);
            expect(res.body.content).to.eql(expectedWhiskey.content);
          });
      });

      context('Given an XSS attack whiskey', () => {
        const testUser = helpers.makeUsersArray()[1];
        const { maliciousWhiskey, expectedWhiskey } = helpers.makeMaliciousWhiskey(
          testUser
        );

        beforeEach('insert malicious whiskey', () => {
          return helpers.seedMaliciousWhiskey(db, testUser, maliciousWhiskey);
        });

        it.skip('removes XSS attack content', () => {
          return supertest(app)
            .get(`/api/whiskeys/${maliciousWhiskey.id}`)
            // .set('Authorization', helpers.makeAuthHeader(testUser, process.env.JWT_SECRET))
            .expect(200)
            .expect(res => {
              expect(res.body.whiskey_name).to.eql(expectedWhiskey.whiskey_name);
              expect(res.body.content).to.eql(expectedWhiskey.content);
            });
        });
      });
    });

    describe('GET /api/reviews/:whiskey_id', () => {
      context('Given no whiskeys', () => {
        it('responds with 404', () => {
          const whiskeyId = 123456;
          return supertest(app)
            .get(`/api/reviews/${whiskeyId}`)
            .expect(404, { error: 'Whiskey doesn\'t exist' });
        });
      });

      context('Given there are reviews for thing in the database', () => {
        beforeEach('insert things', () =>
          helpers.seedWhiskeyTables(db, testUsers, testWhiskey, testReviews)
        );

        it('responds with 200 and the specified reviews', () => {
          const whiskeyId = 1;
          const expectedReviews = helpers.makeExpectedWhiskeyReviews(
            testUsers,
            whiskeyId,
            testReviews
          );
        
          return supertest(app)
            .get(`/api/reviews/${whiskeyId}`)
            // .set('Authorization', helpers.makeAuthHeader(testUsers[0], process.env.JWT_SECRET))
            .expect(200)
            .expect(res => {
              expect(res.body[0].id).to.eql(expectedReviews[0].id);
              expect(res.body[0].tasting).to.eql(expectedReviews[0].tasting);
              expect(res.body[0].rating).to.eql(expectedReviews[0].rating);
              // expect(res.body[0].user).to.eql(expectedReviews[0].user);
            //   const expectedDate = new Date(expectedReviews[0].date_created).toLocaleString('en', {timeZone:'UTC'});
            //   const actualDate = new Date(res.body[0].date_created).toLocaleString();
            //   expect(actualDate).to.eql(expectedDate);
            });
        });
      });
    });
  });});
