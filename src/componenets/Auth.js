import{auth,provider} from '../firebase.js';
import {signInWithPopup} from 'firebase/auth'
import Cookies from "universal-cookie";

const cookies=new Cookies();





export const Auth=(props)=>{

  const{setIsAuth}=props;
    const signInWithGoogle=async()=>{

      try{
        const result=await signInWithPopup(auth,provider);
        cookies.set("Auth-Token",result.user.refreshToken);
        setIsAuth(true);
      }catch(err){
        console.error(err)
      }
    }
  return (
    <div>
      <p>Signin With Google</p>
      <button onClick={signInWithGoogle}>SignIn</button>
    </div>
  )
}

export default Auth
