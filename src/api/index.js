import request from '../utils/request';

export const fetchList = (url,query) => {
    return request({
        url: url,
        method: 'get',
        params: query
    });
};
