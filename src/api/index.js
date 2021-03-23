/*包含 n 个接口请求函数的模块 每个函数返回 promise */
import ajax from "./ajax";
import jsonp from "jsonp";

// 登陆
export const reqLogin = (username, password) =>
  ajax("/login", { username, password }, "POST");

export const reqWeather = (city) => {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
  return new Promise((resolve, reject) => {
    jsonp(url, { param: "callback" }, (error, response) => {
      if (!error && response.status === "success") {
        const { dayPictureUrl, weather } = response.results[0].weather_data[0];
        resolve({ dayPictureUrl, weather });
      } else {
        alert("获取天气信息失败");
      }
    });
  });
};

// 获取一级或某个二级分类列表
export const reqCategorys = (parentId) =>
  ajax("/manage/category/list", { parentId });
// 添加分类
export const reqAddCategory = (parentId, categoryName) =>
  ajax("/manage/category/add", { parentId, categoryName }, "POST");
// 更新品类名称
export const reqUpdateCategory = ({ categoryId, categoryName }) =>
  ajax("/manage/category/update", { categoryId, categoryName }, "POST");
