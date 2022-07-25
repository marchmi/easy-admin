import request from '../utils/request';
// restful api 的统一增删改查方法，结合配置文件可更方便的管理接口信息

// 查询数据列表
export const fetchList = ( modulePath, query , $config = {} ) => {
  return request({
    url: `/${modulePath}`,
    method: 'get',
    params: query
  });
};

// 查询单挑数据详情
export const fetchDetail = ( modulePath, id ) => {
  return request({
    url: `/${modulePath}/${id}`,
    method: 'get'
  });
};

// 新增数据
export const createOne = ( modulePath, body ) => {
  return request({
    type: 'put',
    url: `/${modulePath}`,
    body
  })
}

// 更新数据
export const updateOne = ( modulePath, body ) => {
  return request({
    type: 'patch',
    url: `/${modulePath}`,
    body
  })
}

// 更新数据
export const deleteOne = ( modulePath, id ) => {
  return request({
    type: 'delete',
    url: `/${modulePath}/${id}`,
    body
  })
}