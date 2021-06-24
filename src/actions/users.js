import Swal from "sweetalert2";
import { fetchWithToken, fetchWithToken2 } from "../helpers/fetch";
import { types } from "../types/types";

export const userStartAddNew = (user) => {
    return async(dispatch, getState) => {
        
        try {
            const resp = await fetchWithToken2('auth/signup', user, 'POST');
            const body = await resp.json();

            if (body.ok) {

            } 
            dispatch(userAddNew(user));

        } catch (error) {
            console.log(error);
        }
    }
}

const userAddNew = (user) => ({
    type: types.userAddNew,
    payload: user
});

export const userSetActive = (user) => ({
    type: types.userSetActive,
    payload: user
});

export const userClearActiveUser = () => ({
    type: types.userClearActiveUser
});

export const userStartUpdate = (user) => {
    return async(dispatch) => {
        try {
            const resp = await fetchWithToken2(`auth/users/${ user.id }`, user, 'PUT');
            const body = await resp.json();

            if (resp.status === 200) {
                dispatch(userUpdated(user));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const userUpdated = (user) => ({
    type: types.userUpdated,
    payload: user
});

export const userStartChangePasswordUpdate = (user, password) => {
    return async(dispatch) => {
        try {
            const resp = await fetchWithToken2(`auth/users/${ user.id }/password`, password, 'PUT');
            const body = await resp.json();

            if (resp.status === 200) {
                dispatch(userPasswordUpdated(user));
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const userPasswordUpdated = (user) => ({
    type: types.userPasswordUpdated,
    payload: user
});

export const userStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('auth/users');
            const body = await resp.json();

            const users = body;

            dispatch(userLoaded(users));
        } catch (error) {
            console.log(error);
        }
    }
}

const userLoaded = (users) => ({
    type: types.userLoaded,
    payload: users
});