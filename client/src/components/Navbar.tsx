//Navbar.tsx
import LoginModal from "./LoginModal";


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#"></a>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
        >
          Login
        </button>
      </div>
     <LoginModal onLogin={(user) => console.log("Logged in:", user)} />
    </nav>
  );
};

export default Navbar;


