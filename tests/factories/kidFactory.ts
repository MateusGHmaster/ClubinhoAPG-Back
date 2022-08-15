import { faker } from '@faker-js/faker';
import prisma from '../../src/config/database.js';

function createGuardianData () {

    return {

        guardianName: faker.name.fullName(),
        guardianPhone: faker.phone.number('9########')

    }

}

function createKidData () {

    return {

        name: faker.name.fullName(),
        birthDate: faker.date.birthdate(),
        guardianId: 1

    }

}

function registerPresence () {

    return {

        date: faker.date.between('01/01/2010', '31/12/2020'),
        isPresent: true, 
        kidId: 1

    }

}

async function getKidsList () {

    const result = await prisma.kid.findMany();

    return result;

}

export async function getPresenceDays () {
    
    const result = await prisma.presence.findMany();
    
    return result;

}

const kidFactory = {

    createGuardianData, 
    createKidData,
    registerPresence,
    getKidsList,
    getPresenceDays

}

export default kidFactory;