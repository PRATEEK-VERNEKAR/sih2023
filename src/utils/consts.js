import Cookies from "js-cookie";

export const USER_TOKEN = Cookies.get('userToken') ? Cookies.get('userToken') : null

export const DOMAIN = "http://localhost:3000"
// export const DOMAIN = "https://sih2023-prateek-vernekar.vercel.app"