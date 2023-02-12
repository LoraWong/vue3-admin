import requestFeature from '@/utils/request-feature'

export function login(username, password) {
  return requestFeature.post('/admin/login', {
    username,
    password
  })
}
