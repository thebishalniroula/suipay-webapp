import React from "react";

const ArrowSlanted = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="25"
      viewBox="0 0 26 25"
      fill="none"
      {...props}
    >
      <path
        d="M19.3057 6.14738L9.40625 16.0469"
        stroke="#7E7AF2"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.22889 8.8004L9.40567 16.0482L16.6535 16.225"
        stroke="#7E7AF2"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowSlanted;
