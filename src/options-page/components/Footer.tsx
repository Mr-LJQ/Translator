import React, { useState, useCallback } from "react";
import classJoin from "classnames";
import { useAnkiStore, ankiStoreSubscribe, getStorage } from "../stores";
import { setStorage } from "@/extensions-api";
import { Loading } from "@/translation-page";
import { Button } from "../pure-components";
export const Footer = React.memo(function Footer() {
  const version = useAnkiStore((state) => state.version);
  const alertMessages = useAnkiStore((state) => state.alertMessages);
  const fetchAnki = useAnkiStore((state) => state.fetchAnki);
  const isNil = alertMessages.length === 0;
  const connected = version != null;
  //刷新操作

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(
    function () {
      if (isRefreshing) return;
      setIsRefreshing(true);
      fetchAnki();
      const unsubscribe = ankiStoreSubscribe(() => {
        unsubscribe();
        setIsRefreshing(false);
      });
    },
    [isRefreshing, fetchAnki]
  );
  //处理保存
  const [isSaving, setIsSaving] = useState(false);
  const saveOptions = useCallback(
    function () {
      if (isSaving) return;
      setIsSaving(true);
      const storage = getStorage();
      setStorage(storage, () => {
        setTimeout(function () {
          setIsSaving(false);
        }, 800);
      });
    },
    [isSaving]
  );
  return (
    <>
      {(isRefreshing || isSaving) && (
        <Loading className="absolute inset-0 z-50" />
      )}
      <footer
        className="
          flex 
          items-center 
          justify-between 
          mt-1 
          border-t 
          border-dashed 
          border-gray-600 
          overflow-hidden
        "
      >
        <Button
          type="button"
          onClick={refresh}
          title="如果 anki 发生改变,则可以按下该按钮进行刷新，以同步anki更改"
        >
          刷新
        </Button>
        <p
          role="status"
          aria-labelledby="connectionStatus"
          className="p-1 mr-1 text-sm flex-1"
        >
          <span id="connectionStatus">连接状态</span>
          <span
            className={classJoin({
              "text-red-500": !connected,
            })}
          >
            {connected ? "已连接" : "未连接"}
          </span>
        </p>
        {!isNil && (
          <p
            tabIndex={0}
            className=" px-1 py-0.5 mr-1 text-sm text-red-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 warning-message "
          >
            警告信息
          </p>
        )}
        <Button type="button" onClick={saveOptions}>
          保存
        </Button>
        <Button type="button" onClick={window.close}>
          退出
        </Button>
      </footer>
    </>
  );
});
