import { useContext } from 'react';
import { MapContext } from '../../contexts/mapContext';
import './style.css';

function Poke() {
  const { error } = useContext(MapContext);

  return (
    <div className={`Poke ${error === 'blocked' ? 'blocked':''}`}/>
  );
}

export default Poke;