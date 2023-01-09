import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import PersonalizedForm from './PersonalizedForm';
import { message, notification, Modal } from "antd";

// 登录接口
import { createAccount } from "./api/asset";

const openNotification = (title, message) => {
    notification.open({
        message: title,
        description: message,
        duration: null,
    });
};

const App = ({ type, ...props }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [funstate, setFunstate] = useState({});
    // const [messageApi, contextHolder] = message.useMessage();
    const [token, setToken] = useState('');
    const generateUUID = () => {
        let d = new Date().getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
    }
    const submit = (params, { history }) => {
        // const submit = (params) => {
        // 执行注册/登录时会触发此方法，所有参数在 params 中
        // ...
        console.log(params, '====参数');
        return new Promise((resolve, reject) => {
            //存储resolve方法到留资弹框
            setFunstate({
                stateTest: resolve, isModalFn: function () {
                    setIsModalOpen(false)
                }
            })
            let loginForm = {
                "id": generateUUID(),
                "loginName": params.loginName,
                "password": props.Encrypt && props.Encrypt(params.password),
                "channel": "web",
                "register_type": 0
            }
            let queryParams = {
                code: params.captcha,
                imageCode: params.imageCode
            }
            createAccount(queryParams, loginForm)
                .then((res) => {
                    // const login = {
                    //     success: true,
                    //     token: res.data.tokenInfo,
                    // };
                    console.log(res, '===注册成功')
                    // setToken(login)
                    //判断是否有需要跳转留资接口
                    // if (res?.data?.endNodeResult?.needMessage) {
                    //     setIsModalOpen(true)
                    // } else {
                    //     resolve(login);
                    // }
                })
                .catch((err) => {
                    console.log(err, '===注册失败');
                    if (err.data.code == 100000017) {
                        message.error('图片验证码校验失败');
                    }
                    reject(err)
                });

        });
    };
    useEffect(() => {
        props.bindSubmit(submit); // 绑定监听方法
        console.log("登录覆盖已绑定");
    }, []);

    let Comp = () => <> <Modal title="" open={isModalOpen} width='100%' footer={null}>
        <PersonalizedForm funstate={funstate} token={token}></PersonalizedForm>
    </Modal></>;
    return <Comp {...props} />;
};

App.propTypes = {
    type: PropTypes.string,
    bindSubmit: PropTypes.func,
    history: PropTypes.object,
    Encrypt: PropTypes.func
};

export default App;
