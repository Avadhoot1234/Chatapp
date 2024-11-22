import { useState,useEffect } from "react"
import { addDoc,collection, onSnapshot, serverTimestamp ,query,where, orderBy} from "firebase/firestore";
import {auth,db} from "../firebase";
import "../styles/Chat.css"

export const Chat=({room})=>{
    
    //Getting the message from the input with the help of usestate
    const [newMessage,setNewMessage]=useState("");
    //defining or connectiont the firestore database from firebase-config file
    const messageRef=collection(db,"messages");

    const [messages,setMessages]=useState([]);

    useEffect(()=>{
        //With the help of this we are checking if the room ids arethe same
        const queryMessages=query(messageRef,where("room","==",room),orderBy("createdAt"));
        const unsubscribe=onSnapshot(queryMessages,(snapshot)=>{
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(),id:doc.id})
            });
            setMessages(messages);
        })
        return()=> unsubscribe();
    },[])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        //error if the message is empty
        if(newMessage==="") return;
        //Adding the messages to the firebase firestore
        await addDoc(messageRef,{
            text:newMessage,
            createdAt:serverTimestamp(),
            user:auth.currentUser.displayName,
            room,
        });

        setNewMessage("");
    }

    return (
    <div className="chat-app">
        <div className="header">
            Welcome to:{room}
        </div>
        <div className="messages">{messages.map((message)=>(
            <div className="message" key={message.id}>
                <span className="user">{message.user}</span>
                {message.text}
            </div>
        ))}</div>
        <form className="new-message-form" onSubmit={handleSubmit}>
            <input className="new-message-form"
            placeholder="Type your message..."
            onChange={(e)=>setNewMessage(e.target.value)}
            value={newMessage}
            />
        <button type="submit" className="send-button">send</button>
        </form>
    </div>
    )
}

// import React, { useState, useEffect } from "react";
// import { db, auth } from "../firebase";
// import {
//   collection,
//   addDoc,
//   where,
//   serverTimestamp,
//   onSnapshot,
//   query,
//   orderBy,
// } from "firebase/firestore";

// import "../styles/Chat.css";

// export const Chat = ({ room }) => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const messagesRef = collection(db, "messages");

//   useEffect(() => {
//     const queryMessages = query(
//       messagesRef,
//       where("room", "==", room),
//       orderBy("createdAt")
//     );
//     const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
//       let messages = [];
//       snapshot.forEach((doc) => {
//         messages.push({ ...doc.data(), id: doc.id });
//       });
//       console.log(messages);
//       setMessages(messages);
//     });

//     return () => unsuscribe();
//   }, []);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (newMessage === "") return;
//     await addDoc(messagesRef, {
//       text: newMessage,
//       createdAt: serverTimestamp(),
//       user: auth.currentUser.displayName,
//       room,
//     });

//     setNewMessage("");
//   };

//   return (
//     <div className="chat-app">
//       <div className="header">
//         <h1>Welcome to: {room.toUpperCase()}</h1>
//       </div>
//       <div className="messages">
//         {messages.map((message) => (
//           <div key={message.id} className="message">
//             <span className="user">{message.user}:</span> {message.text}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit} className="new-message-form">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(event) => setNewMessage(event.target.value)}
//           className="new-message-input"
//           placeholder="Type your message here..."
//         />
//         <button type="submit" className="send-button">
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };
