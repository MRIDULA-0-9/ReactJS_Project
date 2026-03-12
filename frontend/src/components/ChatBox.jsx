import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function ChatBox({ groupId }) {

const [msg, setMsg] = useState("");
const [messages, setMessages] = useState([]);


// Load messages when group changes
useEffect(() => {

if (!groupId) return;

axios
.get(`http://localhost:5000/api/messages/${groupId}`)
.then(res => {
setMessages(res.data);
});

// listen for realtime messages
const receiveHandler = (data) => {

if (data.groupId === groupId) {
setMessages(prev => [...prev, data]);
}

};

socket.on("receiveMessage", receiveHandler);

// cleanup
return () => socket.off("receiveMessage", receiveHandler);

}, [groupId]);



const sendMessage = async () => {

if (msg.trim() === "" || !groupId) return;

const user = JSON.parse(localStorage.getItem("user"));

const messageData = {
groupId: groupId,
sender: user?.name || "User",
text: msg
};

try {

await axios.post(
`http://localhost:5000/api/groups/${groupId}/message`,
messageData
);

// instantly show message
setMessages(prev => [...prev, messageData]);

// realtime socket
socket.emit("sendMessage", messageData);

setMsg("");

} catch (err) {
console.log(err);
}

};



const uploadFile = async (e) => {

const file = e.target.files[0];

const formData = new FormData();

formData.append("file", file);

const res = await axios.post(
"http://localhost:5000/api/upload",
formData
);

const imageName = res.data.file;

const user = JSON.parse(localStorage.getItem("user"));

const messageData = {
groupId: groupId,
sender: user?.name || "User",
image: imageName
};

await axios.post(
`http://localhost:5000/api/groups/${groupId}/message`,
messageData
);

socket.emit("sendMessage", messageData);

// show image instantly
setMessages(prev => [...prev, messageData]);

};



return (

<div>

<div className="messages">

{messages.map((m, i) => (

<div key={i} className="message">

{m.text && (
<p><b>{m.sender}</b>: {m.text}</p>
)}

{m.image && (
<img
src={`http://localhost:5000/uploads/${m.image}`}
width="200"
/>
)}

</div>

))}

</div>


<div className="chat-input">

<input
value={msg}
onChange={(e) => setMsg(e.target.value)}
placeholder="Type message"
/>

<input type="file" onChange={uploadFile} />

<button className="send-btn" onClick={sendMessage}>
Send
</button>

</div>

</div>

);

}

export default ChatBox;