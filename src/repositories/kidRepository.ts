import prisma from '../config/database.js';
import { guardian, kid, presence } from '@prisma/client';
import dayjs from 'dayjs';

export type CreateKidData = Omit<kid, 'id'>
export type CreateGuardianData = Omit<guardian, 'id'>
export type CreatePresenceData = Omit<presence, 'id'>

export async function insertKidData (kidData: CreateKidData) {
    
    await prisma.kid.create({ data: kidData });

}

export async function findByKidName (name: string) {
    
    const kid = await prisma.kid.findFirst({ where: { name } });

    return kid;

}

export async function insertGuardianData (guardianData: CreateGuardianData) {
   
    const guardianInsertion = await prisma.guardian.create({ data: guardianData });
   
    return guardianInsertion;

}

export async function findKidById (kidId: number) {
    
    const result = await prisma.kid.findFirst({ where: { id: kidId } });

    return result;

}

export async function getRegisteredKidsList () {
    
    const result = await prisma.kid.findMany();

    return result;

}

export async function insertKidPresence (presenceData: CreatePresenceData) {

    await prisma.presence.create({ data: presenceData });

}

export async function getPresenceHistoryById (kidId: number) {
    
    return await prisma.presence.findMany({ where: { kidId } });

}

export async function getKidInfo (kidId: number) {
    
    const result = await prisma.kid.findUnique({ 
        where: {
            id: kidId 
        },
        include: {
            guardian: {
                select: {
                    guardianName: true,
                    guardianPhone: true
                }
            }
        } 
    });

    return result;

}

export async function getPresenceToday () {
    
    const result = await prisma.presence.findMany();
    
    return result;

}

export async function getKidsPresenceByDateRepo (date: string) {
    
    const result = await prisma.presence.findMany({ where: { date: date } });

    return result;

}
