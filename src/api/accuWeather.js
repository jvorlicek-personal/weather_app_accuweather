import axios from "axios";
//moving apikey here ?

export default axios.create({
 baseURL: "http://dataservice.accuweather.com",
  headers: {
    'Content-Type': "application/json",
  }
});