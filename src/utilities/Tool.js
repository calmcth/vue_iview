import router from "../router/index";
/*--服务类AJAX--*/
function likeArray(obj) { return typeof obj.length == 'number' }
/*-工具类-*/
export default class Tool {
    constructor() { }
    static push (opts={}){
        if (opts.path.indexOf('http') != -1) {
            window.location.href = url;
            return false;
        }
        router.push({ path: opts.path,params: opts.params,query:opts.query });
    }

    static replace(opts={}){
        if (opts.path.indexOf('http') != -1) {
            window.location.href = url;
            return false;
        }
        router.replace({ path: opts.path,params: opts.params,query:opts.query });
    }
    /**
     * 设置标题页
     */
    static setTitle(title) {
        document.title = title ? title : '';
        var mobile = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(mobile)) {
            var iframe = document.createElement('iframe');
            iframe.style.visibility = 'hidden';
            iframe.setAttribute('src', '');
            var iframeCallback = function () {
                setTimeout(function () {
                    iframe.removeEventListener('load', iframeCallback);
                    document.body.removeChild(iframe);
                }, 0);
            };
            iframe.addEventListener('load', iframeCallback);
            document.body.appendChild(iframe);
        }
    }
    /**
     * 多个对象合并
     */
    static assign(...args) {
        /*if(Object.assign){
         return Object.assign({},...args)
         }*/
        let from,
            target = args[0] || {},
            length = args.length;
        for (let i = 0; i < length; i++) {
            if ((from = args[i]) != null) {
                for (let key in from) {
                    target[key] = from[key];
                }
            }
        }
        return target;
    }

    static each(elements, callback) {
        let i, key;
        //如果是数组
        if (likeArray(elements)) {
            for (i = 0; i < elements.length; i++) {
                if (callback.call(elements[i], i, elements[i]) === false) return elements
            }
        } else {
            for (key in elements)
                if (callback.call(elements[key], key, elements[key]) === false) return elements
        }
        return elements
    }
    /**
     * 获取?后面所有参数
     */
    static getUrlParams() {
        let url = window.location.search;
        let theRequest = new Object();
        if (url.indexOf("?") != -1) {
            let str = url.substr(1);
            let strs = str.split("&");
            for (let i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    }
    /**
     * 简易的内置验证
     */
    static verifier(verifier) {
        let key = { isOk: true, tips: '' };
        verifier.forEach(function (item, index) {
            if (item.value.toString().trim().length <= 0) {
                key = { isOk: false, tips: item.tips };
                return false;
            }
        })
        return key;
    }

    //返回?后面指定的参数
    static getQueryString(Paras){
        return this.getUrlParams()[Paras]
    }
}