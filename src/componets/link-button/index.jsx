import React from "react";
import "./index.less";

/**
 * 通用的看起来像链接的 button 组件
 */
export default function LinkButton(props) {
  return <button {...props} className="link-button"></button>;
}
