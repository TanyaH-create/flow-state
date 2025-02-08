//client/src/utils.auth.ts
import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    console.log('Token retrieved for profile', token)
    if (token) {
      return jwtDecode<JwtPayload>(token); // Decode the token and return the payload
    }
    return null; // If no token, return null
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    console.log('Token retrieved for login', token)
    if (token) {
      if (this.isTokenExpired(token)) {
        //log user out if token expires
        this.logout();  //log the user out 
        return false; //return false to indicate the user is no longer logged in
      }
      return true; //if token is not expired will return true
    }
    return false; //if no token
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded: JwtPayload = jwtDecode(token);
      //if decoded.exp undefined return expired
      if (!decoded.exp) {
        return true;
      }
       const expirationTime = decoded.exp * 1000; // Convert expiration time to milliseconds
      //Date now milisecons since JAn 1, 1970 (Unix timestamp)
      const expired = Date.now() > expirationTime; // Return true if the token is expired
        return expired;
    } catch (error) {
        return true; // If decoding fails, treat the token as expired
    }
  }

  getToken(): string {
    // TODO: return the token
    const storedToken =  localStorage.getItem('token') || '';
    console.log(`The token is ${storedToken}`);
    return storedToken;
    }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken); // Store token in localStorage
    
    // TODO: redirect to the home page
    window.location.href = '/'; // Redirect to the home page 
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token'); // Remove token from localStorage
    // TODO: redirect to the login page
    window.location.href = '/'; // Redirect to main page
  }
}

export default new AuthService();
