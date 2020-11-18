import { createContext } from 'react';
import useMapState from '../hooks/useMapState';

export const MapContext = createContext();

export function MapContextProvider({ children }) {
  const { 
    cells, 
    sideLength,
    impassables,
    startingLoc,
    endingLoc,
    currentLoc, 
    error,
    goHome,
    restart,
    reset,
    setSideLength,
    setStartingLoc,
    setEndingLoc,
    setImpassable, 
  } = useMapState({ sideLength: 5 });

  return (
    <MapContext.Provider 
      value={{ 
        cells, 
        sideLength,
        impassables,
        startingLoc,
        endingLoc,
        currentLoc, 
        error,
        goHome,
        restart,
        reset,
        setSideLength,
        setStartingLoc,
        setEndingLoc,
        setImpassable, 
      }}
    >
      {children}
    </MapContext.Provider>
  );
}