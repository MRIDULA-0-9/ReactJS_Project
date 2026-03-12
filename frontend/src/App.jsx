import { useState } from "react";
import GroupList from "./components/GroupList";
import ChatBox from "./components/ChatBox";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
<Routes>
<Route path="/" element={<Login/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/dashboard" element={<Dashboard/>}/>
</Routes>
</BrowserRouter>

function App(){

const [selectedGroup,setSelectedGroup] = useState(null);
const [groupName,setGroupName] = useState("");
const [members,setMembers] = useState([]);
const [username,setUsername] = useState("");   // ✅ ADD THIS

return(

<div className="app-container">

<div className="sidebar">

<h2>Groups</h2>

<GroupList
setSelectedGroup={setSelectedGroup}
setGroupName={setGroupName}
setMembers={setMembers}
/>

</div>


<div className="chat-area">

<h2>This is {groupName} group</h2>

<ChatBox
groupId={selectedGroup}
username={username}
/>

</div>


<div className="members">

<h3>Members</h3>

{members.map((m,i)=>(
<div key={i} className="member-item">
{m}
</div>
))}

</div>

</div>

)

}

export default App;