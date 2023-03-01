import React, {useState} from "react";
import { TextField, Box, Button, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "kiit@123",
        level: 2,
        department: ""
    });

    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    };

    const sendRequest = async () => {
        const res = await axios.post("http://localhost:5000/api/signup",
            {
                username: inputs.username,
                email: inputs.email,
                password: inputs.password,
                level: inputs.level,
                department: inputs.department
            }
        ).catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(inputs);
        sendRequest().then(() => history("/login"));
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection={"column"} marginLeft="auto" marginRight="auto" width={500} justifyContent="center" alignItems="center">

                    <Typography margin="normal" variant="h3">SignUp</Typography>

                    <TextField name="username" onChange={handleChange} value={inputs.username} type="text" label="username" fullWidth margin="normal" required/>
                    <TextField name="email" onChange={handleChange} value={inputs.email} type="email" label="email" fullWidth margin="normal" required/>
                    <TextField name="password" onChange={handleChange} type="password" label="password" fullWidth value={inputs.password} margin="normal" required />
                    
                    <FormControl margin="normal" fullWidth required>
                        <InputLabel id="demo-simple-select-label">Level</InputLabel>
                        <Select
                            name="level"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={inputs.level}
                            label="Employee"
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>Super Admin</MenuItem>
                            <MenuItem value={1}>HOD/Admin</MenuItem>
                            <MenuItem value={2}>Employee</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl margin="normal" fullWidth required>
                        <InputLabel id="demo-simple-select-label">Department</InputLabel>
                        <Select
                            name="department"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={inputs.department}
                            label="Department"
                            onChange={handleChange}
                        >
                            <MenuItem value={3463}>Administration</MenuItem>
                            <MenuItem value={2356}>CSE</MenuItem>
                            <MenuItem value={4677}>Electronics</MenuItem>
                        </Select>
                    </FormControl>


                    <Button margin="normal" fullWidth variant="contained" type="submit">Signup</Button>

                </Box>
            </form>
        </div>
    )
}

export default Signup;