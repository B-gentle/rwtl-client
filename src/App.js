import { ConfigProvider } from "antd";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Contents from "./components/layouts/Contents";
import ProtectedPage from "./components/ProtectedPage";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import AddAdmin from "./pages/adminPages/AddAdmin";
import CreditWallet from "./pages/adminPages/CreditWallet";
import AdminLogin from "./pages/adminPages/AdminLogin";
import CompleteRegistration from "./pages/adminPages/CompleteRegistration";
import ProtectAdmin from "./pages/adminPages/ProtectAdmin";
import ForgotPassword from "./pages/authPages/ForgotPassword";
import Login from "./pages/authPages/Login";
import Register from "./pages/authPages/Register";
import ResetPassword from "./pages/authPages/ResetPassword";
import About from "./pages/landingPage/about/About";
import Home from "./pages/landingPage/Home";
import ViewUsers from "./pages/adminPages/viewUsers/ViewUsers";
import ViewTransaction from "./pages/adminPages/ViewTransaction";

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
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="about" element={<About />} />
          <Route path="super" element={<AdminLogin />} />
          <Route path="admin">
            <Route index element={<ProtectAdmin><AdminDashboard /></ProtectAdmin>} />
            <Route path='addadmin' element={<ProtectAdmin><AddAdmin /></ProtectAdmin>} />
            <Route path='approvepayment' element={<ProtectAdmin><CompleteRegistration /></ProtectAdmin>} />
            <Route path='creditwallet' element={<ProtectAdmin><CreditWallet /></ProtectAdmin>} />
            <Route path='viewuser' element={<ProtectAdmin><ViewUsers /></ProtectAdmin>} />
            <Route path='viewtransactions' element={<ProtectAdmin><ViewTransaction /></ProtectAdmin>} />
          </Route>
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
