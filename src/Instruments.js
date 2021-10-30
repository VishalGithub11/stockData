import React, { useEffect, useState } from "react";
import Papa from "papaparse";
const Instruments = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const url = ` https://prototype.sbulltech.com/api/v2/instruments`;

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

  return <div>Instrument</div>;
};

export default Instruments;
