import React, { useState } from 'react';
import { useHistory } from "react-router-dom";


function Login(){
  const history = useHistory();
  const [userName, setUserName]=useState('');


  const login = (e) => {
    e.preventDefault();
    console.log("Auth user: "+userName);
    if(userName !== ''){
      localStorage.setItem('username', userName);
      history.push('/chat');
    }
  }

  const connect = () =>{

  }

  const onChangeUsername = (e) =>{
    e.preventDefault();
    e.persist();
    setUserName(e.target.value);

  }


  return(
    <>
      <form onSubmit={login}>

        <label>Username:</label>
        <input
          onChange={onChangeUsername}
          id="username"
          name="username"
          placeholder="Username"
        ></input>
        <button
          onClick={() => {
            connect();
          }}
        >
          Connect
      </button>
      </form>

    </>

  );


}



export default Login;