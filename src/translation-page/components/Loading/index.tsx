import React from "react";
import classJoin from "classnames";

interface Props {
  color?: string;
  size?: number;
  className?: string;
}
/**
 * 一个展示loading状态的组件
 */
export const Loading = React.memo(function Loading(props: Props) {
  const { color, size = 20, className } = props;
  return (
    <span role="img" aria-label="loading" className={className}>
      <svg
        style={{ color, height: size, width: size }}
        className=" animate-spin text-blue-700"
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
    </span>
  );
});

/**
 * 为便于使用，添加了一些预定义的样式类型
 */
export const LoadingMask = React.memo(function LoadingWrapper(props: Props) {
  const { className, color = "white", size = 40 } = props;
  return (
    <Loading
      className={classJoin(
        "flex items-center justify-center bg-black/30 cursor-not-allowed select-none",
        className
      )}
      color={color}
      size={size}
    />
  );
});
