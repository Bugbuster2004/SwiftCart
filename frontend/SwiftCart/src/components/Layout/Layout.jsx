import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
function Layout(props) {
  return (
    <>
      <Header />
      <main style={{ minHeight: "89vh" }}>{props.children}</main>
      <Toaster />
      <Footer />
    </>
  );
}

export default Layout;
