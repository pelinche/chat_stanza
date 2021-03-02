import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const history = useHistory();
  const [userName, setUserName] = useState('');
  const [logMessage, setLogMessage] = useState('');

  const login = (e) => {
    e.preventDefault();
    console.log('xAuth user: ' + userName);
    if (userName !== '') {
      localStorage.setItem('username', userName);
      history.push('/chat');
    }
  };

  const connect = () => {};

  const onChangeUsername = (e) => {
    e.preventDefault();
    e.persist();
    setUserName(e.target.value);
  };

  const addLog = async (msg) => {
    await setLogMessage(`${logMessage} ${msg}`);
    console.log('setou mensagem');
  };

  return (
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
        <button
          onClick={() => {
            setLogMessage(logMessage + 'X');
          }}
        >
          addLog
        </button>
        <p>{logMessage}</p>
      </form>
    </>
  );
}

export default Login;
