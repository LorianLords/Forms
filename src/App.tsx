import './App.css';
import Home from './views/Home';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import Navigation from './components/Navigation.tsx';

function App() {
  return (
    <div className="h-full w-full bg-orange-300">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default App;
