import React  from 'react';

var XMPP = require('stanza.io');

const USERNAME = 'luis';
const DOMAIN = 'localhost';
const PASSWORD = 'password';
//const URL = 'https://localhost:5443/bosh/';
const URL = 'ws://127.0.0.1:5280/websocket';
//const URL = 'ws://127.0.0.1:5222/ws-xmpp';


function Chat2(){

    var client = XMPP.createClient({
      jid: USERNAME+'@'+DOMAIN,
      password: PASSWORD,
      resource: "WebApp",
      // If you have a .well-known/host-meta.json file for your
      // domain, the connection transport config can be skipped.
  

      wsURL: URL,

      // (or `boshURL` if using 'bosh' as the transport)
  });
  
  client.on('session:started', function() {
    console.log('started');
      client.getRoster();
      client.sendPresence();
  });

  client.on('chat', function(msg) {
    console.log("Chat");
    client.sendMessage({
        to: "admin@localhost",
        body: 'You sent: ' 
    });
  });
  
  client.connect();


  return (
    <>
      <h1>Chat com Stanza</h1>
    </>
  );

};

export default Chat2;