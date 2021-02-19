
import { Button, makeStyles } from '@material-ui/core';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import clsx from "clsx";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BlockUser, getAllCompany, getAllJobs, getAllStudent, verifiedUser } from '../redux/actions';
import Loader from './loader';
// import React, { useEffect, useState } from "react";
// import Link from "@material-ui/core/Link";
// import { makeStyles } from "@material-ui/core/styles";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import PropTypes from "prop-types";
// import { useTheme } from "@material-ui/core/styles";
// import TableFooter from "@material-ui/core/TableFooter";
// import TablePagination from "@material-ui/core/TablePagination";
// import IconButton from "@material-ui/core/IconButton";
// import FirstPageIcon from "@material-ui/icons/FirstPage";
// import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
// import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
// import LastPageIcon from "@material-ui/icons/LastPage";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   BlockUser,
//   getAllJobs,
//   getAllUsers,
//   verifiedUser,
// } from "../../redux/actions";
// import Loader from "../loader";
// import {
//   Button,
//   Card,
//   CardContent,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   TableContainer,
//   Typography,
// } from "@material-ui/core";
// import Backdrop from "@material-ui/core/Backdrop";
// import { Modal } from "@material-ui/core";
// import Fade from "@material-ui/core/Fade";
// import JobCard from "../ShowJobs/JobCard";


const FilterModel = {
  items: [{ columnField: 'role', operatorValue: 'equals', value: '' }],
};
const useStyles = makeStyles({
  root: {
    '& .super-app-theme--cell': {
      backgroundColor: 'rgba(224, 183, 60, 0.55)',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .super-app.negative': {
      backgroundColor: 'rgba(157, 255, 118, 0.49)',
      color: '#1a3e72',
      fontWeight: '600',
    },
    '& .super-app.positive': {
      backgroundColor: '#d47483',
      color: '#1a3e72',
      fontWeight: '600',
    },
  },
});
export default function BasicToolbarFilteringGrid() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector(state => state.auth);
  const rows =[];
  const {AllUsers,GetAllUsers} = state;
  const handleBlock = (uid, blocked) => {
    dispatch(BlockUser(uid, blocked));
  };
  const handleVerified = (uid, verified) => {
    dispatch(verifiedUser(uid, verified));
  };

  // useEffect(() => {
  //   dispatch(getAllUsers());
  //   dispatch(getAllJobs());
  // }, []);
 
  // let [AllUser] = AllUsers.length ? AllUsers : [];
  let [loader,setLoader] = useState(true);

  // console.log("rows",rows);
  let columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "uid",
      headerName: "UID",
      width: 200,
    },{
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "userName",
    headerName: "User Name",
    width: 150,
  },
  {
    field: "password",
    headerName: "Password",
    width: 200,
  },
  {
    field: "role",
    headerName: "Role",
    width: 100,
  },
  {
    field: "blocked",
    headerName: "Status",
    width: 100,
    cellClassName: (params) =>{
      return clsx('super-app', {
        negative: params.value,
        positive: !params.value,
      })},
  },
  {
    field: "verified",
    headerName: "Verification",
    width: 100,
  },
  {
    field: "Action",
    headerName: "Action",
    width: 200,
    renderCell: ({row})=>(
     <> <Button
     variant="contained"
     color="primary"
     size="small"
     onClick={()=> handleBlock(row.uid,row.blocked)}
     // style={{ marginLeft: 16 }}
   >
     block
   </Button>
   <Button
     variant="contained"
     color="primary"
     size="small"
     onClick={()=> handleVerified(row.uid,row.verified)}
     style={{ marginLeft: 16 }}
   >
     verify
   </Button>
   </>
    )
  }
  ]
  
  console.log("column",columns.length);
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });
  
  
console.log("data",data);

 if(GetAllUsers.loading || !AllUsers?.length){
  return <Loader />;
 }
 else{
  return (
    <div style={{ height: 400, width: '100%' }}>
      {!!AllUsers?.length && <DataGrid
        rows={AllUsers}
        columns={columns}
        filterModel={FilterModel}
        components={{
          Toolbar: GridToolbar,
        }}
        pageSize={5} rowsPerPageOptions={[5, 10, 20]}
        sortModel={[{
          field:'id',
          sort: 'asc',
        }]}
      />}
    </div>
  );
}

}