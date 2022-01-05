const cookieCutter = require("cookie-cutter");

export default function setLogoutCookies() {
  cookieCutter.set("token", -1, {path: "/", expires: new Date(0)});
  cookieCutter.set("id", -1, {path: "/", expires: new Date(0)});
}
