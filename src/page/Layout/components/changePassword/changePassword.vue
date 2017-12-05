<style lang="less">
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
</style>
<template>
    <div>
        <Modal
                :title="$t('layout.changePassword')"
                v-model="passwordModal"
                class-name="vertical-center-modal"
                @on-ok="ok"
                @on-cancel="cancel"
        >
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="120">
                <FormItem :label="$t('layout.oldPassword')" prop="oldPassword">
                    <Input type="password" v-model="formCustom.oldPassword" />
                </FormItem>
                <FormItem :label="$t('layout.newPassword')" prop="newPassword">
                    <Input type="password" v-model="formCustom.newPassword"/>
                </FormItem>
                <FormItem :label="$t('layout.checkPassword')" prop="passwordCheck">
                    <Input type="password" v-model="formCustom.passwordCheck"/>
                </FormItem>

            </Form>
        </Modal>
    </div>
</template>
<script>
    export default {
        props: {
            passwordModal: {
                type: Boolean,
                required: true
            }
        },
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('layout.checkNewPasswordEmpty')));
                } else {
                    if (this.formCustom.passwordCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwordCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('layout.checkPasswordEmpty')));
                } else if (value !== this.formCustom.newPassword) {
                    callback(new Error(this.$t('layout.confirmTowPassword')));
                } else {
                    callback();
                }
            };
            const validateOldPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error(this.$t('layout.checkOldPasswordEmpty')));
                }
            };

            return {
                formCustom: {
                    newPassword: '',
                    passwordCheck: '',
                    oldPassword: ''
                },
                ruleCustom: {
                    newPassword: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwordCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    oldPassword: [
                        { validator: validateOldPassword, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            ok () {
                this.$store.dispatch('app/setPasswordModal',false);
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$store.dispatch('app/setPasswordModal',false);
                this.$Message.info('Clicked cancel');
            }
        }
    }
</script>

