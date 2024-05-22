import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import PhoneSignUp from "./components/PhoneSignUp";
import ProfileForm from './components/ProfileForm';
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Container >
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    < Dashboard/>
                  </ProtectedRoute>
                }
              />
               <Route
                path="/profile-form"
                element={
                  <ProtectedRoute>
                    < ProfileForm/>
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/phonesignup" element={<PhoneSignUp />} />
              
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;