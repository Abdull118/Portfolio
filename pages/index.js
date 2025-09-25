import { useRef, useState, useCallback } from "react";
import Header from "../components/Header";
import ServiceCard from "../components/ServiceCard";
import Socials from "../components/Socials";
import WorkCard from "../components/WorkCard";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Link from "next/link";
import ZoomView from "../components/ZoomView";
import SEO, { SITE_URL } from "../components/SEO";

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

  const [openWindows, setOpenWindows] = useState([]);
  const [nextWindowId, setNextWindowId] = useState(1);

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
              className="text-3xl tablet:text-6xl laptop:text-6xl laptopl:text-8xl p-1 tablet:p-2 text-bold w-4/5 mob:w-full laptop:w-4/5"
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
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0" ref={workRef}>
          <h1 className="text-2xl text-bold">Work.</h1>
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
        <div className="mt-10 laptop:mt-30 p-2 laptop:p-0">
          <h1 className="tablet:m-10 text-2xl text-bold">Services.</h1>
          <div className="mt-5 tablet:m-10 grid grid-cols-1 laptop:grid-cols-2 gap-6">
            {data.services.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
        <div className="mt-10 laptop:mt-40 p-2 laptop:p-0" ref={aboutRef}>
          <h1 className="tablet:m-10 text-2xl text-bold">About.</h1>
          <p className="tablet:m-10 mt-2 text-xl laptop:text-3xl w-full laptop:w-3/5">
            {data.aboutpara}
          </p>
        </div>
        <Footer />
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
