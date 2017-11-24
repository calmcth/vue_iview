import axios from 'axios';


/**
 * 
 * @param str MD5
 */
/*let MD5Encrypt = (str) => {
    return CryptoJS.MD5(str);
};*/
/*--服务类AJAX-Promise--*/
class Promise {
    constructor() {

    }
    /**
     * 
     * @param type 类型 get/post
     * @param url  接口地址 /add/1
     * @param param 接口接收的参数 {}
     */
     static resource(type, url, param = {}) {

        let ApiPath = applicationConfig.apiPath;
        let BaseUrl = `${ApiPath}${url}`;
        return axios({
            method: type,
            url: BaseUrl,
            timeout: 3000,
            params: param
        }).then((response) => {

            return response.data;
        }, () => {

        }).catch(function (error) {
            console.log(error);

        })
    }

    static res(type, service_id, param = {},plains = false){

        let ApiPath = applicationConfig.apiPath;
        let contentBody = {
            service_id : service_id,
            app_type   : applicationConfig.app_type,
            ver_name   : applicationConfig.ver_name,
            sign :JSON.stringify(param),
            content: param
        };
        return axios({
            method: type,
            url: ApiPath,
            timeout: 3000,
            params: {content:JSON.stringify(contentBody)}
        }).then((response) => {

            let ress = JSON.parse(response.data);
            return ress;
        }, () => {
            console.log('失败');

        }).catch(function (error) {
            console.log(error);

        })
    }
}

export default Promise;