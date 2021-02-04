import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const useStyles = makeStyles({
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
});

export default function JobCard({ title, experience, description }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const state = useSelector((state) => state.auth);
  const { role } = state;
  console.log(experience);
  const T = title.toUpperCase();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2" className={classes.title}>
          {T}
        </Typography>
        <Typography variant="h6" component="h6" className={classes.title}>
          experience : {experience}
        </Typography>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {/* {" "} */}
            Job Description
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" component="p" className={classes.word}>
              {description}
            </Typography>
          </AccordionDetails>
        </Accordion>
        {role === "Student" ? (
          <CardActions>
            <Button size="small">Apply here</Button>
          </CardActions>
        ) : (
          <div></div>
        )}
      </CardContent>
    </Card>
  );
}
