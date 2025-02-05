import { UserLogin } from "../interfaces/UserLogin";

interface LoginResponse {
  token: string;
}
//user creating a login
const login = async (userInfo: UserLogin): Promise<LoginResponse | null> => {
  // TODO: make a POST request to the login route
  try {
    // Make a POST request to the login route
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo), // Convert user info to JSON
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    //if login is successful, a token will be sent in the response
    //from the login in server/auth-routes
    //store toke in data

    const data: LoginResponse = await response.json();
    // Check if a token is present in the response
    if (data.token) {
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      return data; // Return the login response containing the token
    } else {
      console.error('Token not found in the response');
      return null; // No token returned
    }
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
};

export { login };
