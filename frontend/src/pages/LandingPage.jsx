import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import heroImage from "../assets/images/hero.jpg"; // Use your own image path

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect if already logged in
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col-reverse md:flex-row items-center overflow- justify-between bg-white px-8 pt-24 md:pt-0 animate-fade-in">
      {/* Left Section */}
      <div className="md:w-1/2 text-center md:text-left md:mt-0 mt-6 md:mb-20 space-y-6">
        <h1 className="font-prata md:text-4xl text-3xl font-extrabold text-gray-800">
          Organize Your Day with{" "}
          <span className="text-orange-500 font-prata">Todo App</span>
        </h1>
        <p className="font-prata text-gray-600 text-lg">
          Keep track of your tasks, stay productive, and simplify your life.
        </p>
        <div className="flex justify-center md:justify-start gap-4">
          <Link
            to="/register"
            className="font-prata bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-white  hover:text-orange-500  border-2 hover:border-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105"
            aria-label="Get Started"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-white text-orange-500 border-2 border-orange-500 px-6 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
            aria-label="Login"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex justify-center items-center">
        <img
          src={heroImage}
          alt="Productivity illustration"
          className="w-full max-w-md mx-auto drop-shadow-lg md:mt-20"
        />
      </div>
    </div>
  );
};

export default LandingPage;
