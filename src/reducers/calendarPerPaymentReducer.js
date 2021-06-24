import { types } from '../types/types';

const initialState = {
    eventsPerPayment: [],
    activeEvent: null
};

export const calendarPerPaymentReducer = ( state = initialState, action ) => {
    switch (action.type) {

        case types.eventPerTotalPaymentLoaded:
            return {
                ...state,
                eventsPerPayment: [...action.payload]
            }
        
        case types.eventLogout:
            return {
                ...initialState
            } 
            
        default:
            return state;
    }
}