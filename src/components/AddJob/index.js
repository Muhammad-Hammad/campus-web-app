import { Formik, Form } from "formik";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import WorkIcon from "@material-ui/icons/Work";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { AddJobSchema } from "../../lib";
import { useSelector, useDispatch } from "react-redux";
import { addJob } from "../../redux/actions";
import Loading from "../loader";
import { Redirect, Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function AddJob() {
  const classes = useStyles();
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  let initialValues = {
    title: "",
    experience: "",
    description: "",
  };
  const { login, signup, userName, user,role } = state;
  const handleSubmit = (e, { resetForm }) => {
    dispatch(addJob(e.title, e.experience, e.description, user.uid, userName));
    resetForm({
      values: {
        title: "",
        experience: "",
        description: "",
      },
    });
    history.push("/dashboard");
  };
  if (role === "Admin" || role === "Student"){
   return <Redirect to="/dashboard" />
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <WorkIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Job
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={AddJobSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, handleChange, touched, isValid, dirty }) => (
            <Form className={classes.form}>
              <TextField
                error={Boolean(errors.title) && Boolean(touched.title)}
                variant="outlined"
                value={values.title}
                margin="normal"
                required
                fullWidth
                name="title"
                label="Title"
                id="title"
                autoComplete="title"
                helperText={errors.title && touched.title ? errors.title : null}
                onFocus={() => {
                  // signup.errorMsg = "";
                  touched.title = "";
                }}
                onChange={handleChange}
              />
              <TextField
                error={
                  Boolean(errors.experience) && Boolean(touched.experience)
                }
                value={values.experience}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="experience"
                label="Experience"
                id="experience"
                autoComplete="experience"
                helperText={
                  errors.experience && touched.experience
                    ? errors.experience
                    : null
                }
                onFocus={() => {
                  // signup.errorMsg = "";
                  touched.experience = "";
                }}
                onChange={handleChange}
              />
              <TextField
                error={
                  Boolean(errors.description) && Boolean(touched.description)
                }
                variant="outlined"
                margin="normal"
                value={values.description}
                required
                fullWidth
                name="description"
                label="Description"
                multiline
                row={4}
                id="description"
                autoComplete="description"
                helperText={
                  errors.description && touched.description
                    ? errors.description
                    : null
                }
                onFocus={() => {
                  // signup.errorMsg = "";
                  touched.description = "";
                }}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/dashboard">Back</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}

export default AddJob;
