import React from 'react';

interface ICheckProps {
  disabled?: boolean;
}

const Check = ({ disabled }: ICheckProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M7 13.4L3 9.4L4.4 8L7 10.6L13.6 4L15 5.4L7 13.4Z"
      fill={disabled ? '#A8A8AD' : '#fff'}
    />
  </svg>
);

export { Check };
