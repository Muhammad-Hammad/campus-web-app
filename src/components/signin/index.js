import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, Link } from "react-router-dom";
import { loginUser } from "../../redux/actions";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loader from "../loader";
import { Form, Formik } from "formik";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { SigninSchema } from "../../lib";
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
  errorText: {
    color: "red",
  },
}));

function Signin() {
  // let [newEmail, setEmail] = useState("");
  // let [newPassword, setPassword] = useState("");
  let initialValues = {
    email: "",
    password: "",
    role: "Student",
  };
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (values, { resetForm }) => {
    dispatch(loginUser(values.email, values.password, values.role));
    resetForm({
      values: {
        email: "",
        password: "",
        role: values.role,
      },
    });
  };

  const { login, signup, userName, getData } = state;
  const classes = useStyles();
  if (login.success) {
    return <Redirect to={`/dashboard`} />;
  } else {
    // debugger;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={SigninSchema}
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
                  <Grid item xs={12}>
                    <TextField
                      error={
                        Boolean(errors.password) && Boolean(touched.password)
                      }
                      variant="outlined"
                      value={values.password}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      helperText={
                        errors.password && touched.password
                          ? errors.password
                          : null
                      }
                      onFocus={() => {
                        login.error = false;
                        touched.password = "";
                      }}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                {login.error && !values.email && (
                  // <Typography component="p" className={classes.errorText}>
                  //   {login.errorMsg}
                  // </Typography>
                  <Alert severity="error">{login.errorMsg}</Alert>
                )}
                <br />
                <FormControl component="fieldset">
                  <FormLabel component="legend">Role</FormLabel>
                  <RadioGroup
                    aria-label="role"
                    name="role"
                    required
                    value={values.role}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Student"
                      control={<Radio />}
                      label="Student"
                      defaultChecked
                    />
                    <FormControlLabel
                      value="Company"
                      control={<Radio />}
                      label="Company"
                    />
                    <FormControlLabel
                      value="Admin"
                      control={<Radio />}
                      label="Admin"
                    />
                  </RadioGroup>
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!dirty}
                >
                  {!login.loading ? "Sign in" : <Loader size={24} />}
                </Button>
                <Grid container justify="flex-end">
                  <Grid item xs={5}>
                    <Link to="/forgotPassword" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item xs={7}>
                    <Link to="/signup" variant="body2">
                      Don't have an account? Sign Up!
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

export default Signin;
