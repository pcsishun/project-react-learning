import fetch from 'node-fetch';
import React, { useState, useReducer } from 'react';


const reducer = (prev, action) =>{
    switch(action.type){
        case "json_data":
            return{
                ...prev,
                id: action.id,
                last: action.last,
            }
    }
}

const initialState = {
    id: "Type THB_AAVE, THB_ABT, THB_ADA",
    last: "",
    isError: false
}


const BitkubMarketTicker = () => {

    const [data, setData] = useReducer(reducer,initialState)
    const [selection, setSelection] = useState()
    const [isError, setIsError] = useState()

    console.log(selection)

    const onHaddleSubmit = (e) =>{
        e.preventDefault();
        console.log(selection)

        try{
            fetch('https://api.bitkub.com/api/market/ticker')
            .then(response => response.json())
            .then(jsonData => jsonData[selection])
            .then(jsonData2 => setData({type:"json_data",id:jsonData2['id'], last:jsonData2['last']}))
        }
        catch (err){
            setIsError(err.message)
        }
        
    }

 
 
    // console.log('Data is',data)  
   
 
    return (
        <div>
            <p style={{color: "red"}}>{isError !== '' && isError}</p>
            <p>ID: {data.id}</p>
            <p>Price: {data.last}</p>
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

        </div>
    )

}

export default BitkubMarketTicker;






