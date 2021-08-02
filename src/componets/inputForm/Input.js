const Input = (props) => {
    return(
        <div>
            <div>
                <label>{props.label}</label>
            </div>
            <div>
                <input 
                {...props}
                type={props.type}/>
            </div>
        </div>
    )
}

export default Input; 