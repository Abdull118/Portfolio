import { useRef, useState, useCallback } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger, fadeInUp } from "../animations";
import Button from "../components/Button";
import Link from "next/link";
import ZoomView from "../components/ZoomView";
import SEO, { SITE_URL } from "../components/SEO";
import Testimonials from "../components/Testimonials";

// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  // Ref
  const workRef = useRef();
  const aboutRef = useRef();
  const textOne = useRef();
  const textTwo = useRef();
  const textThree = useRef();
  const textFour = useRef();
  const serviceCardsRef = useRef();

  const [openWindows, setOpenWindows] = useState([]);
  const [nextWindowId, setNextWindowId] = useState(1);
  const [activeTab, setActiveTab] = useState('');

  const openProject = useCallback((project, rect) => {
    if (typeof window !== "undefined" && window.innerWidth < 600 && project?.url) {
      window.open(project.url, "_blank", "noopener,noreferrer");
      return;
    }

    const windowId = nextWindowId;
    const newWindow = {
      id: windowId,
      project: project,
      cardRect: rect,
      isOpen: true,
      isMinimized: false,
      isFullscreen: false,
      windowSize: { width: 1200, height: 800 },
      windowPosition: {
        x: Math.random() * (window.innerWidth - 1200) * 0.3,
        y: Math.random() * (window.innerHeight - 800) * 0.3
      },
      zIndex: 100 + openWindows.length
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setNextWindowId(prev => prev + 1);
  }, [nextWindowId, openWindows.length]);

  const closeProject = useCallback((windowId) => {
    setOpenWindows(prev => prev.filter(window => window.id !== windowId));
  }, []);

  const updateWindow = useCallback((windowId, updates) => {
    setOpenWindows(prev => prev.map(window => 
      window.id === windowId ? { ...window, ...updates } : window
    ));
  }, []);

  const bringToFront = useCallback((windowId) => {
    setOpenWindows(prev => {
      const maxZIndex = Math.max(...prev.map(w => w.zIndex), 100);
      return prev.map(window => 
        window.id === windowId 
          ? { ...window, zIndex: maxZIndex + 1 }
          : window
      );
    });
  }, []);

  // Calculate minimized window positions
  const getMinimizedPosition = useCallback((windowId) => {
    const minimizedWindows = openWindows.filter(w => w.isMinimized && w.isOpen);
    const currentIndex = minimizedWindows.findIndex(w => w.id === windowId);
    return currentIndex;
  }, [openWindows]);

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current, textThree.current, textFour.current],
      { y: 30 },
      { y: 0 }
    );
    
    // Animate service cards when they come into view
    if (serviceCardsRef.current) {
      const cards = serviceCardsRef.current.children;
      fadeInUp(cards, 0.2);
    }
  }, []);

  return (
    <>
      <SEO
        title="Portfolio"
        description={`${data.name} is a full-stack software engineer based in New York building high-performing web apps.`}
        image={data?.projects?.[0]?.imageSrc}
        canonical={`${SITE_URL}/`}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": data.name,
          "jobTitle": "Full Stack Software Engineer",
          "description": data.aboutpara,
          "url": SITE_URL,
          "sameAs": data.socials?.map((social) => social.link),
          "knowsAbout": [
            "Web Development",
            "Full Stack Engineering",
            "JavaScript",
            "React",
            "Next.js",
            "Tailwind CSS",
          ],
        }}
      />
      {/* This button should not go into production */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-5 right-5">
          <Link href="/edit">
            <Button type="primary">Edit Data</Button>
          </Link>
        </div>
      )}

      <div className="container mx-auto mb-10">
        <Header
          handleWorkScroll={handleWorkScroll}
          handleAboutScroll={handleAboutScroll}
        />
        <div className="laptop:mt-20 mt-10">
          <div className="mt-5">
            <h1
              ref={textOne}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineOne}
            </h1>
            <h1
              ref={textTwo}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineTwo}
            </h1>
            <h1
              ref={textThree}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineThree}
            </h1>
            <h1
              ref={textFour}
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-full laptop:w-4/5"
            >
              {data.headerTaglineFour}
            </h1>
          </div>

          <Socials className="mt-2 laptop:mt-5" />
        </div>
        {/* What We Do */}
        <div className="mt-16 laptop:mt-28 p-2 laptop:p-0">
          <div className="mx-auto w-full laptop:w-4/5">
            <h1 className="text-2xl text-bold">What We Do</h1>
            <div className="mt-2">
              <h2 className="text-2xl laptop:text-3xl font-semibold mb-3">Never Worry About Your Website Ever Again</h2>
              <p className="opacity-80 text-lg">
                As a full-stack software engineer, I specialize in building high-performance web applications that drive business growth. Every line of code is crafted by hand to ensure optimal performance, scalability, and user experience. From initial concept to deployment and beyond, I provide ongoing support and unlimited improvements to help your business thrive in the digital landscape.
              </p>
            </div>
            <div ref={serviceCardsRef} className="mt-8 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
              <div className="service-card group relative rounded-xl p-6 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02]">
              <div className="liquid-glass bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Mobile First Design</h3>
                <p className="opacity-80 mb-4 group-hover:opacity-90 transition-opacity duration-300">Every project starts with mobile optimization. Clean, semantic code ensures lightning-fast performance across all devices while maintaining pixel-perfect design consistency.</p>
                <a className="underline hover:no-underline transition-all duration-200 inline-block group-hover:text-blue-600 dark:group-hover:text-blue-400" href="/get-started">Get Started</a>
              </div>
            </div>
              <div className="service-card group relative rounded-xl p-6 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02]">
              <div className="liquid-glass bg-gradient-to-br from-green-500/20 to-teal-500/20"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300">Fully Responsive</h3>
                <p className="opacity-80 mb-4 group-hover:opacity-90 transition-opacity duration-300">Adaptive layouts that look stunning on every screen size. From smartphones to ultra-wide displays, your users get the optimal experience regardless of their device.</p>
                <a className="underline hover:no-underline transition-all duration-200 inline-block group-hover:text-green-600 dark:group-hover:text-green-400" href="/get-started">Get Started</a>
              </div>
            </div>
              <div className="service-card group relative rounded-xl p-6 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02]">
              <div className="liquid-glass bg-gradient-to-br from-yellow-500/20 to-orange-500/20"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">Optimized Performance</h3>
                <p className="opacity-80 mb-4 group-hover:opacity-90 transition-opacity duration-300">Sub-second load times that boost SEO rankings and user engagement. Every byte is optimized for maximum efficiency without compromising functionality.</p>
                <a className="underline hover:no-underline transition-all duration-200 inline-block group-hover:text-orange-600 dark:group-hover:text-orange-400" href="/get-started">Learn More</a>
              </div>
            </div>
              <div className="service-card group relative rounded-xl p-6 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02]">
              <div className="liquid-glass bg-gradient-to-br from-purple-500/20 to-pink-500/20"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">SEO Optimized</h3>
                <p className="opacity-80 mb-4 group-hover:opacity-90 transition-opacity duration-300">Technical SEO foundations built into every project. Semantic HTML, structured data, and performance optimization help you rank higher and attract more organic traffic.</p>
                <a className="underline hover:no-underline transition-all duration-200 inline-block group-hover:text-purple-600 dark:group-hover:text-purple-400" href="/get-started">Learn More</a>
              </div>
            </div>
              <div className="service-card group relative rounded-xl p-6 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02]">
              <div className="liquid-glass bg-gradient-to-br from-red-500/20 to-rose-500/20"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">Conversion Focused</h3>
                <p className="opacity-80 mb-4 group-hover:opacity-90 transition-opacity duration-300">Strategic UX design and persuasive copy that converts visitors into customers. Data-driven decisions guide every design choice to maximize your ROI.</p>
                <a className="underline hover:no-underline transition-all duration-200 inline-block group-hover:text-red-600 dark:group-hover:text-red-400" href="/get-started">Learn More</a>
              </div>
            </div>
              <div className="service-card group relative rounded-xl p-6 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-500 hover:shadow-xl hover:scale-[1.02]">
              <div className="liquid-glass bg-gradient-to-br from-indigo-500/20 to-blue-500/20"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">24/7 Support</h3>
                <p className="opacity-80 mb-4 group-hover:opacity-90 transition-opacity duration-300">NYC-based with global reach. Available around the clock for urgent updates, maintenance, and strategic consultations to keep your business running smoothly.</p>
                <a className="underline hover:no-underline transition-all duration-200 inline-block group-hover:text-indigo-600 dark:group-hover:text-indigo-400" href="/get-started">Contact Me</a>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div id="portfolio" className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <div className="mx-auto w-full laptop:w-4/5">
            <h1 className="text-2xl text-bold">Portfolio</h1>
            <h2 className="text-xl font-medium mt-4 mb-6">Some Of The Work We've Done Over The Years</h2>
            <p className="text-lg opacity-80 mb-8">
              I've worked with clients across various industries including startups, e-commerce platforms, SaaS applications, fintech companies, and more. From concept to deployment, I specialize in building scalable web applications that deliver exceptional user experiences and drive business growth.
            </p>
            <div className="mt-5 laptop:mt-10 grid grid-cols-1 tablet:grid-cols-2 gap-4">
              {data.projects.map((project) => (
                <WorkCard
                  key={project.id}
                  img={project.imageSrc}
                  name={project.title}
                  description={project.description}
                  onClick={(rect) => openProject(project, rect)}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* What We Offer */}
        <div id="services" className="mt-16 laptop:mt-28 p-2 laptop:p-0">
          <div className="mx-auto w-full laptop:w-4/5">
            <h1 className="text-2xl text-bold">What We Offer</h1>
            
            {/* Service Selection */}
            <div className="mt-8 text-center">
            <p className="text-lg opacity-80 mb-6">Choose your service:</p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => setActiveTab('websites')}
                className={`px-8 py-4 text-xl font-medium transition-all duration-300 border-2 rounded-lg ${
                  activeTab === 'websites'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-300'
                }`}
              >
                Websites
              </button>
              <button
                onClick={() => setActiveTab('apps')}
                className={`px-8 py-4 text-xl font-medium transition-all duration-300 border-2 rounded-lg ${
                  activeTab === 'apps'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-300'
                }`}
              >
                Mobile Apps
              </button>
            </div>
            </div>

          {/* Websites Tab Content */}
          {activeTab === 'websites' && (
            <div className="mt-8">
              <div className="w-full laptop:w-4/5">
                <h2 className="text-2xl laptop:text-3xl font-semibold mb-3">Websites from $0 Upfront, $175/Month</h2>
                <p className="opacity-80 text-lg mb-8">
                  Get your business online with a professional 5-page website at no upfront cost—just $175 per month. Need more than 5 pages? We'll create a custom plan based on your goals and project size. All packages come with a 12-month commitment, full design & development, hosting, unlimited edits, lifetime updates, and 24/7 support.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 laptop:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 text-xl mt-1">✔️</div>
                  <div>
                    <h3 className="font-semibold mb-1">Built to Be Safe</h3>
                    <p className="opacity-80 text-sm">Our websites use lightweight static code, so there's no database or backend for hackers to target.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 text-xl mt-1">✔️</div>
                  <div>
                    <h3 className="font-semibold mb-1">Tailored to You</h3>
                    <p className="opacity-80 text-sm">Every design is crafted by our in-house team to reflect your brand and vision.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 text-xl mt-1">✔️</div>
                  <div>
                    <h3 className="font-semibold mb-1">Lightning Fast</h3>
                    <p className="opacity-80 text-sm">No unnecessary code, no slowdowns—our builds regularly achieve 98–100 scores on Google PageSpeed.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 text-xl mt-1">✔️</div>
                  <div>
                    <h3 className="font-semibold mb-1">Risk-Free Guarantee</h3>
                    <p className="opacity-80 text-sm">If you're not happy with the design, you'll get your money back and the contract ends.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 text-xl mt-1">✔️</div>
                  <div>
                    <h3 className="font-semibold mb-1">Personal Support</h3>
                    <p className="opacity-80 text-sm">No call centers, no automated responses—you'll always reach me directly when you need help.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 text-xl mt-1">✔️</div>
                  <div>
                    <h3 className="font-semibold mb-1">Straightforward SEO</h3>
                    <p className="opacity-80 text-sm">We keep SEO honest and simple, showing you exactly how we'll help your site rank.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <a href="/get-started" className="inline-block">
                  <Button type="primary">Get Started Today</Button>
                </a>
              </div>
            </div>
          )}

          {/* Apps Tab Content */}
          {activeTab === 'apps' && (
            <div className="mt-8">
              <div className="w-full laptop:w-4/5">
                <h2 className="text-2xl laptop:text-3xl font-semibold mb-3">Mobile Apps Made Simple</h2>
                <h3 className="text-xl font-medium mb-3">Apps Starting at $0 Upfront, $250/Month</h3>
                <p className="opacity-80 text-lg mb-8">
                  Bring your idea to life with a custom mobile app—built for iOS, Android, or both. We offer $0 down and affordable monthly pricing starting at $250. More complex features? We'll provide a custom quote based on functionality, integrations, and scope. All plans include design, development, publishing, ongoing updates, and 24/7 support.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 laptop:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 text-xl mt-1">✔️</div>
                  <div>
                    <h3 className="font-semibold mb-1">Fully Custom-Built</h3>
                    <p className="opacity-80 text-sm">Your app is designed and coded specifically for your business—no templates, no shortcuts.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 text-xl mt-1">✔️</div>
                  <div>
                    <h3 className="font-semibold mb-1">Cross-Platform Ready</h3>
                    <p className="opacity-80 text-sm">We develop apps for both iOS and Android so you can reach every customer.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 text-xl mt-1">✔️</div>
                  <div>
                    <h3 className="font-semibold mb-1">Fast & Reliable</h3>
                    <p className="opacity-80 text-sm">Our apps are optimized for speed and stability, with regular updates to keep things running smoothly.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 text-xl mt-1">✔️</div>
                  <div>
                    <h3 className="font-semibold mb-1">Scalable for Growth</h3>
                    <p className="opacity-80 text-sm">From MVPs to enterprise-level features, we build apps that can grow with your business.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 text-xl mt-1">✔️</div>
                  <div>
                    <h3 className="font-semibold mb-1">Direct Support</h3>
                    <p className="opacity-80 text-sm">You'll never be left in the dark—reach me directly anytime with questions or requests.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 text-xl mt-1">✔️</div>
                  <div>
                    <h3 className="font-semibold mb-1">App Store Publishing</h3>
                    <p className="opacity-80 text-sm">We handle the entire submission process for the App Store and Google Play.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <a href="/get-started" className="inline-block">
                  <Button type="primary">Get Started Today</Button>
                </a>
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Pricing */}
        <div id="pricing" className="mt-16 laptop:mt-28 p-2 laptop:p-0">
          <div className="mx-auto w-full laptop:w-4/5">
            <h1 className="text-2xl text-bold">Our Pricing</h1>
            <h2 className="text-xl font-medium mt-2 opacity-90">Flexible Packages for Every Business</h2>
            <div className="mt-8 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-6">
              {/* Websites — One-Time Build (Card 1) */}
              <div className="relative rounded-2xl p-6 border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/40 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 h-full flex flex-col">
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Websites</div>
                  <div className="text-lg font-semibold mt-1">One-Time Build</div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-4"></div>
                <ul className="space-y-2 text-sm opacity-90">
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>Custom Design & Development</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>$25/mo Hosting</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>5 Pages Standard (additional pages $100 each)</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>Optional Blog Setup (+$250)</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>Optional Unlimited Edits (+$50/mo)</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>24/7 Direct Support</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>Lifetime Updates</span></li>
                </ul>
                <div className="flex-grow"></div>
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent my-4"></div>
                <div className="text-2xl font-semibold">$3,800 + $25/mo Hosting</div>
                <div className="mt-4 pt-6">
                  <a href="/get-started"><Button type="primary">Get Started</Button></a>
                </div>
              </div>

              {/* Websites — Monthly Plan (Card 2 - Highlighted) */}
              <div className="relative rounded-2xl p-7 laptop:p-8 border border-transparent bg-gradient-to-b from-blue-50/70 to-blue-100/40 dark:from-blue-900/20 dark:to-blue-900/10 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col z-10">
                <div className="absolute -top-3 right-4">
                  <span className="inline-block rounded-full bg-blue-600 text-white text-[10px] tracking-wide px-2 py-1 shadow-sm">MOST POPULAR</span>
                </div>
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-wide text-blue-700 dark:text-blue-300">Websites</div>
                  <div className="text-lg font-semibold mt-1">Monthly Plan</div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-200/70 dark:via-blue-800 to-transparent mb-4"></div>
                <ul className="space-y-2 text-sm opacity-90">
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400"></span><span>Custom Design & Development</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400"></span><span>Hosting Included</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400"></span><span>5 Pages Standard (additional pages $100 each)</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400"></span><span>Unlimited Edits</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400"></span><span>24/7 Direct Support</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400"></span><span>Lifetime Updates</span></li>
                </ul>
                <div className="flex-grow"></div>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-200/70 dark:via-blue-800 to-transparent my-4"></div>
                <div>
                  <div className="text-3xl font-bold tracking-tight">$175 / month</div>
                  <div className="text-sm opacity-70">12-month minimum</div>
                </div>
                <div className="mt-4 pt-6">
                  <a href="/get-started"><Button type="primary">Get Started</Button></a>
                </div>
              </div>

              {/* Ecommerce — Shopify Package (Card 3) */}
              <div className="relative rounded-2xl p-6 border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/40 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 h-full flex flex-col">
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Ecommerce</div>
                  <div className="text-lg font-semibold mt-1">Shopify Package</div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-4"></div>
                <ul className="space-y-2 text-sm opacity-90">
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>Fully Custom Shopify Store</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>App Integration & Setup</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>Shipping Integration</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>Shopify Training Walkthrough</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>Editable via Shopify CMS</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>Optional Unlimited Edits (+$50/mo)</span></li>
                  <li className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400"></span><span>24/7 Direct Support</span></li>
                </ul>
                <div className="flex-grow"></div>
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent my-4"></div>
                <div className="text-2xl font-semibold">Starting at $8,000</div>
                <div className="mt-4 pt-6">
                  <a href="/get-started"><Button type="primary">Get Started</Button></a>
                </div>
              </div>

              {/* Mobile Apps (Card 4) */}
              <div className="relative rounded-2xl p-6 border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/40 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 h-full flex flex-col">
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Mobile Apps</div>
                  <div className="text-lg font-semibold mt-1">Custom-Built for iOS & Android</div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent mb-4"></div>
                <div className="text-sm opacity-90 space-y-2">
                  <p>Tailored Design & Development</p>
                  <p>iOS & Android Deployment</p>
                  <p>App Store & Google Play Publishing</p>
                  <p>Ongoing Updates & Maintenance</p>
                  <p>24/7 Direct Support</p>
                  <p>Scales with Your Business</p>
                  <p className="opacity-80">Because every app is unique, pricing depends on features, integrations, and complexity.</p>
                </div>
                <div className="flex-grow"></div>
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent my-4"></div>
                <div className="text-2xl font-semibold">Request a Quote</div>
                <div className="mt-4 pt-6">
                  <a href="/get-started"><Button type="primary">Start Your App Project</Button></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div id="testimonials">
          <Testimonials />
        </div>
        
        {/* About section moved to /about page */}
        {/* Global footer is rendered in _app.js */}
      </div>

      {openWindows.map((window) => (
        <ZoomView
          key={window.id}
          windowId={window.id}
          project={window.project}
          isOpen={window.isOpen}
          isMinimized={window.isMinimized}
          isFullscreen={window.isFullscreen}
          cardRect={window.cardRect}
          windowSize={window.windowSize}
          windowPosition={window.windowPosition}
          zIndex={window.zIndex}
          minimizedIndex={getMinimizedPosition(window.id)}
          onClose={() => closeProject(window.id)}
          onUpdate={(updates) => updateWindow(window.id, updates)}
          onBringToFront={() => bringToFront(window.id)}
        />
      ))}
    </>
  );
}
