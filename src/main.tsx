import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage.tsx';
import UnForm from './views/UnForm.tsx';
import ConForm from './views/ConForm.tsx';
import Home from './views/Home.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/uncontrolledform', element: <UnForm /> },
      { path: '/form', element: <ConForm /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </React.StrictMode>
  </Provider>,
);
