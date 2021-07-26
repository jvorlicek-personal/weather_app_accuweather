import React, { useEffect, useState } from "react";
import accuWeather from "../api/accuWeather";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const GetWeather = ({ location }) => {
  const [results, setResults] = useState("");
  const classes = useStyles();

  /*this can be refactored to one call together with HomeCityWeather's call*/
//lang detection ?
//detail pointles for test  ?
  useEffect(() => {
    const search = async () => {
      const { data } = await accuWeather.get(
        `/forecasts/v1/daily/1day/${location.Key}`,
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

    search();
  }, [location]);

  /* with only one day forecast its pointless no map over results + reusing code with HomeCityWeather ?
   in the long run it would depend on how will this be expanded on*/
  return (
    <div className={classes.root}>
      <Typography variant="h5" gutterBottom>
        {`Weather in ${location.LocalizedName}`}
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
};

export default GetWeather;
