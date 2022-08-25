import React from "react";
import classJoin from "classnames";
import { Switch } from "@headlessui/react";

interface Props {
  title: string;
  children: string;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}

export default React.memo(function Component(props: Props) {
  const { children, enabled, setEnabled, title } = props;
  return (
    <Switch.Group>
      <div className="flex items-center justify-between p-1" title={title}>
        <Switch.Label className="text-lg">{children}</Switch.Label>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`
            relative
            inline-flex 
            h-8  w-20 
            items-center 
            justify-between  
            rounded-full  
            font-bold  
            bg-gray-600  
            focus:outline-none  
            focus:ring-2  
            focus:ring-offset-2  
            focus:ring-offset-slate-50  
            select-none  
            cursor-pointer 
          `}
        >
          <span
            aria-hidden={!enabled}
            className="
            float-left
            duration-500
            transition-colors
            pl-3
          text-gray-50
          prior:text-green-viridity
           "
          >
            开
          </span>
          <span
            aria-hidden={enabled}
            className=" float-right pr-3 text-gray-50  "
          >
            关
          </span>
          <span
            aria-hidden="true"
            className={classJoin(
              {
                "prior:left-8 prior:bg-green-viridity": enabled,
              },
              ` absolute
                left-0
                w-10 h-6 
                m-1 rounded-full
                bg-white 
                transition-all
              `
            )}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
});
