<style>
@import "../../style/login.css";
</style>
<template>
  <div class="loginDiv">
    <Form ref="formInline" :model="formInline" :rules="ruleCustom" class="loginFrom">
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="密码">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')"  style="float: right;">登录</Button>
      </FormItem>
    </Form>
  </div>

</template>
<script>
   import {Tool,LocalStorage} from '../../utilities/index';
    export default {
        data () {
            const validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                    return
                } else {
                    if (this.formInline.password !== '') {
                        // 对密码框进行验证
                        this.$refs.formInline.validateField('password');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空，请输入密码'));
                }else if(this.formInline.user === ''){
                    this.$refs.formInline.validateField('user');
                } else if(this.formInline.user !== '' && value !== ''){
                    let msg=this.verificationUser(this.formInline);
                    if(msg!==''){
                        callback(new Error(msg));
                    }else {
                        callback();
                    }
                }
            };
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleCustom: {
                    user: [
                        { validator: validateUser, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            verificationUser(params){
                this.$store.dispatch('verificationUser',params);
                return this.$store.state.msg;
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if(LocalStorage.get("SimUserInfo_")===null){
                            LocalStorage.remove("SimUserInfo_");
                            LocalStorage.add("SimUserInfo_",{
                                userName:this.$store.state.userName,
                            });
                        }
                        Tool.push({path:"/"})
                    } else {
                        this.$Message.error('登录失败!');
                    }
                })
            }
        }
    }
</script>
