import { useState, useCallback, useMemo, useRef } from "react";
/**
 * 该部分主要封装的是一个订阅监听器，用于处理用户产生的 loading 状态相关逻辑
 */
export function useLoadedObserver() {
  const [isLoading, setIsLoading] = useState(false);
  const loadingSet: Set<string> = useMemo(() => new Set(), []);
  const loadedCallbackRef = useRef<() => void>();

  const subscribe = useCallback(
    (callback: () => void) => {
      const _fn = function _fn() {
        setIsLoading(false);
        callback();
      };

      //loading则延迟执行
      if (loadingSet.size) {
        setIsLoading(true);
        return (loadedCallbackRef.current = _fn);
      }
      //否则，立刻执行
      _fn();
    },
    [loadingSet]
  );
  const dispatch = useCallback(() => {
    loadedCallbackRef.current?.();
    loadedCallbackRef.current = undefined;
  }, []);
  return {
    isLoading,
    loadingSet,
    dispatch,
    subscribe,
  };
}
