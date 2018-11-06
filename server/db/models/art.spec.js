'use strict';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../index');
const agent = request.agent(app);

const db = require('../db');
const Art = require('./art');

describe('Art Route:', () => {

  before(() => {
    return db.sync({force: true});
  });


  afterEach(() => {
    return Promise.all([
      Art.truncate({ cascade: true })
    ]);
  });

  describe('GET /art', () => {
    it('responds with an array', async () => {

      const res = await agent
      .get('/art')
      .expect(200);

      expect(res.body).to.be.an.instanceOf(Array);
      expect(res.body).to.have.length(0);

    });

    it('returns art if there is any in the DB', async () => {

      await Art.create({
        title: 'Fake Mona Lisa',
        description: 'Handmade',
        price: 300.00,
        quantity: 1,
        image: 'https://i.etsystatic.com/17185369/r/il/93061f/1437515490/il_570xN.1437515490_nksd.jpg',
        height: 30,
        width: 20,
        category: 'Realism'
      });

      const res = await agent
      .get('/art')
      .expect(200);

      expect(res.body).to.be.an.instanceOf(Array);
      expect(res.body[0].title).to.equal('Fake Mona Lisa');
    });

    it('returns more art if there is any in the DB', async () => {

      await Art.create({
        title: 'Fake Picasso',
        description: 'Handmade',
        price: 300.00,
        quantity: 1,
        image: 'https://i.etsystatic.com/17185369/r/il/93061f/1437515490/il_570xN.1437515490_nksd.jpg',
        height: 30,
        width: 20,
        category: 'Realism'
      });
      await Art.create({
        title: 'Fake Pollack',
        description: 'Handmade',
        price: 300.00,
        quantity: 1,
        image: 'https://i.etsystatic.com/17185369/r/il/93061f/1437515490/il_570xN.1437515490_nksd.jpg',
        height: 30,
        width: 20,
        category: 'Realism'
      });

      const res = await agent
      .get('/art')
      .expect(200);

      expect(res.body).to.be.an.instanceOf(Array);
      expect(res.body[0].title).to.equal('Fake Picasso');
      expect(res.body[1].title).to.equal('Fake Pollack');

    });

  });
});
