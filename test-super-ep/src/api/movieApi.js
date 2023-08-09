import axios from "axios";
import { doGet, doDelete, doPut, doPost } from "./service/crud";

/* 获取正在热映列表 */
export async function getPlayings() {
  // localhost:5173/api/film/0 => vite会将该地址代理到localhost:8173/film/0
  const { arr: films } = await doGet(`/film/0`);
  return films;
}

/* 获取正在热映列表 */
export async function getComings() {
  // localhost:5173/api/film/0 => vite会将该地址代理到localhost:8173/film/0
  const { arr: films } = await doGet(`/coming/0`);
  return films;
}

/* 获取影片详情 */
export async function getDetail(id) {
  const {
    arr: [detail],
  } = await doGet(`/film/${id}`);
  return detail;
}

/* 删除影片 */
// async函数的返回值是Promise对象
export async function deletePlaying(id) {
  const {
    msg,
    data: { deletedCount },
  } = await doDelete(`/film/${id}`);

  // return相当于Promise在履约
  return { msg, deletedCount };
}

/* 删除影片 */
// async函数的返回值是Promise对象
export async function deleteComing(id) {
  const {
    msg,
    data: { deletedCount },
  } = await doDelete(`/coming/${id}`);

  // return相当于Promise在履约
  return { msg, deletedCount };
}

/* 更新影片 */
// async函数的返回值是Promise对象
export async function updatePlaying(id, data) {
  const {
    msg,
    data: { modifiedCount },
  } = await doPut(`/film/${id}`, data);

  // return相当于Promise在履约
  return { msg, modifiedCount };
}

/* 添加影片 */
// async函数的返回值是Promise对象
export async function addPlaying(playing) {
  const {
    msg,
    result: { insertedId },
  } = await doPost(`/film/0`, playing);

  // return相当于Promise在履约
  return { msg, insertedId };
}
