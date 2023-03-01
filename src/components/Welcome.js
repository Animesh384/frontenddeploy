import axios from "axios";
import React, { useEffect, useState } from "react";
axios.defaults.withCredentials = true;
let firstRender = true;

const Welcome = () => {
    const [User, setUser] = useState();
    
    const refreshToken = async () => {
        const res = await axios.get("http://localhost:5000/api/refresh", {
            withCredentials: true
        }).catch(err => console.log(err));
        const data = await res.data;
        return data;
    }
    
    
    const sednRequest = async () => {
        const res = await axios.get('http://localhost:5000/api/user', {
            withCredentials: true,
        })
            .catch(err => console.log(err));
        const data = await res.data;
        return data;
    };
    useEffect(() => {
        sednRequest().then((data) => setUser(data.User));
        if(firstRender) {
            firstRender = false;
        }
        let interval = setInterval(() => {
            refreshToken().then((data) => setUser(data.User));
        }, 1000 * 28)
        
        return () => clearInterval(interval);
    }, []);
    return (
        <div>
            {User && <h1>{User.email}</h1>}
            {User && <h1>{User.username}</h1>}
        </div>
    );
};

export default Welcome;