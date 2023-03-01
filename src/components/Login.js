import React, {useState} from "react";
import { TextField, Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }
        ))
    };

    const sendRequest = async () => {
        const res = await axios.post("http://localhost:5000/api/login",
            {
                username: inputs.username,
                password: inputs.password,
            }
        ).catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(inputs);
        sendRequest().then(() => history("/user"));
    };
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection={"column"} marginLeft="auto" marginRight="auto" width={500} justifyContent="center" alignItems="center">

                        <Typography margin="normal" variant="h3">Login</Typography>

                        <TextField name="username" onChange={handleChange} value={inputs.username} type="text" label="username" fullWidth margin="normal" required />
                        <TextField name="password" onChange={handleChange} type="password" label="password" fullWidth value={inputs.password} margin="normal" required />

                        <Button margin="normal" fullWidth variant="contained" type="submit">Login</Button>

                    </Box>
                </form>
            </div>
        )
    }
export default Login;