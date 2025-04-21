import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import ProcessorList from "./pages/ProcessorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/AuthContext";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes - Only logged-in users can access */}
          <Route
            path="/home"
            element={

                <Layout>
                  <Home />
                </Layout>
              
            }
          />
          <Route
            path="/processors"
            element={
            
                <Layout>
                  <ProcessorList />
                </Layout>
             
            }
          />
          <Route
            path="/cart"
            element={
            
                <Layout>
                  <CartPage />
                </Layout>
            
            }
          />
          <Route
            path="/order"
            element={

                <Layout>
                  <OrderPage />
                </Layout>

            }
          />
          <Route
            path="/orders"
            element={
          
                <Layout>
                  <OrdersPage />
                </Layout>
              
            }
          />

          {/* Catch-All 404 Page */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
