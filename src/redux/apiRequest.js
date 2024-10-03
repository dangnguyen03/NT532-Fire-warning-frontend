import axios from "axios";
import { loginFail, loginStart, loginSucess, logoutFail, logoutStart, logoutSucess, 
        registerFail, registerStart, registerSucess,
        getRaspSucess } from "./authSlice";

export const loginUser = async(user,dispatch, navigate) =>
{
    dispatch(loginStart());
    try {
        const res = await axios.post(process.env.REACT_APP_API_LOGIN, user);
        dispatch(loginSucess(res.data));
        navigate('/');
    } catch (error) {
        dispatch(loginFail());
        alert('Sai username hoặc password')
    }
}

export const getRaspUser = async(user, dispatch, navigate) =>
{
    try {
        const resRasp = await axios.post('http://localhost:9000/api/add/getAllRasp', user);
        console.log(user);
        dispatch(getRaspSucess(resRasp.data));
        navigate('/')
    } catch (error) {
        alert('Lỗi lấy thông tin raspberry mà user có');
    }
}
export const registerUser = async (user, dispatch, navigate) =>
{
    dispatch(registerStart());
    try {
        await axios.post(process.env.REACT_APP_API_REGISTER,user);
        dispatch(registerSucess());
        navigate('/login');
    } catch (error) {
        dispatch(registerFail());
        alert('Có vấn đề khi đăng kí, có thể username đã tồn tại')
    }
}

export const logOut =  async(dispatch,id, navigate, accessToken) =>
{
    dispatch(logoutStart());
    try{
        console.log(process.env.REACT_APP_API_LOGOUT);
        await axios.post(process.env.REACT_APP_API_LOGOUT,id, {
            headers: {token: `Bearer ${accessToken}`}
        })
        dispatch(logoutSucess())
        navigate('/login')
    }catch (error)
    {
        dispatch(logoutFail())
    }
}