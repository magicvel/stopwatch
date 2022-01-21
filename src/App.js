import React, {useState} from 'react';
import Display from './components/Display';
import Btn from './components/btn';
import './App.css';


function App() {
  const [time, setTime] = useState({ms:0, s:55, m:59, h:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  // Not started = 0
  // started = 1
  // stopped = 2

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  let updatedMs = time.ms,
      updatedS = time.s, 
      updatedM = time.m, 
      updatedH = time.h;

  const run = () => {
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updatedMs === 100){
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  };

  const wait = () => {
    clearInterval(interv);
    setStatus(2);
  };
  

  const stop = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ms:0, s:0, m:0, h:0})
  };

  const resume = () => start();
  const reset = () => {
    clearInterval(interv);
    setStatus(1);
    setTime({ms:0, s:0, m:0, h:0});
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
