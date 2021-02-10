import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useState } from "react";
import { Modal } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 300,
    minHeight: 150,
    padding: 20,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    padding: 5,
  },
  // pos: {
  //   marginBottom: 12,
  // },
  word: {
    wordBreak: "break-word",
    overflow: "auto",
    maxHeight: 350,
  },
  btn: {
    color: "white",
    backgroundColor: "red",
  },
  btnSuccess: {
    color: "white",
    backgroundColor: "green",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
// const useStyles = makeStyles({

//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   paper: {
//     // backgroundColor: theme.palette.background.paper,
//     border: "2px solid #000",
//     // boxShadow: theme.shadows[5],
//     // padding: theme.spacing(2, 4, 3),
//   },
// });

export default function JobCard({
  title,
  experience,
  description,
  handleApply,
}) {
  const classes = useStyles();
  const state = useSelector((state) => state.auth);
  const { role } = state;
  const T = title.toUpperCase();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // console.log(location);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          {T}
        </Typography>
        <Typography variant="h6" component="h6" className={classes.title}>
          experience : {experience}
        </Typography>
        <CardActions>
          <Button size="small" onClick={handleOpen} color="secondary">
            Show Details
          </Button>
        </CardActions>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  component="h2"
                  className={classes.title}
                >
                  {T}
                </Typography>
                <Typography
                  variant="h6"
                  component="h6"
                  className={classes.title}
                >
                  Experience : {experience}
                </Typography>
                <Typography
                  variant="h6"
                  component="h6"
                  className={classes.title}
                >
                  {" "}
                  Description : {description}{" "}
                </Typography>
                {role === "Student" &&
                location.pathname !== "/dashboard/studentjob" ? (
                  <CardActions>
                    <Button size="small" onClick={handleApply} color="primary">
                      Apply here
                    </Button>
                  </CardActions>
                ) : (
                  <div></div>
                )}
              </CardContent>
            </Card>
          </Fade>
        </Modal>
        {role === "Student" && location.pathname !== "/dashboard/studentjob" ? (
          <CardActions>
            <Button size="small" onClick={handleApply} color="primary">
              Apply here
            </Button>
          </CardActions>
        ) : (
          <div></div>
        )}
      </CardContent>
    </Card>
  );
}
