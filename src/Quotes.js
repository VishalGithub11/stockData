import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import moment from "moment";

const useStyles = makeStyles({
  head: {
    backgroundColor: "green",
  },
});

const Quotes = () => {
  const history = useHistory();
  const classes = useStyles();

  const [symbolName, setSymbolName] = useState("");
  const [values, setValues] = useState(null);

  const symbol = history.location.state.symbol;

  const fetchDetails = async () => {
    const url = `https://prototype.sbulltech.com/api/v2/quotes/${symbol}`;
    const response = await fetch(url).then((res) => res.json());

    setSymbolName(Object.keys(response.payload).join());
    setValues(Object.values(response.payload)[0]);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  console.log("hhhhhhhhh", symbolName, values);
  return (
    <div>
      <h1> Quotes </h1>
      <hr />
      <h2>{symbolName} </h2>

      <Table sx={{ min: 700 }} aria-label="customized table">
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Time</TableCell>
            <TableCell align="center">Valid Till</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values
            ?.sort((a, b) => new Date(a.time) - new Date(b.time)) // sorting on basis of time
            .map((data, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="center">
                  &#8377; {data.price.toFixed(3)}
                </TableCell>
                <TableCell align="center">
                  {moment(data.time).format("MMMM Do YYYY, h:mm:ss a")}
                </TableCell>
                <TableCell align="center">
                  {moment(data.valid_till).format("MMMM Do YYYY, h:mm:ss a")}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Quotes;
