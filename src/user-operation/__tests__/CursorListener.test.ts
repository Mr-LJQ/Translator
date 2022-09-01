import { CursorListener } from "../CursorListener";

function moveMouse<T extends number>(a: T, b: T, c: T, d: T) {
  document.dispatchEvent(
    new MouseEvent("mousemove", {
      clientX: a,
      clientY: b,
      screenX: c,
      screenY: d,
    })
  );
}

test("正确实现功能", async () => {
  const { getClientPoint, getScreenPoint, install, uninstall } =
    new CursorListener();

  moveMouse(10, 20, 30, 40);
  expect(getClientPoint()).toEqual({ x: 0, y: 0 });
  expect(getScreenPoint()).toEqual({ x: 0, y: 0 });
  install();
  moveMouse(120, 130, 220, 230);
  expect(getClientPoint()).toEqual({ x: 120, y: 130 });
  expect(getScreenPoint()).toEqual({ x: 220, y: 230 });
  uninstall();
  moveMouse(50, 60, 70, 80);
  expect(getClientPoint()).toEqual({ x: 120, y: 130 });
  expect(getScreenPoint()).toEqual({ x: 220, y: 230 });
});
