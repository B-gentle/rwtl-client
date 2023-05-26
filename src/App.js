import { ConfigProvider } from "antd";
import { useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import EmptyAndSearch from "./components/EmptyAndSearch";
import Contents from "./components/layouts/Contents";
import ProtectedPage from "./components/ProtectedPage";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import Login from "./pages/authPages/Login";
import Register from "./pages/authPages/Register";
import ResetPassword from "./pages/authPages/ResetPassword";
function App() {

  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#DDB05B',
          }
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="/*" element={
          <ProtectedPage>
             <Contents />
        </ProtectedPage>
          }>
          </Route>
        </Routes>
      </ConfigProvider>
    </div>
  );
}

export default App;
