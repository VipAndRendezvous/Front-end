import React from "react";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="btn-basic"
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "70px",
        right: "300px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
      }}
    >
      <svg
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_2034_594)">
          <circle cx="26" cy="26" r="26" fill="#FFF741" />
          <path d="M14 32L26 20L38 32" stroke="black" />
        </g>
        <defs>
          <clipPath id="clip0_2034_594">
            <rect width="52" height="52" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default ScrollToTopButton;
