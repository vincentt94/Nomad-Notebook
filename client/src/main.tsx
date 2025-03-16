import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from "./app.tsx"
import Home from "./pages/Home.tsx";
import SignUp from "./pages/SignUp.tsx";
import Login from "./pages/Login.tsx";
import MyStories from "./pages/MyStories.tsx";
import CreateStory from "./pages/CreateStory.tsx";
import ErrorPage from "./pages/ErrorPage.tsx"

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/mystories",
                element: <MyStories />,
            },
            {
                path: "/createstory",
                element: <CreateStory />,
            }
        ],
    },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}