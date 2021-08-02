import fetch from 'node-fetch';
import React, { useState, useReducer, useEffect } from 'react';


const reducer = (prev, action) =>{
    switch(action.type){
        case "json_data":
            return{
                ...prev,
                id: action.id,
                last: action.last,
                isError: false
            }
        case "error":
            return{
                ...prev,
                errorValue: "please enter correct value.",
                isError: true
            }
        case "inputForm":
            return{
                ...prev,
                inputcurrent: action.value

            }
    }
}

const initialState = {
    id: "Type THB_AAVE, THB_ABT, THB_ADA",
    last: "",
    errorValue: "",
    inputcurrent: "",
    isError: false
}


const BitkubMarketTicker = () => {

    const [data, setData] = useReducer(reducer,initialState)
    const [selection, setSelection] = useState()
 

    console.log(selection)



    const onHaddleSubmit = (e) =>{
        e.preventDefault();
        setSelection(e.target.value);
        bitkubAPI();
        
    }

    const bitkubAPI = () => {
        console.log(selection)
        fetch('https://api.bitkub.com/api/market/ticker')
        .then(response => response.json())
        .then(jsonData => jsonData[selection])
        .then(jsonData2 => setData({type:"json_data",id:jsonData2['id'], last:jsonData2['last']}))
        

    .catch (()=>{
        setData({type:"error"})

     
    })

    }

 
    // useEffect(bitkubAPI, [])
    
 
    console.log(data)


 
    return (
        <div>
            <p>ID: {data.id}</p>
            <p >Price: {data.last}</p>
            <hr/>
            <div>
            THB_AAVE, THB_ABT, THB_ADA
            </div>
            <form onSubmit={onHaddleSubmit}>
                
                <input type="text"
                label="type-curr"
                onChange={(e) => setSelection(e.target.value)}
                value={selection}
                 />

                <button type="submit">Submit</button>
            </form>
            <p style={{color: "red"}}>{data.isError? data.errorValue: ""}</p>
        </div>
    )

}

export default BitkubMarketTicker;






