import {Container,Button,TextField,Grid,Typography,FormControl,FormLabel,FormControlLabel,CircularProgress } from '@material-ui/core'
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useEffect,useState} from 'react';
function Signup(){
       const [spinner , setSpinner] = useState(false);
        const [message,setMessage] = useState("");
        const [messagestatus,setMessageStatus] = useState(false);
    
        const handleSubmit = (e) => {
            const lowerCaseEmail = e.target.email.value.toLowerCase();

            e.preventDefault();
            const user = {
                name:e.target.name.value,
                email:lowerCaseEmail,
                phone:e.target.phone.value,
                password:e.target.password.value,
                confirmpassword:e.target.confirmpassword.value
            }
            setSpinner(true);
            if (user.password === user.confirmpassword){
                axios.post('http://localhost:5000/signup',user)
                .then(res => {
                    setMessage(res.data.message);
                    setMessageStatus(true);
                    setSpinner(false);
                })
                .catch(err => {
                    setMessage(err.response.data.message);
                    setMessageStatus(true);
                    setSpinner(false);
                })
            }
            else{
                setMessage("Passwords do not match");
                setMessageStatus(true);
                setSpinner(false);
            }

        
        }

    return(spinner ? <CircularProgress/>: (
        <Container maxWidth="xs" style={{marginTop:100 , border:'1px solid grey' , padding:40}}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                        Signup
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                    <TextField label="Name" variant="outlined" fullWidth margin="normal" required name="name"/>
                    <TextField label="Email" variant="outlined" fullWidth margin="normal" required name="email" type="email"/>
                    <TextField label="Phone" variant="outlined" fullWidth margin="normal" required name="phone" type="phone"/>
                    <TextField label="Password" variant='outlined'  fullWidth margin="normal" required name="password" type="password" minLength="8"/>
                    <TextField label="ConfirmPassword" variant='outlined'  fullWidth margin="normal" required name="confirmpassword" type="password" minLength="8"/>
                    {
                        messagestatus ? <Typography variant="body2" align="center"  margin="auto" gutterBottom>
                        {message}
                    </Typography> : null

                    }
                    <Button variant="contained" color="primary" fullWidth type="submit" style={{marginTop:20}}>
                        Signup
                    </Button>

                    </form>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" align="center" color="textSecondary" gutterBottom style={{marginTop:20}}>
                        Already have an account?
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                     <Link to='/'><Button variant="contained" color="secondary" fullWidth>
                        Login
                    </Button> </Link>
                </Grid>
            </Grid>
        </Container>
    ))

    
}
export default Signup;