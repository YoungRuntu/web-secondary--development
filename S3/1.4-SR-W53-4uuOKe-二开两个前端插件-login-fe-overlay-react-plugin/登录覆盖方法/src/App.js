import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { message, notification } from "antd";
import LoginPc from './loginPc'
import LoginMob from './mobile'

// 登录接口
import { loginAccount } from "./api/asset";
// const componentMap = {
//   PC: loginPc,
//   mobile: null
// };
const openNotification = (title, message) => {
  notification.open({
    message: title,
    description: message,
    duration: null,
  });
};

const App = ({ type, ...props }) => {
  const [equipment, setEquipment] = useState('PC')



  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setEquipment('mobile')
    } else {
      setEquipment('PC')
    }
  }, []);

  // let Comp = ({ props }) => {
  //   // console.log(props, '===11');
  //   const RenderComponent = componentMap[equipment];
  //   return <RenderComponent {...props} />
  // };
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return <LoginMob {...props} />
    setEquipment('mobile')
  } else {
    return <LoginPc {...props} />
  }


};

App.propTypes = {
  type: PropTypes.string,
  bindSubmit: PropTypes.func,
};

export default App;
