import React , { useState, useEffect } from 'react';

const { client, xml } = require("@xmpp/client");
const debug = require("@xmpp/debug");




const Chat3 = () =>{
  console.log('Chamou Chat 3')



  const xmpp = client({
    service: "ws://localhost:5280/websocket",
    domain: "localhost",
    resource: "WebApp",
    username: "luis",
    password: "password",
    transport: 'websocket',
  });

  debug(xmpp, false);


  const connection = () =>{

  
    xmpp.start();

    xmpp.on("error", (err) => {
      console.error(err);
    });
    
    xmpp.on("offline", () => {
      console.log("offline");
    });
    
    xmpp.on("stanza", async (stanza) => {
      if (stanza.is("message")) {
  //      console.log("Message Received: ",stanza.getChild(stanza));
        //await xmpp.send(xml("presence", { type: "unavailable" }));
        //await xmpp.stop();
        
      }
    });
    
    xmpp.on("online", async () => {
      // Makes itself available
      await xmpp.send(xml("presence"));
    
      // Sends a chat message to itself
      const message = xml(
        "message",
        { type: "chat", to: 'admin@localhost' },
        xml("body", {}, "Hello World"),
      );
      await xmpp.send(message);
    });
  
  } 

//connection();


  return(
    <>
      <h1>Chat V3</h1>
    </>
  );

};

export default Chat3;