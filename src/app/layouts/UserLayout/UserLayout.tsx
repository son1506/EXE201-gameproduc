import { Layout } from "antd";
import { Outlet } from "react-router";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ScrollTop from "../../components/ScrollTop/ScrollTop";

const UserLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollTop />
      <Footer />
    </>
  );
};

export default UserLayout;