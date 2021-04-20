import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { statusCodes } from '../utils/statuscode';
import { Tab } from '../models/tab';
import { deleteAllData } from './model';
import { dataOne, dataTwo, dataThree, dataFour } from './mock';

const { expect } = chai;


chai.use(chaiHttp);

const tabBaseURL = '/api/v1/tabs';


let tabIdOne;
let tabIdTwo;
let tabIdThree;


describe('Test for Tab route', () => {

    before(async () => {
        // runs before all tests in this file regardless where this line is defined.
        await deleteAllData(Tab);
    });
  
    describe('Test Create Tabs', () => {
      it('Should return 201 status code and create a tab', async () => {
        
        const res = await chai.request(app)
          .post('/api/v1/tabs')
          .send(dataOne);
        expect(res.status).to.equal(statusCodes.created);
        expect(res.body).to.have.property('data');
        tabIdOne = res.body.data._id;
      });

      it('Should return 201 status code and create another tab', async () => {
        const res = await chai.request(app)
          .post('/api/v1/tabs')
          .send(dataTwo);
        expect(res.status).to.equal(statusCodes.created);
        expect(res.body).to.have.property('data');
        tabIdTwo = res.body.data._id;
      });

      it('Should return 201 status code and create another tab', async () => {
        const res = await chai.request(app)
          .post('/api/v1/tabs')
          .send(dataThree);
        expect(res.status).to.equal(statusCodes.created);
        expect(res.body).to.have.property('data');
        tabIdThree = res.body.data._id;
      });

      it('Should return 400 status code and not create another tab', async () => {
        const res = await chai.request(app)
          .post('/api/v1/tabs')
          .send(dataFour);
        expect(res.status).to.equal(statusCodes.badRequest);
        expect(res.body).to.have.property('error');
      });
    });

    
    describe('Test GET /tabs', () => {
        it('Should return status code of 200 and all tabs', async() => {
            const res = await chai.request(app)
          .get(tabBaseURL)
          console.log('>>', res.body);
          expect(res.status).to.equal(statusCodes.success);
          expect(res.body).to.have.property('data');
        })
    })

    //PUT /questions
    describe('Test PUT /tabs', () => {
        it('Should return 200 and UPDATE TAB', async () => {
            const res = await chai.request(app)
            .put(`/api/v1/tabs/${tabIdOne}`)
            .send({name: 'new name'});
          expect(res.status).to.equal(statusCodes.success);
        });

        //DELETE /tabs
        it('Should return 204 and delete tab', async () => {
            const res = await chai.request(app)
            .delete(`/api/v1/tabs/${tabIdTwo}`)
          expect(res.status).to.equal(statusCodes.deleted);
        });
    })      
  });