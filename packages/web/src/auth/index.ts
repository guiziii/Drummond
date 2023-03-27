import { GetUserLS } from "../storage";

export default function isAuthenticated() {
  if (GetUserLS()) return true;
  return false;
}
