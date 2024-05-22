import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [clientMessage, setClientMessage] = useState<string>("");

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connected');
      setSocket(newSocket);
    };
    newSocket.onmessage = (msg) => {
      console.log('Received message: ' + msg.data);
      setMessages((m) => [...m, msg.data]);
    };

    return ()=>{
      socket?.close()
    }
  }, []);

  if(!socket){
    return <div>Loading....</div>
  }

  return (
    <div>
      <input type="text" placeholder='Enter message' onChange={(e) => {
        setClientMessage(e.target.value);
      }} />
      <button onClick={() => {
        socket?.send(clientMessage);
      }}>Send message</button>

      <div>
        Received Messages:
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
}

export default App;