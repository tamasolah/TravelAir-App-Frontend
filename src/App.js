import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Header from './components/Header';
import OffersList from './components/OffersList';
import Login from './pages/Login';
import Home from './pages/Home';
import OfferDetails from './pages/OfferDetails';
import MyBookings from './pages/MyBookings';
import DespreNoi from './pages/DespreNoi';
import Contact from './pages/Contact'; 
import { ThemeProvider } from "./context/ThemeContext";
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
          {isAuthenticated && <Header />}
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/acasa" /> : <Login />}
            />
            <Route
              path="/acasa"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/oferte"
              element={
                <PrivateRoute>
                  <OffersList />
                </PrivateRoute>
              }
            />
            <Route
              path="/oferta/:id"
              element={
                <PrivateRoute>
                  <OfferDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/rezervarile-mele"
              element={
                <PrivateRoute>
                  <MyBookings />
                </PrivateRoute>
              }
            />

            <Route
               path="/despre-noi"
               element={
                 <PrivateRoute>
                   <DespreNoi />
                 </PrivateRoute>
              }
            />

            <Route
              path="/contact"
              element={
                <PrivateRoute>
                  <Contact />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
