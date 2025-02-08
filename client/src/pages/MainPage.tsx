// MainPage.tsx 
import { useState } from "react";
import LoginModal from "../components/LoginModal";
import logo from "../assets/images/logo.png"

function MainPage () {
  //toggle between registration and login form in same modal
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  
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
            <LoginModal isLoginMode={isLoginMode} />
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