import { Notification } from "@@types/settings";

function areAllValuesY(obj: Notification) {
  return Object.values(obj).every((value) => value === "Y");
}
export default areAllValuesY;
