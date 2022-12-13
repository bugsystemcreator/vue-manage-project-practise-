<template>
    <div class="login">
        <div class="loginwrapper">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <h3>系统登录</h3>
                <el-form-item label="账号" prop="name">
                    <el-input v-model="form.username" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" type="password" ></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="submit">登录</el-button>
        </div>

    </div>

</template>
<script>
import { ColorPicker } from 'element-ui'
import Mock from 'mockjs'
import Cookie from 'js-cookie'
export default {
    name: "login",
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                name: [{ required: true, message: '请输入账号名称', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            }
        }
    },
  methods:{
    submit(){
        const token=Mock.Random.guid()
        Cookie.set('token',token)
        console.log('submit')
    }
  }
}
</script>
<style lang="less">
.login{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    
    .loginwrapper {
    border: 1px solid #eaeaea;
    width: 350px;
    padding: 35px;
    text-align: center;
    border-radius: 25px;
    box-shadow: 1px 1px 25px #cac6c6;
    .input{
        margin-right: 100px;
    }
}
}

</style>