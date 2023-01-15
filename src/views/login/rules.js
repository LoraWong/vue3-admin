// 登录表单验证
import i18n from '@/i18n'
export const validatePassword = () => {
  // element 表单校验函数，具体去看文档
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule'))) // '密码不能少于6位'
    } else {
      callback()
    }
  }
}
