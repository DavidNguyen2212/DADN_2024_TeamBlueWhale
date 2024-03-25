import Header from "../../Components/Header/Header";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";

// const socket = io('http://127.0.0.1:5000/');

const Setting = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  // useEffect(() => {
  //   socket.on('response', data => {
  //     setResponse(data);
  //   });
  // }, []);

  // const sendMessage = () => {
  //   socket.emit('message', message);
  //   setMessage('');
  // };

  return (
    <div className="">
      <Header pageName={"Cài đặt"}></Header>

      {/* <div>
        <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      <p>Response from server: {response}</p>
    </div> */}
    </div>
  );
};
  
export default Setting;