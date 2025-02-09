// MainPage.tsx 
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import logo from "../assets/images/logo.png"
import AuthService from "../utils/authService"; // Import AuthService to check token

function MainPage () {
  //toggle between registration and login form in same modal
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  const navigate = useNavigate() as (path:string) => void;  //to navigate to the dashboard upon login

  useEffect(() => {
    // If the user is already logged in, redirect to the dashboard
    if (AuthService.loggedIn()) {
      navigate("/dash");
    }
  }, [navigate]);

  const handleLoginSuccess = () => {
    // After a successful login, navigate to the dashboard
    navigate("/dash");
  };
  
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
  };

  return (
    <>
     <main className="main-container d-flex">
      <div className='left-side p-5'>
         <img src= { logo }  alt="logo" className="logo" />
      </div>
      <div className="right-side p-5">
        <div className="login-container">
        <h2>{isLoginMode ? "Welcome Back!" : "Create an Account"}</h2>
            <LoginModal isLoginMode={isLoginMode} onLoginSuccess={handleLoginSuccess}/>
            <p onClick={toggleMode} style={{ cursor: "pointer" }}>
              {isLoginMode ? "Don't have an account? Register here" : "Already have an account? Login here"}
            </p>
        </div>
          
      </div>
     </main>
    </>
  )
}

export default MainPage;