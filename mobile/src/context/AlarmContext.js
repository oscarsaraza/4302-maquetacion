import React, { createContext, useContext, useState } from 'react';
import { alarmsData } from '../data';

const AlarmContext = createContext();

export function AlarmProvider({ children }) {
  const [alarms, setAlarms] = useState(alarmsData);

  const addAlarm = (alarm) => {
    const newAlarm = {
      ...alarm,
      id: String(Date.now()),
      label: 'Nueva',
      dots: 0,
    };
    setAlarms((prev) => [...prev, newAlarm]);
  };

  const updateAlarm = (id, updates) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  const deleteAlarm = (id) => {
    setAlarms((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleAlarm = (id) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  return (
    <AlarmContext.Provider
      value={{ alarms, addAlarm, updateAlarm, deleteAlarm, toggleAlarm }}
    >
      {children}
    </AlarmContext.Provider>
  );
}

export function useAlarms() {
  const context = useContext(AlarmContext);
  if (!context) {
    throw new Error('useAlarms must be used within an AlarmProvider');
  }
  return context;
}
