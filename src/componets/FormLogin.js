import React, { useReducer } from 'react';
import Input from './inputForm/Input';
import OnLogin from './operateLogin/Onlogin';
import BitkubMarketTicker from '../api/BitkubMarketTicker';



const reducer = (prev, action) =>{
    switch(action.type){
        case "userEnter":
            return{
                ...prev, 
                [action.userEnter]: action.value,
            }
        case "error":
            return{
                ...prev,
                error: action.value,
            }
        case "login":
            return{
                ...prev,
                islogin: true,
            }
        case "logout":
            return{
                ...prev, 
                username: "",
                password:"",
                islogin: false,
                isloading: false
            }
        case "awaitLoading":
            return{
                ...prev,
                isloading: true
            }
        case "awaitLoadingError":
            return{
                ...prev,
                isloading: false
            }
    }
}

const initialState = {
    username:"",
    password:"",
    islogin: false,
    userType:"",
    error: "",
    isloading: false
}

const FormLogin = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const haddleSubmit =  async (e) => {
        e.preventDefault();

        dispatch({type:"awaitLoading"})

        const promise = OnLogin({ username: state.username , password: state.password});
        
        promise.then(
            (loginType)=>{
                console.log(loginType)
                dispatch({ type: 'error', value:''})
                dispatch({type: 'login'})
            }
        ).catch(
            (error)=>{
                dispatch({ type: "error",  value: error});
                dispatch({type: "awaitLoadingError"})
            }
        )
    }
  


    if (state.islogin === true){
        
        return(
            <div>
                <h1>You are login with {state.username}</h1>
                <button onClick={() => dispatch({type:"logout"})}>Logout</button>
                <div>
                    <BitkubMarketTicker/>
                </div>
            </div>
        )
    }

    
    return (    
        <div>
            <p style={{color: "red"}}>{state.error !== '' && state.error}</p>
            <form onSubmit= {haddleSubmit}>
                <Input
                    label="Username"
                    type="text"
                    onChange={(e) => dispatch({type:"userEnter", userEnter:"username", value: e.target.value})}
                    value={state.username}
                />
                <Input
                    label="Password"
                    type="password"
                    onChange={(e) => dispatch({type:"userEnter", userEnter:"password", value: e.target.value})}
                    value={state.password}
                />
                <div>
                    <button type="submit">{state.isloading ? "loading": "Submit"}</button>
                </div>
            </form>
        </div>
    )
}


export default FormLogin;