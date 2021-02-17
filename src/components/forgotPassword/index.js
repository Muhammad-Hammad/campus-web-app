import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { sendResetEmail } from "../../redux/actions";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loader from "../loader";
import { Form, Formik } from "formik";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "green",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  successText: {
    color: "white",
    backgroundColor: "green",
    textAlign: "center",
    padding: "5px",
  },
  errorText: {
    color: "white",
    backgroundColor: "red",
    textAlign: "center",
    padding: "5px",
  },
}));

function ForgotPassword() {
  const [show, setShow] = useState(false);
  let initialValues = {
    email: "",
  };
  const state = useSelector((state) => state.auth);
  let { login, signup, forgot } = state;
  const dispatch = useDispatch();
  const handleSubmit = (values, { resetForm }) => {
    dispatch(sendResetEmail(values.email));
    resetForm({
      values: {
        email: "",
      },
    });
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };
  const successMsg = "An Email has been sent to you!";
  const classes = useStyles();
  if (login.success || signup.success) {
    return <Redirect to="/" />;
  } else {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h6">
            Enter Email name of Forgotten Password
          </Typography>
          <Formik
            initialValues={initialValues}
            // validationSchema={SigninSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, handleChange, touched, isValid, dirty }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(errors.email) && Boolean(touched.email)}
                      variant="outlined"
                      required
                      value={values.email}
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      helperText={
                        errors.email && touched.email ? errors.email : null
                      }
                      onFocus={() => {
                        login.error = false;
                        touched.email = "";
                      }}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!dirty}
                >
                  {!forgot.loading ? "Submit" : <Loader size ={24}/>}
                </Button>
                {!forgot.loading && show && (
                  <Alert severity={forgot.error ? "error" : "success"}>
                    {forgot.error ? forgot.errorMsg : successMsg}
                  </Alert>
                )}
                <Grid container justify="flex-end">
                  <Grid item xs>
                    <Link to="/" variant="body2">
                      Sign In here.
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </div>
      </Container>
    );
  }
}

export default ForgotPassword;
