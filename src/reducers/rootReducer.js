import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { calendarPerPaymentReducer } from './calendarPerPaymentReducer';
import { calendarReducer } from './calendarReducer';
import { providerReducer } from './providerReducer';
import { uiReducer } from './uiReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer,
    provider: providerReducer,
    user: userReducer,
    eventPerPayment: calendarPerPaymentReducer
    //Todo AuthReducer
    //todo: CalendarReducer
})