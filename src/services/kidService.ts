import { 
    CreateKidData, 
    CreatePresenceData, 
    insertKidData, 
    findByKidName, 
    insertKidPresence, 
    CreateGuardianData, 
    insertGuardianData, 
    getPresenceHistoryById, 
    findKidById, 
    getKidInfo, 
    getRegisteredKidsList, 
    getPresenceToday, 
    getKidsPresenceByDateRepo 
} from '../repositories/kidRepository.js';
import dayjs from 'dayjs';

export async function kidRegistrationService (kidData: CreateKidData) {

    const { name } = kidData;
    const checkForKidName = await findByKidName(name);

    if (checkForKidName) {
        throw {

            type: 'conflict',
            message: 'Kid: already registered'

        }
    }

    await insertKidData(kidData);

}

export async function guardianRegistrationService (guardianData: CreateGuardianData) {
    
    const guardianDataInsertion = await insertGuardianData(guardianData);

    return guardianDataInsertion;

}

export async function getKidsListService () {
    
    return await getRegisteredKidsList();

}

export async function kidPresenceService (presenceData: CreatePresenceData) {

    await insertKidPresence(presenceData);

}

export async function getPresenceHistoryService (kidId: number) {

    const presenceHistory = await getPresenceHistoryById(kidId);

    if (!presenceHistory) {
        throw {

            type: 'not_found',
            message: 'Kid: presence history not found'

        }
    }

    const pivotArray = [];

    const presenceDays = [];

    for (let i = presenceHistory.length - 1; i >= 0; i --) {

        const include = pivotArray.includes(presenceHistory[i].date);

        if (!include) {
            pivotArray.push(presenceHistory[i].date);
            presenceDays.push(presenceHistory[i]);
        }
        
    }

    return presenceDays;

}

export async function getKidInfoService (kidId: number) {
    
    const kidInfo = await getKidInfo(kidId);

    if (!kidInfo) {
        throw {

            type: 'not_found',
            message: 'Info: not found'

        }
    }

    return kidInfo;

}

export async function getKidsPresenceTodayService () {
    
    const date = dayjs().format('DD-MM-YYYY');
    const kidsPresenceList = await getPresenceToday();
    const idArray = [];

    const listByDate = kidsPresenceList.filter((value) => {

        return value.date === date;

    });


    const listByKidId = [];

    for (let i = listByDate.length - 1; i >= 0; i --) {

        const include = idArray.includes(listByDate[i].kidId);

        if (!include) {
            idArray.push(listByDate[i].kidId);
            listByKidId.push(listByDate[i]);
        }
        
    }

    return listByKidId;

}

export async function getPresenceDaysService () {
    
    const daysHistory = await getPresenceToday();

    const pivotArray = [];

    const presenceDays = [];

    for (let i = daysHistory.length - 1; i >= 0; i --) {

        const include = pivotArray.includes(daysHistory[i].date);

        if (!include) {
            pivotArray.push(daysHistory[i].date);
            presenceDays.push(daysHistory[i]);
        }
        
    }

    return presenceDays;

}

export async function getKidsPresenceByDateService (date: string) {
    
    const presenceByDate = await getKidsPresenceByDateRepo(date);

    if (!presenceByDate) {
        throw {

            type: 'not_found',
            message: 'Presences: not found'

        }
    }

    const pivotArray = [];

    const presentKidsOnThatDay = [];

    for (let i = presenceByDate.length - 1; i >= 0; i --) {

        const include = pivotArray.includes(presenceByDate[i].kidId);

        if (!include) {
            pivotArray.push(presenceByDate[i].kidId);
            presentKidsOnThatDay.push(presenceByDate[i]);
        }
        
    }

    return presentKidsOnThatDay;

}

export async function findKidByIdService (kidId: number) {
    
    const kid = await findKidById(kidId);

    return kid;

}

