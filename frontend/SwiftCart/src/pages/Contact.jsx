import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout>
      <div className="contact">
        <h2>Get In Touch With Us</h2>
        <p className="description">
          If you feel any query. Just contact us on the below number!
        </p>
        <p className="contact-info">
          <BiMailSend />{" "}
          <a href="mailto:www.help@ecommerceapp.com">www.help@swiftcart.com</a>
        </p>
        <p className="contact-info">
          <BiPhoneCall /> <a href="tel:0123456789">012-3456789</a>
        </p>
        <p className="contact-info">
          <BiSupport /> 1800-0000-0000 (toll free)
        </p>
      </div>
    </Layout>
  );
};

export default Contact;
