import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import ProtectedRouter from "../router/ProtectedRouter";

const Login = lazy(() => import("../login/Login"));
const Register = lazy(() => import("../login/Register"));
const CarList = lazy(() => import("../cars/CarList"));
const CarDetail = lazy(() => import("../cars/CarDetail"));
const CarEdit = lazy(() => import("../cars/CarEdit"));
const CarDelete = lazy(() => import("../cars/CarDelete"));
const CarPublish = lazy(() => import("../cars/CarPublish"));
const Close = lazy(() => import("../login/Close"));
const Logout = lazy(() => import("../login/Logout"));
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            {" "}
            <ProtectedRouter component={<CarList />} />{" "}
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            {" "}
            <Login />{" "}
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            {" "}
            <Register />{" "}
          </Suspense>
        ),
      },
      {
        path: "/cars",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            {" "}
            <ProtectedRouter component={<CarList />} />{" "}
          </Suspense>
        ),
      },
      {
        path: "car/:id",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            {" "}
            <ProtectedRouter component={<CarDetail />} />{" "}
          </Suspense>
        ),
      },
      {
        path: "close",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            {" "}
            <ProtectedRouter component={<Close />} />{" "}
          </Suspense>
        ),
      },
      {
        path: "/logout",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            {" "}
            <ProtectedRouter component={<Logout />} />{" "}
          </Suspense>
        ),
      },
      {
        path: "/car/edit/:_id",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            {" "}
            <ProtectedRouter component={<CarEdit />} />{" "}
          </Suspense>
        ),
      },
      {
        path: "/car/delete/:_id",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            {" "}
            <ProtectedRouter component={<CarDelete />} />{" "}
          </Suspense>
        ),
      },
      {
        path: "/car/publish",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            {" "}
            <ProtectedRouter component={<CarPublish />} />{" "}
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
