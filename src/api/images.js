import requestFeature from '@/utils/request-feature'

/**
 * @description: 获取图片分类
 * @param {*} page
 */
export function getImageClassList(page) {
  return requestFeature.get('/admin/image_class/' + page)
}

export function createImageClass(data) {
  return requestFeature.post('/admin/image_class', data)
}

export function updateImageClass(id, data) {
  return requestFeature.post('/admin/image_class/' + id, data)
}

export function deleteImageClass(id) {
  return requestFeature.post(`/admin/image_class/${id}/delete`)
}

/**
 * @description: 获取图片
 */
export function getImageList(id, page = 1) {
  return requestFeature.get(`/admin/image_class/${id}/image/${page}`)
}

export function updateImage(id, name) {
  return requestFeature.post(`/admin/image/${id}`, { name })
}

export function deleteImage(ids) {
  return requestFeature.post(`/admin/image/delete_all`, { ids })
}

// 图片上传接口地址
export const uploadImageAction =
  process.env.VUE_APP_FEATURE_API + '/admin/image/upload'
