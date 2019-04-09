import request from '@/utils/request'

export function login(account, password) {
  return request({
    url: '/sys/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

export function logout() {
  return request({
    url: '/sys/logout',
    method: 'post'
  })
}
