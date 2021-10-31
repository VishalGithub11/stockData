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
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const classes = useStyles();
  const history = useHistory();

  const fetchData = async () => {
    setLoading(true);
    const url = `https://prototype.sbulltech.com/api/v2/instruments`;
    const response = await fetch(url);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder("utf-8");
    const csv = decoder.decode(result.value);
    const results = Papa.parse(csv, { header: true });
    setData(results.data.filter((item) => item.Symbol !== ""));
    setLoading(false);
  };

  useEffect(() => {
    return fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <h2> Loading.... </h2>
      </div>
    );
  }

  return (
    <div>
      <h2> Instruments </h2>

      <TextField
        label="search name, symbol...."
        color="success"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        size="small"
      />

      <TableContainer component={Paper}>
        <Table sx={{ min: 700 }} aria-label="customized table">
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
            {data
              ?.filter((val) => {
                if (search == "") {
                  return val;
                } else if (
                  val.Name.toLowerCase().includes(search.toLowerCase()) ||
                  val.Symbol.toLowerCase().includes(search.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((data, i) => (
                <TableRow
                  key={i}
                  onClick={() => {
                    history.push({
                      pathname: "/quotes",
                      state: { symbol: data.Symbol },
                    });
                  }}
                >
                  <TableCell component="th" scope="row">
                    {data.Symbol}
                  </TableCell>
                  <TableCell align="center">{data.Name}</TableCell>
                  <TableCell align="center">{data.Sector}</TableCell>
                  <TableCell align="center">
                    {moment(data.Validtill).format("MMMM Do YYYY, h:mm:ss a")}
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
