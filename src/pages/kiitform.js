import React, {useState} from 'react';
import { TextField, Box, Button, Typography, Select, FormControl, MenuItem, InputLabel } from "@mui/material";
//import {FormContainer, Heading,FormContent,FormHeader } from './styled.js'
//import { useNavigate } from 'react-router-dom';
//import './App.css';
import axios from 'axios';
 
const Kiitform = () => {
    //const history= useNavigate();
    const [inputs, setInputs] = useState({
      eid: "3478g",
      adm_ref_no: "",
      student_name: "",
      student_addre: {
        road: "",
        city: "",
        state: "",
        pincode: ""
      },
      contact:{
        ph_no: "",
        email: "",
      },
      student_rel: "",
      amount_by_candidate: "",
      proof_docu: "",
      department: ""
  });

  const handleChange = (e) => {
    setInputs(prev => ({
        ...prev,
        [e.target.name]: e.target.value,
        
    }))
    console.log(e.target.value)
};

const sendRequest = async () => {
  const res = await axios.post("http://10.7.209.37:5000/api/kiss/adddata",
      {
          eid: inputs.eid,
          adm_ref_no: inputs.adm_ref_no,
          student_name: inputs.student_name,
          student_addre:{
            road: inputs.road,
            city: inputs.city,
            state: inputs.state,
            pincode: inputs.pincode
            },
          student_rel: inputs.relationship_withcandidate,
          contact:{
            ph_no: inputs.ph_no,
            email: inputs.email,
          },
          amount: inputs.amount,
          docu_img: inputs.docu_img,
          contains_det: inputs.contains_det,
          department: inputs.department
      }
  ).catch((err) => console.log(err));
  const data = await res.data;
  return data;
};

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(inputs);
  sendRequest().then(() => alert(inputs)); //to meghna
};

  return (
    <div className='Forms'>
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection={"column"} color="green" boxShadow={"inherit"} marginLeft="auto" marginRight="auto" width={500} justifyContent="center" alignItems="center" sx={{border: 'solid',
          borderColor: 'white',
          borderWidth: 10,         
          alignSelf: 'center',
          borderStartEndRadius: 10,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderEndLeftRadius: 10,
          borderEndRightRadius: 10,
          p:2,
          bgcolor: 'white',
          maxWidth: '100%',
          textEmphasisColor: 'green',
          
          boxShadow: 'sm',
          borderRadius: 'md',
          }}>

                    <Typography margin="normal" variant="h3">Admission Referrence</Typography>

                    <TextField name="Adm_ref_no" onChange={handleChange} value={inputs.Adm_ref_no} type="text" label="Admission Referrence number" fullWidth margin="normal" required/>
                    <TextField name="name_" onChange={handleChange} value={inputs.name_} type="text" label="Candidate Name" fullWidth margin="normal" required/>
                    <FormControl margin="normal" fullWidth required>
                        <InputLabel id="demo-simple-select-label">Relationship</InputLabel>
                        <Select
                            name="patient_rel"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={inputs.patient_rel}
                            label="Relationship"
                            onChange={handleChange}
                        >
                            <MenuItem value="Family Member">Family Member</MenuItem>
                            <MenuItem value="Friends">Friends</MenuItem>
                            <MenuItem value="Others">Other</MenuItem>
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
                            <MenuItem value="ITI">ITI</MenuItem>
                            <MenuItem value="Engineering">Engineering</MenuItem>
                            <MenuItem value="Polytechnic">Polytechnic</MenuItem>
                        </Select>
                    </FormControl>
                    <Typography margin="normal" variant="h6" sx={{pt:1}}>Address of the Candidate</Typography>
                    <TextField name="road" onChange={handleChange} type="text" label="Road" fullWidth value={inputs.road} margin="normal" required />
                    <TextField name="city" onChange={handleChange} type="text" label="City" fullWidth value={inputs.city} margin="normal" required />
                    <TextField name="state" onChange={handleChange} type="text" label="State" fullWidth value={inputs.state} margin="normal" required />
                    <TextField name="pincode" onChange={handleChange} type="text" label="Pincode" fullWidth value={inputs.pincode} margin="normal" required />
                    
                    <Typography margin="normal" variant="h6" sx={{pt:1}}>Contact Details of the Candidate</Typography>
                    <TextField name="ph_no" onChange={handleChange} type="text" label="Candidate Phone Number" fullWidth value={inputs.ph_no} margin="normal" required />
                    <TextField name="email" onChange={handleChange} type="email" label="Candidate Email" fullWidth value={inputs.email} margin="normal" />
                    
                    <Button margin="normal" fullWidth variant="contained" type="submit">Register Product</Button>

                </Box>
            </form>
        
        </div>
  );
}

 
export default Kiitform;