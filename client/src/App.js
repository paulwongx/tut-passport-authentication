import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [data, setData] = useState(null);

    const register = () => {
        axios({
            method: 'POST',
            data: {
                username: registerUsername,
                password: registerPassword,
            },
            withCredentials: true,
            url: 'http://localhost:4001/register'
        }).then(res => console.log(res));
    };
    const login = () => {
        axios({
            method: 'POST',
            data: {
                username: loginUsername,
                password: loginPassword,
            },
            withCredentials: true,
            url: 'http://localhost:4001/login'
        }).then(res => console.log(res));
    };
    const getUser = () => {
        axios({
            method: 'GET',
            withCredentials: true,
            url: 'http://localhost:4001/user'
        }).then(res => {
            setData(res.data);
            console.log(res.data);
        });
    };

  return (
    <div className="App">
        <h1>Authentication Template</h1>
        <div className="register">
            <h2>Register</h2>
            <input placeholder='username' onChange={e=>setRegisterUsername(e.target.value)} />
            <input placeholder='password' onChange={e=>setRegisterPassword(e.target.value)} />
            <button onClick={register}>Submit</button>
        </div>
        <div className="login">
            <h2>Login</h2>
            <input placeholder='username' onChange={e=>setLoginUsername(e.target.value)} />
            <input placeholder='password' onChange={e=>setLoginPassword(e.target.value)} />
            <button onClick={login}>Submit</button>
        </div>
        <div>
            <h2>Get User</h2>
            <button onClick={getUser}>Submit</button>
            {
                data ? <h3>Welcome back {data.username}</h3> : null
            }
        </div>
    </div>
  );
}

export default App;
