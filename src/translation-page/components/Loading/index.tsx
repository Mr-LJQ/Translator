import React from "react";
import classJoin from "classnames";
/**
 * 一个展示loading状态的组件
 */
export const Loading = React.memo(function Loading(props: {
  className: string;
}) {
  const { className } = props;
  return (
    <div
      title="loading..."
      className={classJoin(
        `
        inline-flex
        flex-col
        items-center
        justify-center
        px-4 py-2
        font-bold
        leading-6 
        text-sm 
        shadow 
        rounded-md 
        text-white 
        bg-white/70
        transition 
        ease-in-out 
        duration-150 
        cursor-not-allowed
        select-none
      `,
        className
      )}
    >
      <svg
        className=" animate-spin h-10 w-10  text-blue-700 "
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
});