//推荐功能的rules
export default {
    name: [
        {
            required: true,//必填(
            message: '网站的名称必须要填',//验证提示
            trigger: 'blur'//失去焦点时
        },
        {
            max: 16,
            message: '不必太长',
            trigger: ['change',]//失去焦点时
        },
    ],
    site_url: [
        {
            required: true,//必填(
            message: '请输入网站地址',//验证提示
            trigger: 'blur'//失去焦点时
        },
        {
            type: 'url',
            required: true,//必填(
            message: '请输入正确地址',//验证提示
            trigger: ['blur', 'change']//失去焦点时
        },
    ],
    introduce: [
        {
            required: false,//必填(
            message: '推荐理由(选填)',//验证提示
            trigger: 'blur'//失去焦点时
        },
    ],

    datatype: [
        {
            required: true,//必填(
            message: '所属类型',//验证提示
            trigger: 'blur'//失去焦点时
        }
    ]
}