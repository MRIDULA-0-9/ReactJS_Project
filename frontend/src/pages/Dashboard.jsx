import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupList from "../components/GroupList";
import ChatBox from "../components/ChatBox";
import "../App.css";

function Dashboard(){

const [selectedGroup,setSelectedGroup] = useState(null);
const [groupName,setGroupName] = useState("");
const [members,setMembers] = useState([]);
const [username,setUsername] = useState("");

const navigate = useNavigate();

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
return <h2>Please login first</h2>;
}

const logout = () => {
localStorage.removeItem("user");
navigate("/login");
};

return(

<div className="app-container">

{/* Sidebar */}
<div className="sidebar">

<h2>Groups</h2>

<GroupList
setSelectedGroup={setSelectedGroup}
setGroupName={setGroupName}
setMembers={setMembers}
/>

</div>

{/* Chat Area */}
<div className="chat-area">

<div className="chat-header">

<h2>This is {groupName} group</h2>

<button onClick={logout} className="logout-btn">
Logout
</button>

</div>

<ChatBox
groupId={selectedGroup}
username={user.name}
/>

</div>

{/* Members */}
<div className="members">

<h3>Members</h3>

{members.map((m,i)=>(
<div key={i} className="member-item">
{m}
</div>
))}

</div>

</div>

);

}

export default Dashboard;