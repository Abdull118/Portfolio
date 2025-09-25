import React from "react";
import Socials from "../Socials";
const Footer = () => {
  return (
    <>
      <div className="mt-5 laptop:mt-40 p-2 laptop:p-0" id="contact">
        <h2 className="text-2xl font-semibold">Contact.</h2>
        <div className="mt-5">
          <Socials />
        </div>
      </div>
      
    </>
  );
};

export default Footer;
