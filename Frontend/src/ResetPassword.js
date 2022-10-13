import {Container,Button,TextField,Icon,Grid,Typography,IconButton} from '@material-ui/core';
import {Link} from 'react-router-dom';
function ResetPassword(){
    return(
        <Container maxWidth="xs" style={{marginTop:100}}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                        Reset Password
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Email" variant="outlined" fullWidth margin="normal" required/>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth>
                        Reset Password
                    </Button>
                </Grid>
        </Grid>
        </Container>
        
    );

}
export default ResetPassword;