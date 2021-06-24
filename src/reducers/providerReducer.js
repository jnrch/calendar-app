import { types } from '../types/types';

const initialState = {
    providers: [],
    activeProvider: null
};

export const providerReducer = ( state = initialState, action ) => {
    switch (action.type) {
    
        case types.providerSetActive:
            return {
                ...state,
                activeProvider: action.payload
            }

        case types.providerAddNew:
            return {
                ...state,
                providers: [
                    ...state.providers,
                    action.payload
                ]
            }

        case types.providerClearActiveProvider: 
            return {
                ...state,
                activeProvider: null
            }
        
        case types.providerUpdated:
            return {
                ...state,
                providers: state.providers.map(
                    e => (e.id === action.payload.id ) ? action.payload : e
                )
            }
        
        case types.providerDeleted:
            return {
                ...state,
                providers: state.providers.filter(
                    e => (e.id !== state.activeProvider.id)
                ),
                activeProvider: null
            }
        
        case types.providerLoaded:
            return {
                ...state,
                providers: [...action.payload]
            }
        
        case types.providerLogout:
            return {
                ...initialState
            } 
            
        default:
            return state;
    }
}