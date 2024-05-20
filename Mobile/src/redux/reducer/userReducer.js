import { LOGIN, LOGOUT } from "../../Constant";


const initialState = {
    isLoginSuccess: false,
    user: null

}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                user: action.playload.user,
                isLoginSuccess: action.playload.isLoginSuccess,

            }
        }
        case LOGOUT: {
            return {
                ...state,
                user: null,
                isLoginSuccess: false
            }
        }

        // Default
        default: {
            return state;
        }

    }

}


export default userReducer