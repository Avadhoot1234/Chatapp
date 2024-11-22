
import './App.css';
import Auth from './componenets/Auth';
import React,{useRef, useState} from "react";
import Cookies from 'universal-cookie';
import { Chat } from './componenets/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
const cookies=new Cookies();


function App() {

  const[isAuth,setIsAuth]=useState(cookies.get("Auth-Token"));
  const [room,setRoom]=useState(null);
  const roomInputRef=useRef(null);

  const signUserOut=async()=>{
    await signOut(auth);
    cookies.remove("Auth-Token");
    setIsAuth(false);
    setRoom(null)
  }

  if(!isAuth){

    return (
      <div className="App">
     <Auth/>
    </div>
  );
  }

  return(
    <div>
      {room?(
        <Chat room={room}/>
      ):(
        <div className='room'>
          <label>Enter The Room ID</label>
          <input ref={roomInputRef}/>
          <button onClick={()=>{setRoom(roomInputRef.current.value)}}>Enter</button>
        </div>
      )}

      <div className='sign-out'>
        <button onClick={signUserOut}>signout</button>
      </div>
    </div>
  )
}

export default App;
