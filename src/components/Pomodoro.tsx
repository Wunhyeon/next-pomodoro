"use client";

import React, { useState } from "react";
import Timer from "./Timer";
import Settings from "./Settings";
import SettingsContext from "./SettingsContext";

const Pomodoro = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(10);

  return (
    <main className="py-12 h-full w-full my-0 mx-auto text-center bg-blue-900 ">
      <SettingsContext.Provider
        value={{
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
          showSettings,
          setShowSettings,
        }}
      >
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  );
};

export default Pomodoro;
