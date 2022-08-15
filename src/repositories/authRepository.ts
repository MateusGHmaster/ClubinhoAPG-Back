import prisma from '../config/database.js';
import { users } from '@prisma/client';

export type CreateUserData = Omit<users, 'id'>

export interface userToken {

    id: number,
    username: string

}

export async function insertUserData (userData: CreateUserData) {
    
    await prisma.users.create({ data: userData });

}

export async function findByUserName (username: string) {
    
    const user = await prisma.users.findUnique({ where: { username } });

    return user;

}

export default async function findMasterUser (username: string) {
    
    const master = await prisma.master.findMany();

    return master;

}