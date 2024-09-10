
import { useState } from 'react';
import {Box , Button, styled, TextField, Typography} from '@mui/material';

import { API } from '../../service/api.js';

const Component = styled(Box)`
width : 400px;
margin: auto;
box-shadow : 5px 2px 5px 2px rgb(0 0 0 /0.6);
`;
const Image = styled('img')({
    width: 100 ,
    margin: 'auto',
    display : 'flex',
    padding: '50px 0 0'
})
const Wrapper = styled(Box)`
padding: 25px 35px;
display: flex;
flex : 1;
flex-direction: column;
& > div, &> button , &> p{
maring-top: 20px;
}
`;

const LoginBUtton = styled(Button)`
text-transform: none;
background: #FB641B;
color:#fff;
height: 48px;
border-radius: 2px;
margin-top: 20px;

`;
const SignupButton = styled(Button)`
text-transform: none;
background: #fff;
color:#2874f0;
height: 48px;
border-radius: 2px;
box-shadow : 0 2px 4px 0 rgb (0 0 0/ 20%);

`;

const Error = styled(Typography)`
font-size: 10px;
color: #ff6161;
line-height: 0 ;
margin-top: 10px;
font-weight: 600;
`;
const Text = styled(Typography)`
color : #878787;
font-size: 16px;
`;
const signupInitialValues = {
    name: '',
    username: '', 
    password:''
}
const Login = () => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

 const [account,toggleAccount] = useState('login');
 const [signup,setSignup]   = useState(signupInitialValues);
 const [error, setError] = useState('');

const toggleSingup = () =>{
    if(account ==='signup')
    toggleAccount('login');
else toggleAccount('signup');
}

const onInputChange = (e) => {
    console.log(e.target.value);
    setSignup({...signup , [e.target.name] : e.target.value});
}

const signupUser = async () => {
 let response = await API.userSignup(signup);
 if(response.isSuccess){
    setError('');   
    setSignup(signupInitialValues);
    toggleAccount('login')

 }
 else{
   setError('something went wrong! please try again later');
 }
}
    return (
        <Component>
        <Box>
        <Image src = {imageURL} alt = "login"/>
        { 
       account ==='login' ? 
        <Wrapper>
        <TextField variant="standard" label= "Enter Username" />
        <TextField variant="standard" label = "Enter Password" />

        {error && <Error>{error}</Error>}

        <LoginBUtton variant = "contained">Login</LoginBUtton>
        <Text style = {{textAlign : 'center'} }>OR</Text>
        
        <SignupButton onClick={()=>{
            toggleSingup()
        }}>Create An Account</SignupButton>
        </Wrapper> 
        :
        <Wrapper>
        <TextField variant="standard" onChange={(e) => {onInputChange(e)}} name='name' label= "Enter Name" />
        <TextField variant="standard" onChange={(e) => {onInputChange(e)}} name ='username' label = "Enter Username" />
        <TextField variant="standard" onChange={(e) => {onInputChange(e)}} name ='password' label = "Enter Password" />

        {error && <Error>{error}</Error>}

        <SignupButton onClick={() => {signupUser()}}>SignUp</SignupButton>
        <Text style = {{textAlign : 'center'} }>OR</Text>
        
        <LoginBUtton onClick={()=>{
            toggleSingup()
        }} variant='contained'>Already have an Account</LoginBUtton>
        </Wrapper>
     } 
        </Box>  
        </Component>
    )
}
export default Login;