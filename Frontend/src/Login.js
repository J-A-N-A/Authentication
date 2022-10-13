import {Container,Button,TextField,Grid,Typography,FormControl,FormLabel,FormControlLabel,CircularProgress} from '@material-ui/core'
import axios from 'axios';
import {Link} from 'react-router-dom'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
function Login(){
    const navigate = useNavigate();
    const [message,setMessage] = useState("");
    const [messagestatus,setMessageStatus] = useState(false);
    const [spinner,setSpinner] = useState(false);
    const dispatch = useDispatch();
    const data = useSelector(state => state);
    console.log(data);
   

    const handleSubmit = (e) => {
        e.preventDefault();
        const lowerCaseEmail = e.target.email.value.toLowerCase();
        const user = {
            email:lowerCaseEmail,
            password:e.target.password.value
        }
        setSpinner(true);
        axios.post('http://localhost:5000/login',user)
        .then(res => {
            setMessage(res.data.message);
            setMessageStatus(true);
            setSpinner(false);
            navigate('/dash');
            dispatch({type:'SET_DATA',payload:res.data.user});

        }

        )
        .catch(err => {
            setMessage(err.response.data.message);
            setMessageStatus(true);
            setSpinner(false);
        }
        )
    }    
    return(spinner ? <CircularProgress/> : (
        <Container maxWidth="xs" style={{marginTop:100,border:'1px solid grey' , padding:40}}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                        Login
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                    <TextField label="Email" variant="outlined" fullWidth margin="normal" required name="email" type="email"/>
                    <TextField label="Password" variant="outlined" fullWidth margin="normal" required name="password" type="password"/>
                    {
                        messagestatus ? <Typography variant="body2" align="center"  margin="auto" gutterBottom>
                        {message}
                    </Typography> : null

                    }
                    <Button variant="contained" color="primary" fullWidth type="submit" style={{marginTop:20}}>
                        Login
                    </Button>
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" align="center" color="textSecondary" gutterBottom style={{marginTop:20}}>
                        Don't have an account?
                    </Typography>
                </Grid>
                <Grid item xs={12}>

                        <Link to='/signup'><Button variant="contained" color="secondary" fullWidth>
                        Signup
                    </Button> </Link>
                </Grid>
            </Grid>
        </Container>
       
    ))
}
export default Login;


