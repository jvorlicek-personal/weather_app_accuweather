import React, { useEffect, useState } from "react";
import accuWeather from "../api/accuWeather";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import GetWeather from "./GetWeather";

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
  button: {
    margin: theme.spacing(1),
  },
}));

const LocationSelect = ({setHomeCity}) => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [location, setlocation] = useState("");
  
  const classes = useStyles();

  useEffect(() => {
    const search = async () => {
      const { data } = await accuWeather.get(
        "/locations/v1/cities/autocomplete",
        {
          params: {
            q: term,
            language: "en-gb",
            apikey: "jK6AanN43KfPWiwt2mT9U5J27lI9Vh4i",
          },
        }
      );

      setResults(data);
      console.log(data);
    };

    search();
  }, [term]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={0}>
            <Autocomplete
              id="combo-box-demo"
              options={results ? results : []}
              getOptionLabel={results ? (option) => option.LocalizedName : null}
              style={{ width: 300 }}
              onChange={(event, newValue) => {
                setTerm(newValue !== null ? newValue.LocalizedName : "")
                setlocation(newValue !== null ? newValue : "")
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText="Please select city from autocomleted list"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  label="Enter City"
                  variant="outlined"
                />
              )}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} elevation={0}>
            <Button
            disabled = { location ? false : true }
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={(e) => setShow(true)}
            >
              Show me weather
            </Button>
            <Button
            disabled = { location ? false : true }
              variant="contained"
              color="primary"
              onClick={(e) => setHomeCity(location)}
            >
              Add as home city
            </Button> 
          </Paper>
        </Grid>
        {show ? (
          <Grid item xs={12}>
            <Paper className={classes.paper} elevation={0}>
              <GetWeather location={location} />
            </Paper>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

export default LocationSelect;
