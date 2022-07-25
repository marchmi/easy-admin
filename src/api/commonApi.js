import request from '../utils/request';
// restful api 的统一增删改查方法，结合配置文件可更方便的管理接口信息

// 查询指定的数据列表 获取书籍分类
export const fetchList = ( query , $config = {} ) => {
  return request({
    url: `/categories`,
    method: 'get',
    params: query,
    $config // 针对请求处理的一些配置信息
  });
};

// ...