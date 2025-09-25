import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Button from "../Button";
import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
// Local Data
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isBlog }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="relative isolate">
      <Popover className="relative block tablet:hidden mt-5 z-10">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between p-2 laptop:p-0">
              <h1
                onClick={() => router.push("/")}
                className="font-medium cursor-pointer p-2 laptop:p-0"
              >
                {data.name}
              </h1>
              <div className="flex items-center">
                <Button
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  <img
                    className="h-6"
                    src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                    alt="Toggle theme"
                  ></img>
                </Button>
                <Popover.Button>
                  <img
                    className="h-5"
                    src={`/images/${
                      !open
                        ? theme === "dark"
                          ? "menu-white.svg"
                          : "menu.svg"
                        : theme === "light"
                        ? "cancel.svg"
                        : "cancel-white.svg"
                    }`}
                  ></img>
                </Popover.Button>
              </div>
            </div>
            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
              } shadow-md rounded-md`}
            >
              {!isBlog ? (
                <div className="grid grid-cols-1">
                  <Button onClick={handleWorkScroll}>Work</Button>
                  <Button onClick={handleAboutScroll}>About</Button>
                  {data.showBlog && (
                    <Button onClick={() => router.push("/blog")}>Blog</Button>
                  )}
                  <Button
                    onClick={() => window.open("mailto:ahmadevelops@gmail.com")}
                  >
                    Contact
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1">
                  <Button onClick={() => router.push("/")} classes="first:ml-1">
                    Home
                  </Button>
                  {data.showBlog && (
                    <Button onClick={() => router.push("/blog")}>Blog</Button>
                  )}
                  <Button
                    onClick={() => window.open("mailto:ahmadevelops@gmail.com")}
                  >
                    Contact
                  </Button>
                </div>
              )}
            </Popover.Panel>
          </>
        )}
      </Popover>
      <div className="mt-10 hidden flex-row items-center justify-between sticky top-0 z-10 tablet:flex bg-transparent dark:text-white">
        <h1
          onClick={() => router.push("/")}
          className="font-medium cursor-pointer mob:p-2 laptop:p-0"
        >
          {data.name}.
        </h1>
        {!isBlog ? (
          <div className="flex">
            <Button onClick={handleWorkScroll}>Work</Button>
            <Button onClick={handleAboutScroll}>About</Button>
            {data.showBlog && (
              <Button onClick={() => router.push("/blog")}>Blog</Button>
            )}
            <Button onClick={() => window.open("mailto:ahmadevelops@gmail.com")}>
              Contact
            </Button>
            {mounted && theme && (
              <Button
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <img
                  className="h-6"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                  alt="Toggle theme"
                ></img>
              </Button>
            )}
          </div>
        ) : (
          <div className="flex">
            <Button onClick={() => router.push("/")}>Home</Button>
            {data.showBlog && (
              <Button onClick={() => router.push("/blog")}>Blog</Button>
            )}
            <Button onClick={() => window.open("mailto:ahmadevelops@gmail.com")}>
              Contact
            </Button>
            {mounted && theme && (
              <Button
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <img
                  className="h-6"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                  alt="Toggle theme"
                ></img>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
