import React, { useEffect, useCallback } from "react";
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

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={onChange}>
      <Tab.List>
        <Tab>基础配置</Tab>
        <Tab>单词配置</Tab>
        <Tab>短语配置</Tab>
        <Tab>句子配置</Tab>
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
  );
});
