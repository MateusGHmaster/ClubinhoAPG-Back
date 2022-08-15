import findMasterUser, { CreateUserData, insertUserData, findByUserName } from '../repositories/authRepository.js';
import bcrypt from 'bcrypt';
import Jwt  from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

export async function signUpService (userData: CreateUserData) {

    const { name, username, password } = userData;
    const checkForUserName = await findByUserName(username);

    if (!name) {
        throw {

            type: 'bad_request',
            message: 'Name: is absent'

        }
    }

    if (checkForUserName) {
        throw {

            type: 'conflict',
            message: 'Username: already in use'

        }
    }

    userData.password = await bcrypt.hash(password, 10);

    await insertUserData(userData);

}

export async function loginService (userData: CreateUserData) {
    
    const { username, password } = userData;
    const user = await findByUserName(username);
    const master = await findMasterUser(username);

    if ((!user) || !(await bcrypt.compare(password, user.password))) {
        throw {

            type: 'unauthorized',
            message: 'Credentials: incorrect username or password'

        }
    }

    const masterUsers = master.filter((m) => {

        return m.userId == user.id;
        
    }); 

    let isAdmin = false;

    if (masterUsers.length > 0) {
        isAdmin = true;
    } else if (user.permission === false) {
        throw {

            type: 'unauthorized',
            message: 'Login: unauthorized'

        }
    }

    const token = Jwt.sign({ id: user.id, username, isAdmin}, process.env.JWT_SECRET, {expiresIn: '24h'});
    const decodedToken = jwtDecode(token);

    return ([token, decodedToken]);

}