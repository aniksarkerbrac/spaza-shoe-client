import React,{useContext} from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import firebaseConfig from './firebase.config';
import { initializeApp } from 'firebase/app';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const app = initializeApp(firebaseConfig);

const Login = () => {
    const classes = useStyles();

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const provider = new GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                const signedInUser = {
                    name: user.displayName,
                    email: user.email
                }
                setLoggedInUser(signedInUser);
                history.replace(from);
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography style={{ color: 'black' }} component="h1" variant="h5">
                    Sign in
                </Typography>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="success"
                    className={classes.submit}
                    onClick={handleGoogleSignIn}
                >
                    Continue with Google
                </Button>
            </div>
        </Container>
    );
};

export default Login;