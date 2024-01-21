import { useContext, useState } from "react";
import axios from "axios";
import {UserContext} from "./UserContext.jsx"

export default function Register(){
    const [username, setUsername]= useState('');
    const[password, setPassword] = useState('');
    const [isLoginorRegister, setIsLoginorRegister] = useState('login');
    const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);
    async function handleSubmit(ev) {
        ev.preventDefault();
        const url = isLoginorRegister === 'register' ? 'register' : 'login';
        const {data}=await axios.post(url, {username, password});
        setLoggedInUsername(username);
        setId(data.id);
    }
    
    return(
       <div className="bg-blue-50 h-screen flex items-center">
        <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
            <input value={username} onChange={ev=> setUsername(ev.target.value)} type="text" placeholder="username" className="block w-full rounded-sm p-2 mb-2 border"/>
            <input value={password} onChange={ev=> setPassword(ev.target.value)} type="password" placeholder="password" className="block w-full rounded-sm p-2 mb-2 border"/>
            <button className="bg-blue-500 text-white block w-full rounded-sm p-2">{isLoginorRegister === 'register'? 'Register' : 'Login' }</button>
        <div className="text-center mt-2">
            {isLoginorRegister === 'register' &&
            ( <div>
                Already a member? 
                <button onClick={()=>setIsLoginorRegister('login')}>Login here</button>
            </div>
            )}
          {isLoginorRegister === 'login' &&
            ( <div>
                Don't have an account? 
                <button onClick={()=>setIsLoginorRegister('register')}>Register here</button>
            </div>
            )}
        </div>
       
      
       </form>
       </div> 
    );
}