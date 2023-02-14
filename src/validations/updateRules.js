
//更新个体数据校验
export default {
    username: [
        {
            required: true,//必填(
            message: '用户名不能为空',//验证提示
            trigger: 'blur'//失去焦点时
        },
        {
            min: 6,
            max: 16,
            message: '用户名长度必须6-16',
            trigger: 'blur'//失去焦点时
        },
    ],
    password: [{
        required: true,//必填(
        message: '密码不能为空',//验证提示
        trigger: 'blur'//失去焦点时
    },
        {
            min: 6,
            max: 16,
            message: '密码长度必须6-16',
            trigger: 'blur'//失去焦点时
        },],
    email: [
        {
            required: true,//必填(
            message: '邮箱不能为空',//验证提示
            trigger: 'blur'//失去焦点时
        },
        {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
        },
    ]
}