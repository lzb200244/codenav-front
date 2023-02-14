//bs加密与解密
const bs64Encode = (str) => {
    return window.btoa(str)
}
const bs64Decode = (str) => {
    return window.atob(str)

}
export default () => {
    return {
        bs64Encode,
        bs64Decode
    }
}
