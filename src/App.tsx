import Wrapper from "./Pages/Wrapper";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import { ConfigProvider, theme } from "antd";
// import useAuth from "./Utils/useAuth";

function App() {
  // const { isLoggedIn } = useAuth();

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Routes>
          <Route path="/" element={<Wrapper />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;
