import Chat from './components/Chat';

//import Chat3 from './components/Chat3';
//import Chat2 from './components/Chat2';

//import { BoshClient } from 'xmpp-bosh-client/browser';

function App() {
  /*
  function  send(){
    const message = xml(
      "message",
      { type: "chat", to: 'admin@localhost' },
      xml("body", {}, "hello world"),
    );
    xmpp.send(message);
  };

  function connect(){
    xmpp.start().catch(console.error);
  };

  function disconnect(){
    //xmpp.send(xml("presence", { type: "unavailable" }));
//    setXmppStatus(xmpp.entity.status);
  
    xmpp.stop();
    //xmpp.disconnect();
  };

  

  const xmpp = client({
    service: URL,
    domain: DOMAIN,
    username: USERNAME,
    password: PASSWORD,
  });
  debug(xmpp, false);

  
xmpp.on("error", (err) => {
  console.error(err);
});

xmpp.on("offline", () => {
  console.log("*offline");
//  setXmppStatus(xmpp.entity.status);
});

xmpp.on("stanza", async (stanza) => {
  
  if (stanza.is("message")) {
    console.log('Recebeu uma mensagem',stanza);
    //await xmpp.send(xml("presence", { type: "unavailable" }));
    //await xmpp.stop();
  }
});

xmpp.on("status", (status) => {
  //console.debug(status);
  setXmppStatus(xmpp.entity.status);
});

xmpp.on("online", (address) => {
  console.log("online as", address.toString());
  addLog('online');
  xmpp.send(xml("presence")).catch(console.error);
  //setXmppStatus(xmpp.entity.status);
});
*/

  return (
    <div className="App">
      <Chat />
    </div>
  );
}

export default App;
