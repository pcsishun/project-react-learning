import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const UserGitHub = () => {
    
    const [jsonData, setJsonData] = useState([])

    
    useEffect(() => {
        const fetch = async () => {

            const response = await Axios.get('https://api.github.com/users');

            // console.log(response.data);  
            setJsonData(response.data)
            
        }
        fetch()
    }, [])
    
    const saveData = []

    for (let i = 0; i < jsonData.length ; i++){
        if(i <= 5){
            saveData.push(jsonData[i])
        }
        }

    console.log(saveData)

    return (
        <>
            <p>Github user infomation: </p>
            {saveData.map(saveData => <p>{saveData.login}</p>)}
        </>

    )
}

export default UserGitHub;




