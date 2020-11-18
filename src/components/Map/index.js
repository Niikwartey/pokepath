import { useMemo, useContext } from 'react';
import { MapContext } from '../../contexts/mapContext';
import { matchLoc } from '../../helpers';
import Cell from '../Cell';
import './style.css';

function Map() {
  const { 
    cells, 
    sideLength, 
    setSideLength,
    goHome, 
    error,
    restart, 
    reset,
    startingLoc,
    endingLoc,
    currentLoc ,
  } = useContext(MapContext);

  const cellSize = useMemo(() => `${100/sideLength}%`, [sideLength]);
  const allowGo = useMemo(() => {
    return !error && endingLoc && startingLoc && matchLoc(startingLoc, currentLoc)
  }, [endingLoc, startingLoc, currentLoc, error]);

  return (
    <div className="Map">
      <div className="instructions">
        <p>* Assign a role to a cell by selecting
        <span>S</span>- starting location or
        <span>B</span>- blocked location or
        <span>E</span>- ending location in any cell.
        </p>
      </div>
      
      <div className="cells">
        <div className="sideLength">
          <div className="input">
            <span>side length </span>
            <input 
              type="number" 
              value={sideLength} 
              onChange={({target}) => setSideLength(target.value, [2, 8])}
              min={2} max={8}
              autoFocus
            />
          </div>
          <p className="hint">Hint: Integers from 2 to 8.</p>
        </div>

        <div className="grid">
          {cells.map(({x, y, role}, index) => (
            <div key={index} style={{ width: cellSize, height: cellSize }}>
              <Cell x={x} y={y} role={role} />
            </div>
          ))}
        </div>
      </div>

      <div className="actions">
        <div className="buttons">
          <button onClick={restart}>restart</button>
          <button className="go" onClick={goHome} disabled={!allowGo}>go</button>
          <button onClick={reset}>clear</button>
        </div>
      </div>
    </div>
  );
}

export default Map;