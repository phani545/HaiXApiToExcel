import React, { useEffect, useState } from "react";
import axios from "axios";
//import writeXlsxFile from "write-excel-file";
//import JsonToExcel from "./index_Json_Excel";
import { JsonToExcel } from "react-json-to-excel";

const JsonDataDisplay = async () => {
  const [data, setData] = useState([]);

  const cleandata = (responce) => {
    const arr = [];
    var senti = {};
    for (let [key, value] in Object.entries(responce)) {
      if (key === "meanSentiment") {
        senti[key] = value;
      } else if (key === "date");
      {
        senti[key] = value;
      }
      console.log(senti);
      arr.push(Object.entries(senti));
      senti = {};
    }

    return arr;
  };

  useEffect(() => {
    axios
      .get(
        "https://alivecore360.com/api/stats/v5?key=d16b94a6-ed52-48db-9655-19136c9b45cf&organization_id=35686945&days=10&linkedin_token=AQUeZHJOAfwzpduia-0Esf4WVAjw-FffV1OeU9rgvaZKYjbMjrYoHdz1_EXFoKT7GMWNrbPpUdGW8XhImGhqP90v41nrQdamB1i7yPidD6hzps8zEYAtJaVvIdnwikrZhqKNblMUl2QeL46-qhUF40a1gs2e4y9BS1NtF9KOoseWkNh-sNRD4IZ6VK_l618-BcqumpbL4Wr7r87-oRa5p4BX-i0wOYO89GpSJYABxAEkNohS9KhukpvHo0ys9wmx3qZM9TXWjd477Sn_OV4r2yIDeh0dLO5_uDtPWO0Dpbt-Ti0NAcEon2s3tj2vDylUdVxVUX7aefTegdqFz1tKuphiiLNaQw&interval=hour&type=detailed,comments,sentiments"
      )
      .then((responce) => {
        console.log(
          responce.data.stats.linkedin.timelineStats.timeline.filter(
            (item) => item.meanSentiment !== null
          )
        );
        setData(
          cleandata(
            responce.data.stats.linkedin.timelineStats.timeline.filter(
              (item) => item.meanSentiment !== null
            )
          )
        );
      });
  }, []);
  return (
    <JsonToExcel
      title="Download as Excel"
      data={data}
      fileName="sample-file"
      btnClassName="custom-class"
    />
    /*
   await writeXlsxFile(data, {
    schema, // (optional) column widths, etc.
    fileName: "file.xlsx",
  
  });
  */
  );
};

export default JsonDataDisplay;
