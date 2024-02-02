import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { Provider } from 'react-redux';
import store from './app/store'
import Root from "./routes/root";
import Login from './routes/login.jsx';
import SignUp from './routes/signup.jsx';
import TransactionPage from './routes/transactionPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path:"/login",
        element: <Login/>
      },
      {
        path:"/signup",
        element: <SignUp/>
      },
      {
        path:"/tracker",
        element: <TransactionPage/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
