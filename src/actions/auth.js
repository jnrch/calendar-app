import Swal from 'sweetalert2';
import { fetchWithToken, fetchWithTokenRefresh, fetchWitoutToken } from '../helpers/fetch';
import { types } from '../types/types';
import { eventLogout } from './events';

export const startLogin = (email,password) => {
    return async(dispatch) => {
        const resp = await fetchWitoutToken('auth/signin', {email,password}, 'POST');
        const body = await resp.json();
        console.log(body);
        
        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('email', body.email);
            localStorage.setItem('name', body.name);
            localStorage.setItem('id', body.id);
            localStorage.setItem('token-init-date', new Date().getTime());

            console.log(body);

            dispatch(login({
                uid: body.id,
                name: body.name,
                email: body.email,
                roles: body.roles
            }));
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

//export const startRegister = (email, password, name) => {
export const startRegister = (signin) => {
    return async(dispatch) => {
        const resp = await fetchWitoutToken('auth/signup', signin, 'POST');
        const body = await resp.json();
        
        if (body.ok) {
            //localStorage.setItem('token', body.token);
            //localStorage.setItem('token-init-date', new Date().getTime());

            /*dispatch(login({
                uid: body.uid,
                name: body.name
            }));*/
        } else {
            Swal.fire('Error', body.msg, 'error');
            console.log(body);
        }
    }
}

export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchWithTokenRefresh('auth/renew');
        const body = await resp.json();
        
        if (resp.status === 200) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.id,
                name: body.name,
                roles: body.roles
            }));
        } else {
            dispatch(checkingFinish());
        }
    }
}

const checkingFinish = () => ({type: types.authCheckingFinish});

const login= (user) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(eventLogout());
        dispatch(logout());
    }
}

const logout = () => ({type: types.authLogout});