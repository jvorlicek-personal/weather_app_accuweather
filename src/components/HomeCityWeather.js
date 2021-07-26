import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import accuWeather from "../api/accuWeather";

const useStyles = makeStyles((theme) => ({}));


const HomeCityWeather = ({homeCity}) => {
  const classes = useStyles();
  const [results, setResults] = useState("");

/*this can be refactored to one call together with GetWeather's call*/

useEffect(() => {
    const search = async () => {
      const { data } = await accuWeather.get(
        `/forecasts/v1/daily/1day/${homeCity.Key}`,
        {
          params: {
            language: "en-gb",
            apikey: "jK6AanN43KfPWiwt2mT9U5J27lI9Vh4i",
            details: false,
            metric: true,
          },
        }
      );

      setResults(data.DailyForecasts[0]);
      console.log(data);
    };

    if (homeCity) {search()};
  }, [homeCity]);

 /* with only one day forecast its pointless no map over results + reusing code with GetWeather ?
   in the long run it would depend on how will this be expanded on*/

  if (homeCity) {
    return (
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          {`Home City - ${homeCity.LocalizedName}`}
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={6}>
          Temprature min:
        </Grid>
        <Grid item xs={6}>
          {results
            ? `${results.Temperature.Minimum.Value} °${results.Temperature.Minimum.Unit}`
            : "N/A"}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          Temprature max:
        </Grid>
        <Grid item xs={6}>
          {results
            ? `${results.Temperature.Maximum.Value} °${results.Temperature.Minimum.Unit}`
            : "N/A"}
        </Grid>
      </Grid>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Typography variant="h5" gutterBottom>
          Select a home city to use this tab.
        </Typography>
      </div>
    );
  }
};

export default HomeCityWeather;
