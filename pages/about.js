import React from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import SEO, { SITE_URL } from "../components/SEO";
import data from "../data/portfolio.json";

export default function AboutPage() {
  const router = useRouter();
  const handleWorkScroll = () => router.push("/");
  const handleAboutScroll = () => router.push("/about");
  
  return (
    <>
      <SEO
        title="About"
        description={`About ${data.name}`}
        image={data?.projects?.[0]?.imageSrc}
        canonical={`${SITE_URL}/about`}
      />
      <div className="container mx-auto p-2 laptop:p-0">
        <Header 
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <div className="mt-10 laptop:mt-20">
        <div className="mx-auto w-full laptop:w-4/5">
          <h1 className="text-2xl text-bold">About</h1>
          <div className="mt-4 space-y-6 text-lg opacity-90 laptop:w-3/5">
            <p>
              Hi, I’m Ahmad — the owner and lead developer behind [Your Business Name]. I build websites and apps with one goal in mind: helping small businesses look professional online without breaking the bank.
            </p>
            <p>
              When I started out in software development, I noticed a big problem. Many small businesses either couldn’t afford a modern, high-performing website, or they paid thousands only to end up with something outdated and clunky. I knew there had to be a better way.
            </p>
            <p>
              That’s why I created a pricing model that works for everyday businesses: $0 down and a simple monthly rate. No huge upfront costs, no confusing tech jargon — just clean design, fast performance, and ongoing support you can actually rely on.
            </p>
            <p>
              I take care of everything — from design and development to hosting and updates — so you can focus on running your business. Think of me as your personal web partner who’s always just a call or text away.
            </p>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}


