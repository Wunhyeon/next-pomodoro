"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import SettingsContext from "./SettingsContext";

const Timer = () => {
  const red = "#f54e4e";
  const green = "#4aec8c";
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work, break, null
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  const initTimer = () => {
    console.log("init mode : ", mode, ",modeRef : ", modeRef.current);

    setSecondsLeft(settingsInfo.workMinutes * 60);
    secondsLeftRef.current = settingsInfo.workMinutes * 60;
  };

  const switchMode = () => {
    const nextMode = modeRef.current === "work" ? "break" : "work";
    const nextSeconds =
      (nextMode === "work"
        ? settingsInfo.workMinutes
        : settingsInfo.breakMinutes) * 60;
    setMode(nextMode);
    alert(`switchMode! - currentMode : ${mode}, nextMode : ${nextMode}`);

    modeRef.current = nextMode;
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
    isPausedRef.current = true;
    setIsPaused(isPausedRef.current);
  };

  const tick = () => {
    // secondsLeftRef.current = secondsLeftRef.current - 1;
    secondsLeftRef.current--;
    // settingsInfo.setWorkMinutes(secondsLeftRef.current * 60);
    // setSecondsLeft(secondsLeftRef.current);
    setSecondsLeft((prev) => prev - 1);
  };

  const someF = () => {
    alert("some Function. request to notion API, Supabase DB");
  };

  useEffect(() => {
    initTimer();
  }, [settingsInfo.workMinutes, settingsInfo.breakMinutes]);

  useEffect(() => {
    // initTimer();
    console.log("useEffect");

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      console.log("aaa : ", secondsLeftRef.current);

      if (secondsLeftRef.current === 0) {
        someF();
        return switchMode();
      }
      tick();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isPausedRef]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = (secondsLeft / totalSeconds) * 100;
  console.log("percentage : ", percentage);

  const minutes = Math.floor(secondsLeft / 60);
  let numberSeconds = Math.floor(secondsLeft % 60);
  let seconds = numberSeconds.toString();
  if (numberSeconds < 10) {
    seconds = "0" + seconds;
  }

  return (
    <div className="w-80  mx-auto px-5 h-3/4">
      <CircularProgressbar
        className="ease-linear"
        value={percentage}
        text={`${minutes}:${seconds}`}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: mode === "work" ? red : green,
          trailColor: "rgba(255,255,255,.2)",
          pathTransition: "none",
        })}
      />
      <div className="mt-5">
        {isPaused ? (
          <PlayButton isPausedRef={isPausedRef} setIsPaused={setIsPaused} />
        ) : (
          <PauseButton isPausedRef={isPausedRef} setIsPaused={setIsPaused} />
        )}
      </div>
      <div className="mt-5">
        <SettingsButton />
      </div>
    </div>
  );
};

export default Timer;
