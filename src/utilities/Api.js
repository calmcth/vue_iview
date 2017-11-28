import promise from './Promise';
/**
 * 整站API模块
 */

const BaseApi = {
	/**
	 * 查询接口
	 */
   queryNavList:()=>{
        return promise.resource('get', '/static/config/navList.json');
   }
};

export default BaseApi;