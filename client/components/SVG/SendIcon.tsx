import * as React from "react";
import { SVGProps } from "react";
const SendIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 4 3 11l7 3M20 4l-7 17-3-7M20 4 10 14"
    />
  </svg>
);
export default SendIcon;
