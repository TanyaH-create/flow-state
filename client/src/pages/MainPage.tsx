// MainPage.tsx 
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import logo from "../assets/images/Logo.png"
import AuthService from "../utils/authService"; // Import AuthService to check token

function MainPage () {
  //toggle between registration and login form in same modal
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);

  //state for affirmation API
  //const [affirmation, setAffirmation] = useState<string | null>(null);
  const [zenQuote, setZenQuote] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  const [authorImage, setAuthorImage] = useState<string | null>(null);

  const navigate = useNavigate() as (path:string) => void;  //to navigate to the dashboard upon login

  useEffect(() => {
    // If the user is already logged in, redirect to the dashboard
    if (AuthService.loggedIn()) {
      navigate("/dash");
    }
  }, [navigate]);

  //ZEN GARDEN
  // Fetch Zen quote
  useEffect(() => {
    const fetchZenQuote = async () => {
      try {
        //change http://localhost:5000  to render URL
        const response = await fetch("http://localhost:3001/zen-quote"); // Make request to your backend
        const data = await response.json();
        if (data && data[0]) {
          setZenQuote(data[0].q);
          setAuthor(data[0].a);
          setAuthorImage(data[0].i);
        }
      } catch (error) {
        console.error("Error fetching Zen quote:", error);
        setZenQuote("Could not load Zen quote at the moment.");
      }
    };
  
    fetchZenQuote();
  }, []);


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

          {/* Display Zen quote */}
          {zenQuote && (
            <div className="zen-quote-box mt-4">
              <h3>Zen Quote of the Moment</h3>
              <p>"{zenQuote}"</p>
              {author && <p>- {author}</p>}
              {authorImage && <img src={authorImage} alt={author ? author: "Zen author"} className="author-image" />}
            </div>
          )}
    {/* Display affirmation
        
        {affirmation && (
          <div className="affirmation-box mt-4">
            <h3>Today's Affirmation</h3>
            <p>{affirmation}</p>
        </div>
        )}  

      */}
      {/* Attribution */}
      <footer className="quote-attribution">
        Inspirational quotes provided by{" "}
        <a href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer">
          ZenQuotes API
        </a>
      </footer>
      </div>
     </main>
    </>
  )
}

export default MainPage;