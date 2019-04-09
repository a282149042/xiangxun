import request from '@/utils/request'

export function getList(params) {
  // 列表
  return request({
    url: params.fetchUrl,
    method: 'post',
    data: params.listQuery
  })
}