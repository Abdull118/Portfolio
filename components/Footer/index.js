import React from "react";
import Socials from "../Socials";
import Link from "next/link";

const Footer = ({ dark }) => {
  return (
    <>
      <div className="mt-5 laptop:mt-40 p-2 laptop:p-0">
        <h1 className="text-2xl text-bold">Contact.</h1>
        <div className="mt-5">
          <Socials />
        </div>
      </div>
      
    </>
  );
};

export default Footer;
