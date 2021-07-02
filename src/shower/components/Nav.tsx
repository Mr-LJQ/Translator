import React from "react";

interface Props {
  backward:() => void
  forward:() =>void
}
function Nav(props: Props) {
  const {backward,forward} = props
  return (
    <footer className="h-4">
      <div className="fixed left-0 bottom-0 w-12 bg-gray-50 rounded">
        <button className="button float-left" onClick={backward}>
          {"<"}
        </button>
        <button className="button float-right" onClick={forward}>
          {">"}
        </button>
      </div>
    </footer>
  );
}

export default Nav;
