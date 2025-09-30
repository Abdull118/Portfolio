import React, { useRef } from "react";
import { useIsomorphicLayoutEffect } from "../../utils";
import { fadeInUp } from "../../animations";

const testimonials = [
  {
    id: 1,
    name: "Sarah J.",
    content: "Ahmad delivered an incredible website that exceeded all our expectations. The attention to detail and performance optimization was outstanding. Our conversion rate increased by 40% within the first month!",
    rating: 5,
    project: "E-commerce Platform"
  },
  {
    id: 2,
    name: "Michael C.",
    content: "Working with Ahmad was a game-changer for our business. He built a custom mobile app that perfectly captured our vision. The ongoing support and updates have been invaluable to our growth.",
    rating: 5,
    project: "Mobile App Development"
  },
  {
    id: 3,
    name: "Emily R.",
    content: "Ahmad's expertise in modern web technologies is unmatched. He transformed our outdated website into a fast, responsive, and beautiful platform. The SEO improvements alone paid for the project twice over.",
    rating: 5,
    project: "Website Redesign"
  },
  {
    id: 4,
    name: "Khalid A.",
    content: "The Islamic Society project was handled with such care and professionalism. Ahmad understood our community needs and delivered a solution that's both functional and accessible. Highly recommended!",
    rating: 5,
    project: "Community Platform"
  },
  {
    id: 5,
    name: "Lisa P.",
    content: "Ahmad's blockchain expertise helped us launch our CryptoVault platform successfully. His technical knowledge and problem-solving skills are exceptional. The platform has been running flawlessly since launch.",
    rating: 5,
    project: "Blockchain dApp"
  },
  {
    id: 6,
    name: "Robert W.",
    content: "Tenant Score has revolutionized how we handle tenant applications. Ahmad's understanding of our industry needs and technical execution was perfect. The platform is intuitive and saves us hours daily.",
    rating: 5,
    project: "SaaS Platform"
  }
];

const Testimonials = () => {
  const testimonialsRef = useRef();

  useIsomorphicLayoutEffect(() => {
    if (testimonialsRef.current) {
      const cards = testimonialsRef.current.children;
      fadeInUp(cards, 0.15);
    }
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? "text-yellow-400 fill-current"
            : "text-gray-300 dark:text-gray-600"
        }`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="mt-16 laptop:mt-28 p-2 laptop:p-0">
      <div className="mx-auto w-full laptop:w-4/5">
        <div className="text-center mb-12">
          <h1 className="text-2xl text-bold">What Our Clients Say</h1>
          <h2 className="text-xl font-medium mt-2 opacity-90">Trusted by businesses across industries</h2>
          <p className="mt-4 text-lg opacity-80 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what real clients have to say about their experience working with us.
          </p>
        </div>

        <div ref={testimonialsRef} className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative rounded-2xl p-6 border border-slate-200/70 dark:border-slate-800/70 bg-white/80 dark:bg-slate-900/40 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
            >
              {/* Background gradient effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-slate-700 dark:text-slate-300 mb-6 flex-grow italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Project badge */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                    {testimonial.project}
                  </span>
                </div>

                {/* Author info */}
                <div className="border-t border-slate-200/70 dark:border-slate-700/70 pt-4">
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    {testimonial.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-lg opacity-80 mb-6">
            Ready to join our satisfied clients?
          </p>
          <a href="/get-started" className="inline-block">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              Start Your Project
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
