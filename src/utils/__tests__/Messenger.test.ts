//@ts-nocheck
import { Messenger } from "../Messenger";
jest.spyOn(window, "postMessage").mockImplementation((data) => {
  //因为在 jsdom 中 window.postMessage() 触发的 window.addEventlistener("message",({source})=>void 0)
  // source !== window,因而导致 测试无法进行，因此使用该 mock 替代。
  setTimeout(() => {
    window.dispatchEvent(
      new MessageEvent("message", {
        source: window,
        data,
      })
    );
  }, 200);
});

let messenger: Messenger;
beforeEach(() => {
  messenger = new Messenger({ self: window, target: window });
  jest.useFakeTimers();
});

afterEach(() => {
  messenger.uninstall();
  jest.runAllTimers();
  jest.useRealTimers();
});

test("this 是否正确绑定", () => {
  const {
    install,
    uninstall,
    postMessage,
    onMessage,
    addTarget,
    handleMessage,
  } = messenger;
  expect(() => {
    install();
    addTarget(window);
    handleMessage({ source: null, data: {} });
    onMessage(0, () => void 0);
    postMessage(0, "check sentence.");
    uninstall();
  }).not.toThrowError();
});

test("install / uninstall 功能测试", () => {
  const { install, uninstall, postMessage, onMessage } = messenger;
  const mockFn = jest.fn();
  onMessage(0, mockFn);
  postMessage(0, "message");
  jest.runAllTimers();
  expect(mockFn).toBeCalledTimes(0);
  install();
  postMessage(0, "message");
  jest.runAllTimers();
  expect(mockFn).toBeCalledWith("message", expect.any(Function));
  uninstall();
  postMessage(0, "message");
  jest.runAllTimers();
  expect(mockFn).toBeCalledTimes(1);
});

test("正确处理监听与取消监听", () => {
  const { install, postMessage, onMessage } = messenger;
  install();
  const mockFn = jest.fn();
  const mockFn1 = jest.fn();
  const mockFn2 = jest.fn();
  onMessage(0, mockFn);
  const remove1 = onMessage(0, mockFn1);
  const remove2 = onMessage(0, mockFn2);
  postMessage(0, "message");
  jest.runAllTimers();
  expect(mockFn).toBeCalledWith("message", expect.any(Function));
  expect(mockFn1).toBeCalledWith("message", expect.any(Function));
  expect(mockFn2).toBeCalledWith("message", expect.any(Function));
  remove1();
  postMessage(0, "message");
  jest.runAllTimers();
  expect(mockFn).toBeCalledTimes(2);
  expect(mockFn1).toBeCalledTimes(1);
  expect(mockFn2).toBeCalledTimes(2);
  remove1();
  remove2()
  postMessage(0, "message");
  jest.runAllTimers();
  expect(mockFn).toBeCalledTimes(3);
  expect(mockFn1).toBeCalledTimes(1);
  expect(mockFn2).toBeCalledTimes(2);
});

test("正确处理传递的消息", () => {
  const { install, postMessage, onMessage } = messenger;
  install();
  const mockFn = jest.fn();
  const callback = jest.fn();
  const mockFn1 = jest.fn();
  const callback1 = jest.fn();
  onMessage(0, (data, callback) => {
    mockFn(data);
    callback("reply 0");
  });
  onMessage(1, (data, callback) => {
    mockFn1(data);
    callback("reply 1");
  });
  postMessage(0, "message 0", callback);
  postMessage(1, "message 1", callback1);
  jest.runAllTimers();
  expect(mockFn).toBeCalledWith("message 0");
  expect(mockFn1).toBeCalledWith("message 1");
  jest.runAllTimers();
  expect(callback).toBeCalledWith("reply 0");
  expect(callback1).toBeCalledWith("reply 1");
});
