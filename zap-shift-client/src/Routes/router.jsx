import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import Error from "../Pages/Error404/Error";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Story from "../Pages/AboutUs/Story";
import Mission from "../Pages/AboutUs/mission";
import Success from "../Pages/AboutUs/Success";
import Others from "../Pages/AboutUs/Others";
import Rider from "../Pages/Rider/Rider";
import Pricing from "../Pages/Pricing/Pricing";
import Services from "../Pages/Services/Services";
import AuthLayout from "../Layouts/AuthLayout";
import SignUp from "../Pages/AuthPages/SignUp";
import SignIn from "../Pages/AuthPages/SignIn";
import ForgetPassword from "../Pages/AuthPages/ForgerPassword/ForgetPassword";
import ResetPassword from "../Pages/AuthPages/ForgerPassword/ResetPassword";
import VerifyCode from "../Pages/AuthPages/ForgerPassword/VerifyCode";
import PrivetRoutes from "./PrivetRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCencle from "../Pages/Dashboard/Payment/PaymentCencle";
import PaymenthHistory from "../Pages/Dashboard/PaymenthHistory/PaymenthHistory";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "services",
        Component: Services,
      },
      {
        path: "coverage",
        Component: Coverage,
      },
      {
        path: "aboutUs",
        Component: AboutUs,
        children: [
          {
            index: true,
            Component: Story,
          },
          {
            path: "mission",
            Component: Mission,
          },
          {
            path: "success",
            Component: Success,
          },
          {
            path: "others",
            Component: Others,
          },
        ],
      },
      {
        path: "send-parcel",
        element: (
          <PrivetRoutes>
            <SendParcel />
          </PrivetRoutes>
        ),
        // element: <SendParcel />,
      },
      {
        path: "rider",
        element: (
          <PrivetRoutes>
            <Rider />
          </PrivetRoutes>
        ),
        // element: <Rider />,
      },
      {
        path: "pricing",
        Component: Pricing,
      },
    ],
  },
  // ------ Auth LayOut -------
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "signin",
        Component: SignIn,
      },
      {
        path: "signup",
        Component: SignUp,
      },
      {
        path: "forgetpassword",
        Component: ForgetPassword,
      },
      {
        path: "veifycode",
        Component: VerifyCode,
      },
      {
        path: "resetpassword",
        Component: ResetPassword,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoutes>
        <DashboardLayout />
      </PrivetRoutes>
    ),
    // element: <DashboardLayout />,
    children: [
      {
        path: "my-parcels",
        element: <MyParcels />,
      },
      {
        path: "approve-riders",
        element: <ApproveRiders />,
      },
      {
        path: "payment/:parcelId",
        element: <Payment />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-cencelled",
        element: <PaymentCencle />,
      },
      {
        path: "payment-history",
        element: <PaymenthHistory />,
      },
      {
        path: "users-Management",
        element: <UsersManagement />,
      },
    ],
  },
  {
    path: "/*",
    element: (
      <>
        <div className="min-h-screen">
          <h1 className="text-4xl text-center font-bold"></h1>
          <h2 className="text-4xl text-red-500 text-center font-bold">
            page not Found
          </h2>
        </div>
      </>
    ),
  },
]);
