import { useState, useContext } from 'react';
import { MapContext } from '../../contexts/mapContext';
import Poke from '../Poke';
import { CELL_ROLES } from '../../constants';
import { matchLoc } from '../../helpers';
import './style.css';

function Cell({x, y, role}) {
  const { 
    currentLoc, 
    setStartingLoc, 
    setEndingLoc, 
    setImpassable, 
  } = useContext(MapContext);
  const [ showRolePicker, setShowRolePicker ] = useState(false);

  const isDefault = role === CELL_ROLES.default;

  return (
    <div 
      className={`Cell ${role}`}
      onMouseEnter={() => isDefault && setShowRolePicker(true)}
      onMouseLeave={() => showRolePicker && setShowRolePicker(false)}
    >
      <div className="roles">
        {
          (showRolePicker && isDefault) &&
          <>
            <button 
              className="startingLoc"
              onClick={() => setStartingLoc({x, y})}
            >S</button>
            <button 
              className="impassable"
              onClick={() => setImpassable({x, y})}
            >B</button>
            <button 
              className="endingLoc"
              onClick={() => setEndingLoc({x, y})}
            >E</button>
          </>
        }
      </div>
       
      <div className="poke">
        { matchLoc(currentLoc, {x, y})&& <Poke /> }
      </div>

      <div className="label">
        {
          role === CELL_ROLES.startingLoc && 
          <span>start</span>
        }
        {
          role === CELL_ROLES.endingLoc &&
          <span>end</span>
        }
      </div>
    </div>
  );
}

export default Cell;