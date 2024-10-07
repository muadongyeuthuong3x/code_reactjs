import React, { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Lazily load the Home component
const LazyComponent = lazy(() => import('./screens/Home'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/home" element={<LazyComponent />} />
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
