import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function FaqAccordion({
  items = [],
  title = "",
  className,
  ...props
}) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={cn("w-full relative font-sans", className)} {...props}>
      {title && (
        <h2 className="text-center font-bold text-2xl md:text-3xl mb-10 text-brand-navy">
          {title}
        </h2>
      )}
      
      <ul className="w-full mx-auto list-none p-0 flex flex-col">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <li
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              className={cn(
                "w-full relative transition-all duration-300 ease-in mb-3 rounded-xl overflow-hidden border",
                isActive ? "border-brand-teal/30 shadow-sm" : "border-gray-200/80"
              )}
            >
              <button
                type="button"
                className={cn(
                  "flex flex-row items-center justify-between w-full min-h-[64px] py-4 relative m-0 px-5 pl-14 cursor-pointer",
                  "border-l-[6px] md:border-l-[8px] transition-all duration-200 text-left outline-none text-base md:text-lg",
                  isActive 
                    ? "border-l-brand-teal bg-brand-teal-light/40 text-brand-navy font-bold" 
                    : "border-l-gray-300 bg-white text-gray-700 hover:border-l-brand-teal/60 hover:text-brand-navy hover:bg-gray-50"
                )}
                onClick={() => toggleItem(index)}
                aria-expanded={isActive}
              >
                {/* Plus/Minus Icon */}
                <span 
                  className={cn(
                    "absolute left-4 md:left-5 top-1/2 -translate-y-1/2 transition-all duration-200 leading-none font-light",
                    isActive ? "text-2xl md:text-3xl text-brand-teal" : "text-xl md:text-2xl text-gray-400"
                  )}
                >
                  {isActive ? "−" : "+"}
                </span>
                
                <span className="pr-6">{item.question}</span>
              </button>

              <div 
                className={cn(
                  "grid transition-all duration-300 ease-in-out w-full",
                  "border-l-[6px] md:border-l-[8px]",
                  isActive ? "grid-rows-[1fr] border-l-brand-teal bg-brand-teal-light/20 opacity-100" : "grid-rows-[0fr] border-l-gray-300 bg-transparent opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="flex flex-row items-start justify-start w-full px-5 pl-14 pb-6 pt-3 text-sm md:text-base font-normal text-brand-text-secondary leading-relaxed">
                    <span>{item.answer}</span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default FaqAccordion;
