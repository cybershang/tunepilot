'use client'
// contexts/BackendSettingsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BackendSettings {
  apiURL: string
}

interface BackendSettingsContextType {
  settings: BackendSettings;
  setSettings: (settings: BackendSettings) => void;
}

const defaultState: BackendSettingsContextType = {
  settings: { apiURL:'' },
  setSettings: () => { }
};

const BackendSettingsContext = createContext<BackendSettingsContextType>(defaultState);

export const useBackendSettings = () => useContext(BackendSettingsContext);

interface Props {
  children: ReactNode;
}

export const BackendSettingsProvider = ({ children }: Props) => {
  const [settings, setSettings] = useState<BackendSettings>({ apiURL:'' });

  return (
    <BackendSettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </BackendSettingsContext.Provider>
  );
};
