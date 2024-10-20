import './App.css';
import Home from './views/Home';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import Navigation from './components/Navigation.tsx';

function App() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default App;
