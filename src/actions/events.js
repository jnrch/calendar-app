import Swal from "sweetalert2";
import { fetchWithToken, fetchWithTokenFile } from "../helpers/fetch";
import { prepareEvents, prepareEventsPerTotalPaymentType } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async(dispatch, getState) => {
        
        const {uid, name, email, roles} = getState().auth;

        try {
            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();
            
            if (body.ok) {
                const endDateFormat = new Date(body.event.end);

                event.file = body.event.file;
                event.provider = body.event.provider;
                event.observation = body.event.observation;
                event.start = endDateFormat;
                event.end =  endDateFormat;
                event.status = body.event.status;
                event.amount = body.event.amount;
                event.id = body.event.id;
                event.paymentMethod = body.event.paymentMethod;
                event.user = {
                    id: uid,
                    name: name,
                    email: email,
                    roles: roles
                }
                
                dispatch(eventAddNew(event));
           }
            
        } catch (error) {
            console.log(error);
        }
    }
} 

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

export const eventStartUpdate = ( event2, event ) => {
    return async(dispatch) => {

        try {
            const resp = await fetchWithToken(`events/${ event.id }`, event2, 'PUT' );
            const body = await resp.json();

            if ( body.ok ) {
                const endDateFormat = new Date(body.event.end);

                event.file = body.event.file;
                event.provider = body.event.provider;
                event.observation = body.event.observation;
                event.start = endDateFormat;
                event.end = endDateFormat;
                event.status = body.event.status;
                event.amount = body.event.amount;
                event.id = body.event.id;
                event.paymentMethod = body.event.paymentMethod;
                dispatch( eventUpdated( event ) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }

        } catch (error) {
            console.log(error)
        }

    }
}

const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent;
        try {
            const resp = await fetchWithToken(`events/${ id }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventDeleted() );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error)
        }

    }
}

const eventDeleted = () => ({ type: types.eventDeleted });

export const eventStartLoading = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('events');
            const body = await resp.json();

            const events = prepareEvents(body);

            dispatch(eventLoaded(events));
        } catch (error) {
            console.log(error);
        }
    }
}

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventStartLoadingTotalPerPayment = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('events/totalPerPayment');
            const body = await resp.json();

            const events = prepareEventsPerTotalPaymentType(body);

            dispatch(eventPerTotalPaymentLoaded(events));
        } catch (error) {
            console.log(error);
        }
    }
}

const eventPerTotalPaymentLoaded = (events) => ({
    type: types.eventPerTotalPaymentLoaded,
    payload: events
});

export const eventStartFileLoading = (fileName) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithTokenFile(`events/file/${ fileName }`);
            const url = await resp.url;
            window.open(url);
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const eventDeleteFile = (fileName, event) => {
    return async(dispatch) => {
        try {
            const resp = await fetchWithToken(`events/file/${ fileName }/event/${ event.id }`, {}, 'DELETE');
            const body = await resp.json(); 

            if (resp.status === 200) {
                const endDateFormat = new Date(body.end);

                event.file = body.file;
                event.provider = body.provider;
                event.observation = body.observation;
                event.start = endDateFormat;
                event.end = endDateFormat;
                event.status = body.status;
                event.amount = body.amount;
                event.id = body.id;
                event.paymentMethod = body.paymentMethod;

                dispatch( eventFileDeleted() );
                Swal.fire('Eliminado!','Archivo eliminado!','success')
            }

        } catch (error) {
            console.log(error)
        }
    }
}

const eventFileDeleted = () => ({ type: types.eventFileDeleted });

export const eventLogout = () => ({ type: types.eventLogout });