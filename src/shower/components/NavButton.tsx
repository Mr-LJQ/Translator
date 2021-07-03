import React from "react";
import classnames from "classnames";

interface NavButtonProps {
  backward: () => void;
  forward: () => void;
}
function NavButton(props: NavButtonProps) {
  const { backward, forward } = props;
  return (
    <footer className="h-4">
      <div className="fixed left-0 bottom-0 w-12 bg-gray-50 rounded">
        <Button className="float-left" onClick={backward}>
          {"<"}
        </Button>
        <Button className="float-right" onClick={forward}>
          {">"}
        </Button>
      </div>
    </footer>
  );
}

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

/**
 * 纯组件
 */
function Button(props: ButtonProps) {
  const { children, className, ...other } = props;
  return (
    <button
      {...other}
      className={classnames(
        className,
        "hover:bg-blue-300 select-none bg-transparent font-bold text-xl border-none h-6 w-6 outline-none focus:outline-none"
      )}
    >
      {children}
    </button>
  );
}

export default NavButton;
