import React from "react";
import Link from "next/link";
import Socials from "../Socials";
import Button from "../Button";
import yourData from "../../data/portfolio.json";

const Footer = () => {
  const year = new Date().getFullYear();
  const displayName = "Building Better Websites, One Pixel at a Time";

  const email = yourData.socials?.find((s) => s.title?.toLowerCase() === "email");
  const phone = yourData.socials?.find((s) => s.title?.toLowerCase() === "phone");
  const location = "United States";

  return (
    <>
      <footer className="mt-5 laptop:mt-40 p-2 laptop:p-0" id="contact">
        <div className="rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white px-6 py-10 tablet:px-10">
          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-10">
            <div>
              <div className="text-2xl font-semibold">{displayName}</div>
              <p className="mt-4 text-sm text-slate-700 dark:text-gray-200 max-w-xl">
              Small businesses deserve big websites. Just because your company is growing doesn’t mean your online presence should feel small. Let’s build you something remarkable.
              </p>
              <div className="mt-6">
                <Link href="/get-started">
                  <Button type="primary">GET STARTED TODAY</Button>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold">QUICK LINKS</h3>
              <div className="mt-4 grid grid-cols-2 gap-y-3 text-slate-700 dark:text-gray-200">
                <Link href="/">Home</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/get-started">Get Started</Link>
                <Link href="/">SEO</Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold">CONTACT INFORMATION</h3>
              <ul className="mt-4 space-y-3 text-slate-700 dark:text-gray-200 text-sm">
                <li><span className="opacity-70">Hours:</span> 24/7</li>
                {phone?.link && <li><span className="opacity-70">Phone:</span> {phone.link.replace("smsto:", "")}</li>}
                {email?.link && <li><span className="opacity-70">Email:</span> {email.link.replace("mailto:", "")}</li>}
                <li><span className="opacity-70">Location:</span> {location}</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-200 dark:border-white/10 pt-6 flex flex-col mob:flex-row mob:items-center mob:justify-between text-sm text-slate-700 dark:text-gray-300">
            <div className="mb-4 mob:mb-0">
              © {year} {displayName}. All rights reserved
            </div>
            <div className="flex gap-6">
              <Link href="/privacy">Privacy Policy</Link>
              <span className="opacity-50">|</span>
              <Link href="/terms">Terms Of Use</Link>
            </div>
          </div>

          <div className="mt-6">
            <Socials className="-ml-2" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
