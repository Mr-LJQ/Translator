import { setBadgeText } from "@/extensions-api";
export function switchBadgeText(isOpen: boolean) {
  isOpen
    ? setBadgeText({
        text: "",
      })
    : setBadgeText({
        text: "off",
      });
}
