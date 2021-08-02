const OnLogin = (props) => {
    const memberList = {
        username: "Admin",
        password: "1234"
    }

    return(
        new Promise((resolve, reject) =>{
        setTimeout(() => {
            if( props.username === "Admin" &&   props.password === "1234"){
                resolve(props.username);
            }
            reject('Invalid username or password: this error call from OnLogin function');
        }, 3000);
    })) 
}

export default OnLogin;


 