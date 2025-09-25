import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ServiceCard = ({ name, description }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      className={`w-full p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 ${
        mounted && theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-50"
      } hover:scale-105 cursor-pointer`}
    >
      <h3 className="text-3xl font-semibold">{name ? name : "Service"}</h3>
      <p className="mt-5 opacity-70 text-lg leading-relaxed">
        {description
          ? description
          : "End-to-end product design and development tailored to your business goals."}
      </p>
    </div>
  );
};

export default ServiceCard;
