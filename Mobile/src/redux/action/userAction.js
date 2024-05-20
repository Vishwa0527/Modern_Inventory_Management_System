import { LOGIN, LOGOUT } from "../../Constant";


export const userLogin = (user, isLoginSuccess) => ({
    type: LOGIN,
    playload: { user: user, isLoginSuccess: isLoginSuccess }
});

export const userLogout = () => ({
    type: LOGOUT,
    playload: ''
})
