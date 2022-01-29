import React, {useState} from 'react';
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import Display from './components/Display';
import Btn from './components/btn';
import './App.css';

const stopwatchStepMs = 10;
const waitClickedInterval = 300;

const notStartedStatus = 0;
const startedStatus = 1;
const waitingStatus = 2;


function App() {
  const [time, setTime] = useState({ms:0, s: 0, m: 0, h: 0});
  const [ticking, setTicking] = useState();
  const [waitClickedTime, setWaitClickedTime] = useState();
  const [status, setStatus] = useState(notStartedStatus);

  const start = () => {
    setStatus(startedStatus);
    
    const subscription = new Subject();
    setTicking(subscription);

    interval(stopwatchStepMs)
        .pipe(takeUntil(subscription))
        .subscribe(() => {
          setTime(
            (time) => {
              let ms = time.ms,
                s = time.s,
                m = time.m,
                h = time.h
              
              ms += stopwatchStepMs;
              if (ms === 1000){
                s++;
                ms = 0;
              }

              if(s === 60){
                m++;
                s = 0;
              }
              if(m === 60){
                h++;
                m = 0;
              }
              return {ms: ms, s: s, m: m, h: h}
            }
          )
        });
  };

  const stopTicking = () => {
    ticking.next();
    ticking.complete();
  };

  const wait = () => {
    let now = new Date().getTime();
    if (waitClickedTime && now - waitClickedTime < waitClickedInterval){
      stopTicking()
      setStatus(waitingStatus);
    }
    setWaitClickedTime(now);
  };
  
  const stop = () => {
    stopTicking()
    setStatus(notStartedStatus);
    setTime({ms:0, s: 0, m: 0, h: 0})
  };

  const resume = () => start();

  const reset = () => {
    stop();
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