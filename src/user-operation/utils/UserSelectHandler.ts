const USER_SELECT = "user-select";

export class UserSelectHandler {
  modifiedHTMLElements: Map<HTMLElement, [string, string]> = new Map();
  modify = (element: HTMLElement) => {
    const modifiedHTMLElements = this.modifiedHTMLElements;
    if (!modifiedHTMLElements.has(element)) {
      const userSelectValue = element.style.getPropertyValue(USER_SELECT);
      const userSelectPriority = element.style.getPropertyPriority(USER_SELECT);
      modifiedHTMLElements.set(element, [userSelectValue, userSelectPriority]);
      element.style.setProperty(USER_SELECT, "text", "important");
    }
  };
  restore = () => {
    const modifiedHTMLElements = this.modifiedHTMLElements;
    modifiedHTMLElements.forEach(function ([value, priority], element) {
      element.style.setProperty(USER_SELECT, value, priority);
    });
    modifiedHTMLElements.clear();
  };
}
