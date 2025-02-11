import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './index.css'

import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import MainPage from './pages/MainPage.tsx'
import DashPage from './pages/DashPage.tsx'

console.log('Running MAIN.tsx')
const router = createBrowserRouter([
  {
    path: '/',                 //root route
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
    {
      index: true,      // when root is visited, MainPage will load as outlet
      element: <MainPage />
    }, 
    {
      path: '/dash',
      element: <DashPage />
    },
  ]
  }
]);

const rootElement = document.getElementById('root');
if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}
