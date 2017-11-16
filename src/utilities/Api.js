import promise from './Promise';
import axios from 'axios';
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
    /*queryContent:()=>{
        return promise.res('post', 'cwgjerp_3.0.0_login',
            {username:'111',password:'22'},true);
    }*/
}

export default BaseApi;