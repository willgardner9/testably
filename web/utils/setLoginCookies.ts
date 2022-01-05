const cookieCutter = require("cookie-cutter");

export default function setLoginCookies(token: any, user: any) {
  cookieCutter.set("token", token.token, {path: "/"});
  cookieCutter.set("id", user.id, {path: "/"});
}
