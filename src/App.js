import React from 'react';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import {
  Chart,
  LineSeries,
//  SplineSeries,
} from '@devexpress/dx-react-chart-material-ui';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: "100px",
  },
}));

const generateData = (start, end, step) => {
  const data = [];
  for (let i = start; i < end; i += step) {
    data.push({ splineValue: Math.sin(i) / i, lineValue: ((i / 15) ** 2.718) - 0.2, argument: i });
  }

  return data;
};

function App() {
  const classes = useStyles();
  const [values, setValue] = React.useState([0,0,0,0,0]);
  const handleChange = (event, newValue, index) => {
    values[index]=newValue;
    setValue(values.map(i=>i));
  };
  function valuetext(value) {
    return `${value}`;
  }
  return (
    <div className="App">
    <div className={classes.root}>
      <Container maxWidth="sm">
        <CssBaseline />
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper >
                <Chart data={generateData(2.5, 12, 0.5)}>
                  <LineSeries
                    valueField="lineValue"
                    argumentField="argument"
                  />
                </Chart>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>

                {values.map((v,i)=>{
                  return <Slider
                      value={v}
                      onChange={(event,newValue)=>handleChange(event,newValue,i)}
                      aria-labelledby="continuous-slider"
                      orientation="vertical"
                      getAriaValueText={valuetext}
                      defaultValue={0}
                      valueLabelDisplay={true}
                      step={20/1000}
                      min={-10}
                      max={10}
                  />
                })}

              </Paper>
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </div>
    </div>
  );
}
export default App;
