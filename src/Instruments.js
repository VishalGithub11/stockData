import React, { useEffect, useState } from "react";
import Papa from "papaparse";

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
  headCell: {
    fontWeight: 600,
    fontSize: "1.2rem",
  },
});

const Instruments = () => {
  const [data, setData] = useState(null);

  const classes = useStyles();

  const fetchData = async () => {
    const url = `https://prototype.sbulltech.com/api/v2/instruments`;

    const response = await fetch(url);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csv = decoder.decode(result.value);
    const results = Papa.parse(csv, { header: true });
    setData(results.data);
  };

  useEffect(() => {
    return fetchData();
  }, []);

  console.log("data", data);

  return (
    <div>
      <h2> Instruments </h2>
      <TableContainer component={Paper}>
        <Table
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          aria-label="customized table"
        >
          <TableHead className={classes.head}>
            <TableRow>
              <TableCell className={classes.headCell}>Symbol</TableCell>
              <TableCell className={classes.headCell} align="center">
                Name
              </TableCell>
              <TableCell className={classes.headCell} align="center">
                Service
              </TableCell>
              <TableCell className={classes.headCell} align="center">
                Valid Till
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((data, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {data.Symbol}
                </TableCell>
                <TableCell align="center">{data.Name}</TableCell>
                <TableCell align="center">{data.Sector}</TableCell>
                <TableCell align="center">
                  {data.Validtill
                    ? moment(data.Validtill).format("MMMM Do YYYY, h:mm:ss a")
                    : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Instruments;
