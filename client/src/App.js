import "./App.css";
import {Map, NavigationControl} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from 'axios';

function App() {

  
  return (
    <div className="App">
      <Map
      container={'map'}
      projection= {'globe'}
        initialViewState={{}}
        mapboxAccessToken={process.env.REACT_APP_TOKEN}
        style={{width:"100vw",height:"100vh"}}
        mapStyle="mapbox://styles/eldadbrhano/clbkq3wgl004l14pf1vyos26y"
      >
        <NavigationControl/>



      </Map>
    </div>
  );
}

export default App;
