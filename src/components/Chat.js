import React , { useState, useEffect } from 'react';

const { client, xml } = require("@xmpp/client");
const debug = require("@xmpp/debug");


//let xmppStatus = "Xmpp status";
//let logMessage = "";



//var XMPP = require('stanza.io');
let USERNAME = 'luis';
const DOMAIN = 'localhost';
const PASSWORD = 'password';
//const URL = 'https://localhost:5443/bosh/';
const URL = 'ws://127.0.0.1:5280/websocket';
//const URL = 'ws://127.0.0.1:5222/ws-xmpp';


const Chat  = () =>{
//function Chat(){
  //console.log('carregou componente Chat');
  const [count,setCount]=useState(1);
//  const [messageTo, setMessageTo] = useState('');
  const [xmppStatus, setXmppStatus] = useState('Not connected.');
  const [userName, setUsername] = useState('luis');
  const [xmpp, setXmpp] = useState(client({
    service: URL,
    domain: DOMAIN,
    resource: "WebApp",
    username: userName,
    password: PASSWORD,
    transport: 'websocket',
  }));
  const [firstAcess,setFirstAcess]=useState(true);
  const [messageTo, setMessageTo] = useState('');
  const [messageSend, setMessageSend] = useState('');
  const [logMessage,setLogMessage] = useState('');
  const [messages, setMessasges] = useState([]);

  
  
  console.log(xmpp.status);


  debug(xmpp, false);


  
  const send = ()=> {
    //console.log(messageTo);
    //console.log(xmppConnection);
    
    const message = xml(
      "message",
      { type: "chat", to: messageTo+"@"+DOMAIN },
      xml("body", {},messageSend+" ("+count+")"),
    );
    
    if(xmpp.status === "online"){
      setCount(count + 1);
      xmpp.send(message);
    }else{
      console.log("Offline");
    }
    
    
  }
  
  const connect = ()=>{

    
    if(xmpp.status !== "online"){
      //console.log(username);
      //setXmppConnection(xmpp);
      xmpp.start().catch(console.error);
      //setXmppConnection(xmpp);
    }

  }
 

  const xmppFunctions = () =>{
    xmpp.on("error", (err) => {
      console.error(err);
    });
    
    
    xmpp.on("stanza", (stanza) => {
      if (stanza.is("message")) {
        setLogMessage(""+stanza.getChild('body'));
        //addLog("X");
        console.log("logMessage: ",stanza);
        console.log("Message Received: "+stanza.getChild('body'));
      }else{
        //console.log('Other: ',stanza);
      }
    });
    
    xmpp.on("online", (address) => {
      // Makes itself available
      xmpp.send(xml("presence"));
    
    });
    
/*    
    xmpp.on("offline", () => {
      console.log("offline");
    });
*/

xmpp.on("status", (status) => {
  console.debug("Status: ",status);
  setXmppStatus(status +" Username: "+userName);

});


   


  }
  
  if(firstAcess){

    setFirstAcess(false);
    xmppFunctions();

  }
  
  
  
  const  disconnect = async ()=>{
    if(xmpp.status === "online"){

      await xmpp.send(xml("presence", { type: "unavailable" }));
      //xmpp.close();
      await xmpp.stop();
      //await xmpp.disconnect();
      
      console.log('desconectou');
    }else{
      console.log('No connection');
    }
  }
  


  const  addLog = (msg)=>{
    setLogMessage(logMessage + "<br />"+msg);
    
  }




  const onChangeMessageTo = (e) => {
    e.preventDefault();
    e.persist();
    setMessageTo( e.target.value);
  }

  const onChangeMessage = (e) => {
    e.preventDefault();
    e.persist();
    setMessageSend( e.target.value);
  }

 return (
  <>
    <h1>Chat Messages</h1>
      <p>XMPP Status: {xmppStatus}</p>

      <button onClick={()=>{
        connect();
      }}>Connect</button>
            <button onClick={()=>{
        disconnect();
      }}>Disconnect</button>
      
      <label>Message to:</label>
      <input 
      onChange={onChangeMessageTo}
      id='messageto'
      name='messageto'
      placeholder='Message To'
      ></input>
      <label>Message:</label>
      <input 
      onChange={onChangeMessage}
      id='messageSend'
      name='messageSend'
      placeholder='Message'
      ></input>      

      <button onClick={()=>{
        send();
      }}>Send Message</button>

      <hr />





    <p>LOG:{logMessage}</p>

      <ul>
        {messages.map((item, idx)=>(
            <li key={idx}>
              {item}
            </li>
        ))}
      </ul>
  </>

 );

};

export default Chat;