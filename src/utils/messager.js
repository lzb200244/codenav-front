import {ElMessage, ElNotification} from 'element-plus';

const message = (message, type = 'success', showClose, grouping) => ElMessage({
    showClose: showClose,
    message: message || '请求失败',
    type: type,
    grouping: grouping,
    duration: 2000,
    customClass: 'el-message__icon__' + type,
    dangerouslyUseHTMLString: true
})

export const Notification = (message, title, type = 'success',) => {
    ElNotification({
        title: title,
        message: message || '请求失败',
        type: type,
        dangerouslyUseHTMLString: true,
    })
}
export default message

