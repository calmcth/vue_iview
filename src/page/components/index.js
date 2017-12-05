import {xfdLabel} from './label';

const iview={
    xfdLabel
};

const install=function (Vue) {
  Object.keys(iview).forEach((key)=>{
      Vue.component(key,iview[key]);
  });
};

if(typeof window !=='undefined' && window.Vue){
    install(window.Vue);
}

export default install;
