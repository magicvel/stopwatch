import React, {useState} from 'react';
import Display from './components/Display';
import Btn from './components/btn';
import './App.css';


function App() {
  const [time, setTime] = useState({s: 0, m: 0, h: 0});
  const [stopwatch, setStopwatch] = useState();
  const [resumeClicked, setResumeClicked] = useState(false);
  const [status, setStatus] = useState(0);
  // Statuses: 
  // not started = 0
  // started = 1
  // waite = 2

 

const run = () => {
  setTime(
    (time) => {
      let s = time.s,
        m = time.m,
        h = time.h
      
      s++;
      if(s === 60){
        m++;
        s = 0;
      }
      if(m === 60){
        h++;
        m = 0;
      }
      return {s: s, m: m, h: h}
    }
  )
};

  const start = () => {
    setStatus(1);
    setStopwatch(setInterval(run, 1000));
  };

  const wait = () => {
    if (resumeClicked){
      clearInterval(stopwatch);
      setStatus(2);
    }
    setResumeClicked(true);

    setTimeout(() => {
      setResumeClicked(false);
    }, 300);
  };
  
  const stop = () => {
    clearInterval(stopwatch);
    setStatus(0);
    setTime({s:0, m:0, h:0})
  };

  const resume = () => start();

  const reset = () => {
    clearInterval(stopwatch);
    setTime({s:0, m:0, h:0});
    start();
  };

  


  return (
    <div className="main-section">
     <div className="clock-holder">
          <div className="stopwatch">
               <Display time={time}/>
               <Btn status={status} resume={resume} reset={reset} wait={wait} stop={stop} start={start}/>
          </div>
     </div>
    </div>
  );
}

export default App;