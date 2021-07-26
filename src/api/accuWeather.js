import axios from "axios";
//moving apikey here ?

export default axios.create({
 baseURL: "https://dataservice.accuweather.com",
  headers: {
    'Content-Type': "application/json",
  }
});