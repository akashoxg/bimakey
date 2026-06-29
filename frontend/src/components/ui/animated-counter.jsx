import React, { useEffect, useState, useRef } from "react";

export function AnimatedCounter({ end = 10000, suffix = "+", duration = 2000, formatAsK = true }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp = null;
          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easedProgress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  const displayValue = formatAsK
    ? count >= 10000
      ? "10k"
      : count >= 1000
      ? `${(count / 1000).toFixed(1)}k`
      : count
    : count.toLocaleString();

  return (
    <span ref={nodeRef} className="inline-block font-data font-bold">
      {displayValue}{suffix}
    </span>
  );
}

export default AnimatedCounter;
