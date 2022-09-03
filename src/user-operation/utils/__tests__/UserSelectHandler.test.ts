import { UserSelectHandler } from "../UserSelectHandler";

test("正确的修改user-select，及恢复", () => {
  const { restore, modify,modifiedHTMLElements } = new UserSelectHandler();
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.style.setProperty("user-select", "none");
  modify(p);
  modify(div);
  expect(p).toHaveStyle("user-select:text");
  expect(p.style.getPropertyPriority("user-select")).toBe("important");
  expect(div).toHaveStyle("user-select:text");
  expect(div.style.getPropertyPriority("user-select")).toBe("important");
  expect(modifiedHTMLElements.size).toBe(2)
  restore();
  expect(p.style.getPropertyValue("user-select")).toBe("none");
  expect(p.style.getPropertyPriority("user-select")).toBe("");
  expect(div.style.getPropertyValue("user-select")).toBe("");
  expect(modifiedHTMLElements.size).toBe(0)
});
