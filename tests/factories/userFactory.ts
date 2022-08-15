import { faker } from '@faker-js/faker';
import prisma from '../../src/config/database.js';
import bcrypt from 'bcrypt';
import { Jwt } from 'jsonwebtoken';
import JwtDecode from 'jwt-decode';

interface userSignUp {

    name: string,
    username: string,
    password: string,
    passwordConfirmation: string

} 

function createUserData () {

    const fakePassword = faker.internet.password(8);

    return {

        name: faker.name.fullName(),
        username: faker.internet.userName(),
        password: fakePassword,
        passwordConfirmation: fakePassword

    }

}

async function loginUser () {

    const fakeName = faker.name.fullName();
    const fakeUserName = faker.internet.userName();
    const fakePassword = faker.internet.password();

    const user = await prisma.users.create({ 
        data: {
            name:  fakeName,
            username: fakeUserName, 
            password: fakePassword,
            permission: true
        } 
    });

    return { ...user, originalPassword: fakePassword }

} 

const userFactory = {

    createUserData,
    loginUser

}

export default userFactory;
