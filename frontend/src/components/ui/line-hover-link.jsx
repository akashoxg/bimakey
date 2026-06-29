import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const lineHoverStyles = `
.link-hover {
  cursor: pointer;
  position: relative;
  display: inline-flex;
  width: fit-content;
  white-space: nowrap;
  color: currentColor;
  text-decoration: none;
  outline: none;
}

.link-hover::before,
.link-hover::after {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  height: 2px;
  background: currentColor;
  pointer-events: none;
}

.link-hover::before {
  content: "";
}

.link-hover--slide::before {
  transform: scale3d(0, 1, 1);
  transform-origin: 100% 50%;
  transition: transform 0.3s ease;
}

.link-hover--slide:hover::before,
.link-hover--slide:focus-visible::before {
  transform: scale3d(1, 1, 1);
  transform-origin: 0% 50%;
}
`;

export const LineHoverLink = React.forwardRef(
  ({ variant = "slide", children, className, onClick, href, to, ...props }, ref) => {
    const target = to || href || "#";
    const isExternal = typeof target === "string" && (
      target.startsWith("http") || 
      target.startsWith("mailto:") || 
      target.startsWith("tel:") || 
      target.startsWith("#")
    );

    if (isExternal) {
      return (
        <>
          <style>{lineHoverStyles}</style>
          <a
            ref={ref}
            href={target}
            onClick={onClick}
            className={cn("link-hover", `link-hover--${variant}`, className)}
            {...props}
          >
            <span>{children}</span>
          </a>
        </>
      );
    }

    return (
      <>
        <style>{lineHoverStyles}</style>
        <Link
          ref={ref}
          to={target}
          onClick={onClick}
          className={cn("link-hover", `link-hover--${variant}`, className)}
          {...props}
        >
          <span>{children}</span>
        </Link>
      </>
    );
  }
);

LineHoverLink.displayName = "LineHoverLink";

export default LineHoverLink;
