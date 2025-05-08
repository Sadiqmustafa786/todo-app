import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for token and user in local storage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    // If token and user exist, set them
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    setLoading(false);
  }, []);

  // Login function to authenticate user and get token
  const login = async (credentials) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        credentials
      );
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  // Register function to register a new user
  const register = async (userData) => {
    try {
      await axios.post("http://localhost:8080/api/v1/user/register", userData);
    } catch (err) {
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  };

  // Logout function to remove the user and token from storage
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  // Function to check if the user is authenticated by verifying the token
  const isAuthenticated = () => {
    if (!token) return false;
    try {
      // Decode the JWT token (for validation)
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();
      if (isTokenExpired) {
        logout();
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      logout();
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated, // Export the isAuthenticated method
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
