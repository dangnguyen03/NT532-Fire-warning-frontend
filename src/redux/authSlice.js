import { createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState:{
        login:
        {
            currentUser:null,
            isFetching:false,
            error: false,

            raspID: null,
        },
        register:
        {
            isFetching:false,
            error:false,
            success:false,
        },
        logout:
        {
            isFetching: false,
            error: false,
        },
    },
    reducers:
    {
        loginStart: (state) => {
            state.login.isFetching=true;
        },
        loginSucess: (state, action) =>
        {
            state.login.isFetching=false;
            state.login.currentUser=action.payload;
            state.login.error=false
        },
        loginFail: (state) =>
        {
            state.login.error=true;
            state.login.isFetching=false;
        },
        registerStart: (state) => {
            state.register.isFetching=true;
        },
        registerSucess: (state, action) =>
        {
            state.register.isFetching=false;
            state.register.error=false;
            state.register.success=true;
        },
        registerFail: (state) =>
        {
            state.register.error=true;
            state.register.isFetching=false;
        },
        logoutStart: (state) => {
            state.login.isFetching=true;
        },
        logoutSucess: (state, action) =>
        {
            state.login.isFetching=false;
            state.login.currentUser=null;
            state.login.raspID=[];
            state.login.error=false;
        },
        logoutFail: (state) =>
        {
            state.login.error=true;
            state.login.isFetching=false;
        },
        getRaspSucess: (state, action) =>
        {  
            state.login.raspID=action.payload

        },
    }
});
 export const {
    loginFail,
    loginStart,
    loginSucess,
    registerFail,
    registerSucess,
    registerStart,
    logoutStart,
    logoutFail,
    logoutSucess,
    getRaspSucess,
  } = authSlice.actions;
export default authSlice.reducer
