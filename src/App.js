import "./App.css";
import LocationSelect from "./components/LocationSelect";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import HomeCityWeather from "./components/HomeCityWeather";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "auto",
  },
  button: {
    margin: theme.spacing(2),
  },
}));

function App() {
  const [homeCity, setHomeCity] = useState();
  const [showLocationSelect, setShowLocationSelect] = useState(true);
  const [showHomeCity, setShowHomeCity] = useState(false);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Weather test app
      </Typography>

      <Grid container>
        <Grid item xs={2}>
          <Button
            className={
              classes.button + " " + (showLocationSelect ? "active" : null)
            }
            variant="contained"
            color="primary"
            onClick={(e) => {
              setShowLocationSelect(true);
              setShowHomeCity(false);
            }}
          >
            Forecast
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            className={classes.button + " " + (showHomeCity ? "active" : null)}
            variant="contained"
            color="primary"
            onClick={(e) => {
              setShowHomeCity(true);
              setShowLocationSelect(false);
            }}
          >
            Forecast at home
          </Button>
        </Grid>
      </Grid>
      { showLocationSelect ? <Grid container>
        <Grid item xs={12}>
          <Paper>
            <LocationSelect setHomeCity={setHomeCity} />
          </Paper>
        </Grid>
      </Grid> : null}
      { showHomeCity ? <Grid container>
        <Grid item xs={12}>
          <Paper>
            <HomeCityWeather homeCity={homeCity}  />
          </Paper>
        </Grid>
      </Grid> : null}
    </div>
  );
}

export default App;
