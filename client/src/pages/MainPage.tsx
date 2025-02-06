// MainPage.tsx 
import Navbar from '../components/Navbar.tsx'


function MainPage () {
  return (
    <>
     <Navbar />
     <main className="main-container">
       <img src="/images/logo.png" alt="Flow State Logo" className="logo" />
     </main>
    </>
  )
}

export default MainPage;