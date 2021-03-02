import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
const { client, xml } = require('@xmpp/client');
const debug = require('@xmpp/debug');

const DOMAIN = 'localhost';
const PASSWORD = 'password';
//const URL = 'https://localhost:5443/bosh/';
const URL = 'ws://177.125.244.8:5280/websocket';
//const URL = 'ws://127.0.0.1:5222/ws-xmpp';

const Chat = () => {
  let USERNAME = localStorage.getItem('username');
  console.log('Load component Chat');
  console.log('Username:', USERNAME);
  const [count, setCount] = useState(1);
  const [xmppStatus, setXmppStatus] = useState('Not connected.');
  const [xmpp, setXmpp] = useState(
    client({
      service: URL,
      domain: DOMAIN,
      resource: 'WebApp',
      username: USERNAME,
      password: PASSWORD,
      transport: 'websocket',
    })
  );
  const [firstAcess, setFirstAcess] = useState(true);
  const [messageTo, setMessageTo] = useState('alberto');
  const [messageSend, setMessageSend] = useState('');
  const [logMessage, setLogMessage] = useState('Start log');
  const [messages, setMessasges] = useState([]);
  const history = useHistory();
  console.log('Log Message: ' + logMessage);

  //console.log(xmpp.status);

  debug(xmpp, false);

  const send = () => {
    console.log(messageTo);
    //console.log(xmppConnection);

    const message = xml(
      'message',
      { type: 'chat', to: messageTo + '@' + DOMAIN },
      xml('body', {}, messageSend + ' (' + count + ')')
    );

    if (xmpp.status === 'online') {
      setCount(count + 1);
      xmpp.send(message);
    } else {
      console.log('Offline');
    }
  };

  const connect = () => {
    if (USERNAME) {
      if (xmpp.status !== 'online') {
        //console.log(username);
        //setXmppConnection(xmpp);
        xmpp.start().catch((error) => {
          console.log('Error', error);
        });

        //setXmppConnection(xmpp);
      } else {
        console.log('Já esta conectado');
      }
    } else {
      //localStorage.removeItem('username');
      history.push('/login');
    }
  };

  const xmppFunctions = () => {
    xmpp.on('error', async (err) => {
      console.error('Error:', err);
      // xmpp.close();
      //xmpp.stop();
      setFirstAcess(true);
      //xmpp.;
      disconnect();
    });

    xmpp.on('stanza', (stanza) => {
      if (stanza.is('message')) {
        //setMessasges([messages , stanza]);
        console.log('Message from: ' + stanza.attrs.from);
        console.log('Message To: ' + stanza.attrs.to);
        //console.log("Message ? ",stanza.children.attrs[0]);

        let msgreceived = '' + stanza.getChild('body');
        setMessasges([messages, msgreceived]);
        //console.log("msgreceived:",msgreceived);
        addLog(msgreceived);

        console.log('Received: ', stanza);
        //console.log('Message Received: ' + stanza.getChild('body'));
      } else {
        //console.log('Other: ',stanza);
      }
    });

    xmpp.on('online', (address) => {
      // Makes itself available
      xmpp.send(xml('presence'));
    });

    /*
    xmpp.on("offline", () => {
      console.log("offline");
  });
*/

    xmpp.on('status', (status) => {
      console.debug('Status: ', status);
      setXmppStatus(status + ' |  Username: ' + USERNAME);
    });
  };

  if (firstAcess) {
    setFirstAcess(false);
    xmppFunctions();
    connect();
  }

  const disconnect = async () => {
    if (xmpp.status === 'online') {
      await xmpp.send(xml('presence', { type: 'unavailable' }));
      //xmpp.close();
      await xmpp.stop();
      //await xmpp.disconnect();
      localStorage.removeItem('username');
      history.push('/login');
      console.log('desconectou');
    } else {
      console.log('No connection');
    }
  };

  const addLog = async (msg) => {
    await setLogMessage(`${logMessage} ${msg}`);
    console.log('setou mensagem');
  };

  const onChangeMessageTo = (e) => {
    e.preventDefault();
    e.persist();
    setMessageTo(e.target.value);
  };

  const onChangeMessage = (e) => {
    e.preventDefault();
    e.persist();
    setMessageSend(e.target.value);
  };

  return (
    <>
      <h1>Chat Messages</h1>
      <p>XMPP Status: {xmppStatus}</p>

      <button
        onClick={() => {
          disconnect();
        }}
      >
        Disconnect
      </button>

      <label>Message to:</label>
      <input
        onChange={onChangeMessageTo}
        id="messageto"
        name="messageto"
        placeholder="Message To"
      ></input>
      <label>Message:</label>
      <input
        onChange={onChangeMessage}
        id="messageSend"
        name="messageSend"
        placeholder="Message"
      ></input>

      <button
        onClick={() => {
          send();
        }}
      >
        Send Message
      </button>
      <button
        onClick={() => {
          addLog('X');
        }}
      >
        addLog
      </button>

      <hr />

      <p>LOG:{logMessage}</p>

      <ul>
        {messages.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default Chat;
