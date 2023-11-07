import React, { createContext, useContext, ReactNode } from 'react';

interface TeamContextProps {
  teams: any[];
  setTeams: React.Dispatch<React.SetStateAction<any[]>>;
}

const TeamContext = createContext<TeamContextProps | undefined>(undefined);

interface TeamProviderProps {
  children: ReactNode;
  teams: any[];
  setTeams: React.Dispatch<React.SetStateAction<any[]>>;
}

export const TeamProvider: React.FC<TeamProviderProps> = ({ children, teams, setTeams }) => {
  return (
    <TeamContext.Provider value={{ teams, setTeams }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeams = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeams must be used within an TeamProvider');
  }
  return context;
};
