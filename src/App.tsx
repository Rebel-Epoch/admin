import Wrapper from "./Pages/Wrapper";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import "preline/preline";
import { IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

function App() {
  return (
    <>
      <Router>
        <LocationHandler />
        <Routes>
          <Route path="/" element={<Wrapper />} />
        </Routes>
      </Router>
    </>
  );
}

function LocationHandler() {
  const location = useLocation();
  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return null;
}

export default App;
