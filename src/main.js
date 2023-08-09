import BtnGroup from "./components/BtnGroup/index.js";
import EpDialog from "./components/EpDialog/index.js";
import EpTable from "./components/EpTable/index";
import EpMenu from "./components/menu/index";
// import MyPageHeader from "./components/MyPageHeader/index";

import { version } from "../package.json";

const components = [BtnGroup, EpDialog, EpTable, EpMenu];

/* app.use(SuperEpPlugin) 就会触发install(app) */
const install = function (app) {

   /* 把本库的所有组件都注册为全局组件 */
   components.forEach(component => {
      app.component(component.name, component);
   });
   
};

// if (typeof window !== "undefined" && window.Vue) {
//    install(window.Vue);
// }

/* 
export BtnGroup
export EpDialog
export EpTable
export EpMenu
*/
export { BtnGroup, EpDialog, EpTable, EpMenu };

/* 对外导出一个插件（一个带install方法的对象） */
const SuperEpPlugin = { version, install }
export default SuperEpPlugin;
