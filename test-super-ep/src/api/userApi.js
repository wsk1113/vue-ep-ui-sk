import axios from "axios";
import { doGet, doDelete, doPut, doPost } from "./service/crud";

/* 获取正在热映列表 */
export async function getUsers() {
  // localhost:5173/api/film/0 => vite会将该地址代理到localhost:8173/film/0
  const { msg, arr: users } = await doGet(`/user/0`);
  return users;
}
