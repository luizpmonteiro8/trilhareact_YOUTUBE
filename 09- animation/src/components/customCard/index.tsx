"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  title: string;
  description: string;
}

const CustomCard: React.FC<Props> = ({ title, description }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div ref={cardRef}>
      <div
        className={`flex flex-col  p-6 rounded-lg border-l-4 border-orange-600 transition-transform duration-500 ${
          isVisible ? "animate-slide-in" : ""
        } 
        bg-secondary  
        shadow-md shadow-black     
        hover:scale-105 `}
      >
        <div className="flex flex-col items-center">
          <h3 className=" flex items-center text-xl font-bold mb-4 italic">
            {title}
          </h3>
          <p className="text-justify">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
