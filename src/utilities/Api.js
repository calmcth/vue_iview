import promise from './Promise';
/**
 * 整站API模块
 */

const BaseApi = {
	/**
	 * 查询接口
	 */
   queryContent:()=>{
    return promise.resource('get', 'api/fullconfig',
            {querystring1:'1'});
    }
};

export default BaseApi;