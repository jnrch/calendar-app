import { types } from "../types/types"; 

const initialState = {
    modalOpen: false,
    modalOpenSecond: false
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }

        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
                }
        
        case types.uiOpenModalSecond:
            return {
                ...state,
                modalOpenSecond: true
            }
        
        case types.uiCloseModalSecond:
            return {
                ...state,
                modalOpenSecond: false
            }
    
        default:
            return state;
    }
}