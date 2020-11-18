import { MapContextProvider } from './contexts/mapContext';
import Map from './components/Map';
import './App.css';

function App() {
  return (
    <MapContextProvider>
      <div className="App">
        <div className="container">
          <Map />
        </div>
      </div>
    </MapContextProvider>
  );
}

export default App;
