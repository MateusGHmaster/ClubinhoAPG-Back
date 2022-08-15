import supertest from 'supertest';
import userFactory from './factories/userFactory.js';
import app from '../src/app.js';
import prisma from '../src/config/database.js';
import kidFactory from './factories/kidFactory.js';

beforeEach (async () => {

    await prisma.$executeRaw`

        TRUNCATE TABLE users CASCADE;
    
    `;

});

describe('signup tests suite', () => {

    it('should create a new user, and return 201, given name, username and password', async () => {

        const signUp = userFactory.createUserData();
        const response = await supertest(app).post('/sign-up').send(signUp);

        expect(response.status).toEqual(201);

    });

    it('should return error, given absent password field', async () => {

        const signUp = userFactory.createUserData();
        
        delete signUp.password;

        const response = await supertest(app).post('/sign-up').send(signUp);

        expect(response.status).toEqual(500);

    });

});

describe('signin tests suite', () => {

    it('should return a token, given valid input', async () => {

        const login = userFactory.loginUser();
        const response = await supertest(app).post('/login').send(login);
        const token = response;

        expect(token).not.toBeNull();

    });

    it('should return, given absent input', async () => {

        const login = userFactory.loginUser();

        delete (await login).password;

        const response = await supertest(app).post('/login').send(login);
        const token = response;

        expect(response.status).toEqual(500);

    });

});

describe('register kid tests suite', () => {

    it('should create a guardian, and return status 201', async () => {

       const signGuardian = kidFactory.createGuardianData();
       const response = await supertest(app).post('/register-r').send(signGuardian);

       expect(response.status).toEqual(201);

    });

    it('should return status 500, given absent guardian name', async () => {

        const signGuardian = kidFactory.createGuardianData();
        
        delete signGuardian.guardianName;

        const response = await supertest(app).post('/register-r').send(signGuardian);

        expect(response.status).toEqual(500);

    });

    it('should create a kid, and return status 201', async () => {

        const signKid = kidFactory.createKidData();
        const response = await supertest(app).post('/register-c').send(signKid);

        expect(response.status).toEqual(201);

    });

    it('should return 500, given absent guardianId', async () => {

        const signKid = kidFactory.createKidData();
        
        delete signKid.guardianId;

        const response = await supertest(app).post('/register-c').send(signKid);

        expect(response.status).toEqual(500);

    });

});

describe('register presence', () => {

    it('should register presence, and return status 200', async () => {

        const registerPresence = kidFactory.registerPresence();
        const response = await supertest(app).post('/presence').send(registerPresence);

        expect(response.status).toEqual(200);

    });

});

describe('get kids list', () => {

    it('should return a list with all kids names', async () => {

        const kidsList = kidFactory.getKidsList();
        const response = await supertest(app).get('/kids');

        expect(response).not.toBeNull();

    });

});

describe('get days when presence was registered', () => {

    it('should return a list with the days presences were registered', async () => {

        const historyDaysList = kidFactory.getPresenceDays();
        const response = await supertest(app).get('/days-history');

        expect(response).not.toBeNull();

    });

});

afterAll(async () => {

    await prisma.$disconnect();

});
//template: it('', async () => {}); 