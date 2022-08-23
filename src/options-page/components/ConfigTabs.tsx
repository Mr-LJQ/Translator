import React, { useEffect, useCallback } from "react";
import classJoin from "classnames";
import { Tab } from "@headlessui/react";
import { ConfigType } from "../types";
import { AnkiConfig } from "./AnkiConfig";
import { useStorageStore } from "../stores";
import { BasisConfig } from "./BasisConfig";
import { onStorageChange, setStorage, TabPanelName } from "@/extensions-api";
export const ConfigTabs = React.memo(function ConfigTabs() {
  const checkedTabPanel = useStorageStore((state) => state.checkedTabPanel);
  const update = useStorageStore((state) => state.updateOtherConfig);
  useEffect(
    function () {
      return onStorageChange({
        checkedTabPanel: (_, val) => {
          update("checkedTabPanel", val);
        },
      });
    },
    [update]
  );

  const onChange = useCallback(function (key: TabPanelName) {
    setStorage({
      checkedTabPanel: key,
    });
  }, []);

  const selectedIndex = {
    [TabPanelName.Home]: 0,
    [TabPanelName.Word]: 1,
    [TabPanelName.Phrase]: 2,
    [TabPanelName.Sentence]: 3,
  }[checkedTabPanel];

  const classNameCallback = useCallback(
    ({ selected }: { selected: boolean }) => {
      return classJoin(
        {
          "prior:text-red-600 prior:border-red-600 prior:border-b-2": selected,
        },
        `
          mt-1 mx-2 
          px-2 
          first:ml-0
          font-bold text-base
          text-gray-600 
          cursor-pointer 
          flex-shrink-0
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-offset-slate-50
        `
      );
    },
    []
  );

  return (
    <div className="flex-1">
      <Tab.Group onChange={onChange} selectedIndex={selectedIndex}>
        <Tab.List className="flex justify-around border-b mb-0">
          <Tab className={classNameCallback}>基础配置</Tab>
          <Tab className={classNameCallback}>单词配置</Tab>
          <Tab className={classNameCallback}>短语配置</Tab>
          <Tab className={classNameCallback}>句子配置</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <BasisConfig />
          </Tab.Panel>
          <Tab.Panel>
            <AnkiConfig configType={ConfigType.Word} />
          </Tab.Panel>
          <Tab.Panel>
            <AnkiConfig configType={ConfigType.Phrase} />
          </Tab.Panel>
          <Tab.Panel>
            <AnkiConfig configType={ConfigType.Sentence} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
});
