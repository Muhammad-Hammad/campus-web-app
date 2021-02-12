import React, { useEffect } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { BlockUser, getAllUsers } from "../../redux/actions";
import Loader from "../loader";
import { Button } from "@material-ui/core";
// import Title from "./Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function AdminTable() {
  const classes = useStyles();
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { AllUsers, user, GetAllUsers } = state;
  useEffect(() => {
    dispatch(getAllUsers());
  }, [user]);
  const [SarayUsers] = AllUsers ? AllUsers : [];
  const handleBlock = (uid, blocked) => {
    dispatch(BlockUser(uid, blocked));
  };

  console.log("AllUsers", SarayUsers);
  if (GetAllUsers?.loading || !AllUsers) {
    console.log("main chal ra hun");
    return <Loader />;
  } else if (!GetAllUsers.loading) {
    return (
      <React.Fragment>
        {/* <Title>Recent Orders</Title> */}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>UserName</TableCell>
              <TableCell>Blocked</TableCell>
              <TableCell style={{ paddingLeft: "25px" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SarayUsers.map((row) => {
              console.log(row);
              let { email, uid, password, userName, role, blocked } = row[1];
              console.log(email, uid, password, blocked);
              return (
                <TableRow key={uid}>
                  <TableCell>{email}</TableCell>
                  <TableCell>{password}</TableCell>
                  <TableCell>{role}</TableCell>
                  <TableCell>{userName}</TableCell>
                  <TableCell>{blocked.toString()}</TableCell>
                  <TableCell>
                    <Button
                      color="secondary"
                      onClick={() => handleBlock(uid, blocked)}
                    >
                      {blocked ? "Unblock" : "Block"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more orders
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
