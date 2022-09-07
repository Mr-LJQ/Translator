import React, { useState, useCallback, useEffect } from "react";
import classJoin from "classnames";
import { setStorage } from "@/extensions-api";
import { LoadingMask } from "@/translation-page";
import { Button } from "../pure-components";
import { useAnkiStore, ankiStoreSubscribe, getStorage } from "../stores";

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
  //处理错误信息
  const [displayAlert, setDisplayAlert] = useState(false);
  const [displayPoint, setDisplayPoint] = useState(true);
  //如果 alertMessages 发生了改变，则红点重新出现
  const alertMessagesString = alertMessages.toString();
  useEffect(() => {
    setDisplayPoint(true);
  }, [alertMessagesString]);
  return (
    <>
      {(isRefreshing || isSaving) && (
        <LoadingMask className="absolute inset-0 z-50" />
      )}
      {displayAlert && (
        <AlertMessage
          messages={alertMessages}
          setDisplayAlert={setDisplayAlert}
        />
      )}
      <footer
        className="
          flex 
          items-center 
          justify-between 
          mt-1
          pt-1.5 
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
          <span id="connectionStatus">连接状态</span>：
          <span
            className={classJoin({
              "text-red-600": !connected,
            })}
          >
            {connected ? "已连接" : "未连接"}
          </span>
        </p>
        {!isNil && (
          <div
            className="relative inline-flex"
            onClick={() => {
              setDisplayPoint(false);
              setDisplayAlert(true);
            }}
          >
            <button
              type="button"
              className="
                w-16
                p-1 m-1
                rounded
                text-center
                text-red-600 
                shadow 
                ring-1 
                ring-slate-900/10
                cursor-pointer 
              "
            >
              错误
            </button>
            {displayPoint && (
              <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                <span className="animate-ping absolute h-3 w-3 rounded-full bg-red-500 opacity-75"></span>
                <span className="rounded-full h-3 w-3 bg-red-600"></span>
              </span>
            )}
          </div>
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

function AlertMessage(props: {
  messages: string[];
  setDisplayAlert: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { messages, setDisplayAlert } = props;
  return (
    <>
      <div
        className="absolute inset-0 z-10 bg-black/60"
        onClick={() => {
          setDisplayAlert(false);
        }}
      ></div>
      <ul className="absolute inset-0 m-auto z-20 bg-white w-10/12 h-5/6 rounded-lg p-2 overflow-auto">
        {messages.map((item) => {
          return (
            <li
              key="item"
              className="flex items-center border-b text-black pb-1 border-black mb-2"
            >
              <span className="ri-error-warning-line text-red-600 text-2xl w-7" />
              <p className="whitespace-pre text-xs border-l pl-1 ">{item}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
