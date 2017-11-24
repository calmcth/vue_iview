<template>
    <div>
        <p>{{ $t("message.title") | text }} </p>
        <p>{{ title }} </p>
        <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem :label="$t('userInfo.name')" prop="name">
                <Input v-model="formValidate.name" placeholder="Enter your name"/>
            </FormItem>
            <FormItem :label="$t('userInfo.Email')" prop="mail">
                <Input v-model="formValidate.mail" placeholder="Enter your e-mail"/>
            </FormItem>
            <FormItem :label="$t('userInfo.city')" prop="city">
                <Select v-model="formValidate.city" placeholder="Select your city">
                    <Option value="beijing">New York</Option>
                    <Option value="shanghai">London</Option>
                    <Option value="shenzhen">Sydney</Option>
                </Select>
            </FormItem>
            <FormItem v-bind:label="$t('userInfo.date')">
                <FormItem prop="date">
                    <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                </FormItem>
            </FormItem>
            <FormItem label="性别" prop="sex">
                <RadioGroup v-model="formValidate.sex">
                    <Radio label="male">男</Radio>
                    <Radio label="female">女</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="爱好" prop="interest">
                <CheckboxGroup v-model="formValidate.interest">
                    <Checkbox label="Eat"> <span>吃</span></Checkbox>
                    <Checkbox label="Sleep"><span>睡</span></Checkbox>
                    <Checkbox label="Run"><span>跑步</span></Checkbox>
                    <Checkbox label="Movie"><span>看电影</span></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="签名" prop="desc">
                <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."/>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </i-form>
    </div>

</template>
<script>
    import {Tool,LocalStorage} from '../../utilities/index';
    export default {
        data () {
            let SimUserDetails_=LocalStorage.get("SimUserDetails_");
            return {
                formValidate:SimUserDetails_!==null?SimUserDetails_:{
                    name: LocalStorage.get("SimUserInfo_")!==null?LocalStorage.get("SimUserInfo_").userName:'',
                    mail: '',
                    city: '',
                    sex: '',
                    interest: [],
                    date: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '邮箱格式不符合要求', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: '请选择城市', trigger: 'change' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        LocalStorage.remove("SimUserDetails_");
                        LocalStorage.add("SimUserDetails_",this.formValidate);
                        this.$Message.success('保存成功！');
                    } else {
                        this.$Message.error('保存失败！!，请认真检查填写');
                    }
                })
            },
            handleReset (name) {
                this.formValidate={
                    name:'',
                    mail: '',
                    city: '',
                    sex: '',
                    interest: [],
                    date: '',
                    desc: ''
                };
                this.$refs[name].resetFields();
            }
        },
        computed:{
            title:function() {
                return this.$t('userInfo.date')+"不错错";
            }
        },
        created() {

        }
    }
</script>
