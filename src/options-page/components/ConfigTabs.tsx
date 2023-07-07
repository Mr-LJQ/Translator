import React, { useEffect, useCallback } from "react";
import classJoin from "classnames";
import { Tab } from "@headlessui/react";
import { ConfigType } from "../types";
import { AnkiConfig } from "./AnkiConfig";
import { useStorageStore } from "../stores";
import { BasisConfig } from "./BasisConfig";
import { ContactAuthor } from "./ContactAuthor";
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
    [TabPanelName.Author]: 4,
  }[checkedTabPanel];

  const classNameCallback = useCallback(
    ({ selected }: { selected: boolean }) => {
      return classJoin(
        {
          "prior:text-[#3872e0] prior:bg-[#3872e014]": selected,
        },
        `
          h-12
          rounded-lg
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
    <div className="flex flex-row  flex-1">
      <Tab.Group onChange={onChange} selectedIndex={selectedIndex} vertical>
        <Tab.List className="flex w-52 border-r-4 border-r-gray-200 flex-col border-b mb-0">
          <Tab className={classNameCallback}>通用</Tab>
          <Tab className={classNameCallback}>单词配置</Tab>
          <Tab className={classNameCallback}>短语配置</Tab>
          <Tab className={classNameCallback}>句子配置</Tab>
          <Tab className={classNameCallback} style={{ marginTop: "auto" }}>
            联系作者
          </Tab>
        </Tab.List>
        <Tab.Panels className="flex-1">
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
          <Tab.Panel>
            <ContactAuthor />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
});
