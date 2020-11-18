import { useState, useMemo } from 'react';
import axios from 'axios';
import { CELL_ROLES, POKEMON_API } from '../constants';
import { matchLoc, timeout } from '../helpers';

export default (defaults={}) => {
  const [ sideLength, setSideLength ] = useState(defaults.sideLength);
  const [ impassables, setImpassables ] = useState(defaults.impassables || []);
  const [ startingLoc, setStartingLoc ] = useState(defaults.startingLoc);
  const [ endingLoc, setEndingLoc ] = useState(defaults.endingLoc);
  const [ currentLoc, setCurrentLoc ] = useState(startingLoc);
  const [ error, setError ] = useState(false);
  
  const cellRole = (cellLoc) => {
    if(matchLoc(startingLoc, cellLoc)) {
      return CELL_ROLES.startingLoc;
    }
    if(matchLoc(endingLoc, cellLoc)) {
      return CELL_ROLES.endingLoc;
    }
    if(impassables.some(cell => matchLoc(cell, cellLoc))) {
      return CELL_ROLES.impassable;
    }
    return CELL_ROLES.default;
  }

  const cells = useMemo(() => {
    const grid = [];
    for(let y = 0; y < sideLength; y++ ) { // column
      for( let x = 0; x < sideLength; x++) { // row
        grid.push({
          x,
          y,
          role: cellRole({x, y}),
        })
      }
    }
    return grid;

  }, [sideLength, startingLoc, endingLoc, impassables]);
  
  const nextMove = (moveKey, loc) => {
    const nextLoc = { ...loc };
    switch (moveKey) {
      case 'R':
        nextLoc.x += 1;
        break;
      case 'L':
        nextLoc.x -= 1;
        break;
      case 'U':
        nextLoc.y -= 1;
        break;
      case 'D':
        nextLoc.y += 1;
        break;
      default:
        break;
    }
    return nextLoc;
  }

  const goHome = () => {
    if(!sideLength || !startingLoc || !endingLoc) {
      setError('There are missing roles')
      return;
    }  

    axios.post(`${POKEMON_API}/find-path`, {
      sideLength,
      impassables,
      startingLoc,
      endingLoc,
    })
    .then(async ({data}) => {
      if (error) setError(false);
      const { moves } = data;
      
      let nextLoc = { ...currentLoc };
      for(let i = 0; i < moves.length; i++) {
        await timeout(i === 0 ? 0:200); // delay after first move
        nextLoc = nextMove(moves[i], nextLoc);
        setCurrentLoc(nextLoc);    
      }
    })
    .catch(error => {
      setError("blocked");
    });
  }

  const reset = () => {
    setStartingLoc(null)
    setImpassables([]);
    setEndingLoc(null);
    setCurrentLoc(null);
    setError(null);
  }

  const restart = () => {
    setCurrentLoc(startingLoc);
    setError(null);
  };

  const updateSideLength = (length, range) => {
    const intLength = parseInt(length);
    if (intLength >= range[0] && intLength <= range[1]) {
      setSideLength(intLength);
      reset();
    }
  }

  const updateStartingLoc = (loc) => {
    setStartingLoc(loc);
    setCurrentLoc(loc)
  }

  const setImpassable = (loc) => {
    setImpassables([...impassables, loc])
  }

  return { 
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
    setSideLength: updateSideLength,
    setStartingLoc: updateStartingLoc,
    setEndingLoc,
    setImpassable, 
  }
}