import React , {useEffect, useState} from 'react'
import JsonData from './data.json'
import axios from 'axios';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  


const JsonDataDisplay = () => {
           
        const [data, setData] = useState([]);
        useEffect(()=> {
            axios.get("http://13.41.207.62:3002/api/stats/v5?key=d16b94a6-ed52-48db-9655-19136c9b45cf&organization_id=35686945&days=10&linkedin_token=AQUeZHJOAfwzpduia-0Esf4WVAjw-FffV1OeU9rgvaZKYjbMjrYoHdz1_EXFoKT7GMWNrbPpUdGW8XhImGhqP90v41nrQdamB1i7yPidD6hzps8zEYAtJaVvIdnwikrZhqKNblMUl2QeL46-qhUF40a1gs2e4y9BS1NtF9KOoseWkNh-sNRD4IZ6VK_l618-BcqumpbL4Wr7r87-oRa5p4BX-i0wOYO89GpSJYABxAEkNohS9KhukpvHo0ys9wmx3qZM9TXWjd477Sn_OV4r2yIDeh0dLO5_uDtPWO0Dpbt-Ti0NAcEon2s3tj2vDylUdVxVUX7aefTegdqFz1tKuphiiLNaQw&interval=hour&type=detailed,comments,sentiments").then(
              responce => {console.log(responce.data.stats.linkedin.timelineStats.timeline.filter(item => item.meanSentiment !== null));
              setData(responce.data.stats.linkedin.timelineStats.timeline.filter(item => item.meanSentiment !== null))
                    
        }
            )
    },[])
    

   return(
	<div className="App">
      <table  id="dateSen" class="table">
        <tr>
          <th>Date</th>
          <th>MeanSentiment</th>
        </tr>
        {
          
        data.map((val, key) => {
          return (
            
            <tr key={key}>
              <td>{val.date}</td>
              <td>{val.meanSentiment}</td>
            </tr>
            
          )
        })}
      </table>
        <div>  
          <ReactHTMLTableToExcel  
                                  table="dateSen"  
                                                filename="ReportExcel"  
                                                sheet="Sheet"  
                                                buttonText="Export excel" />  
        </div>
    </div>
  );

	
}

export default JsonDataDisplay;
