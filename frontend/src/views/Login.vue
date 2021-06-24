<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登陆表单区域 -->
      <!-- 数据绑定 loginForm，校验绑定到loginFormRules -->
      <!-- 对dom对象的指代操作，用ref         label-width="80px"-->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        class="login_form"
      >
        <!-- 用户名 -->
        <!-- 校验的单项绑定在el-form-item上-->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入内容"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入内容"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
        <div class="more-sign">
          <h6>第三方账号登录</h6>
          <ul>
            <li id="arkid-link-wrap" class="">
              <a ref="linkref"
                class="arkid"
                id="arkid-link"
                target="_blank"
                href="https://arkid.demo.longguikeji.com/oauth/authorize/?response_type=code&state=xyz&scope=read&client_id=abcn82LQg9kXrVsI7CC0QG2Zap6SM6K4REsHQOl0&redirect_uri=http://124.70.55.171:8998/oauth/redirect"
              >
                <i class="iconfont ic-arkid"></i>
              </a>
            </li>
          </ul>
          <div class="weibo-geetest-captcha"></div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { defineComponent } from '@vue/composition-api'
// export default defineComponent({
//     setup() {
//     },
// })
export default {
  name: 'Login',
  created () {
    const url = window.location.href
    // const link = this.$refs.linkref
    console.log(url)

    // httpRequest.addEventListener("load", reqListener);
    // xhr.open(method, url, async, username, password);

    const myres = await this.$http.get('http://124.70.55.171:8998/oauth/info')
    console.log(myres)
    // httpRequest.open('GET', `${url}oauth/info`, false)
    // httpRequest.send()
    // console.log(httpRequest.responseText)
    // const res = JSON.parse(httpRequest.responseText)
    // console.log(res)
    // console.log(typeof res)
    // const clientId = res.client_id
    // const authorizeUri = res.authorize_uri
    // const redirectUri = res.redirect_uri

    // const link = document.getElementById('arkid-link');
    // link.href = `${authorizeUri}?response_type=code&state=xyz&scope=read&client_id=${clientId}&redirect_uri=${redirectUri}`
  },
  data() {
    return {
      // 这是登陆表单的数据绑定对象
      loginForm: {
        username: '',
        password: '',
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登陆名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          {
            min: 5,
            max: 16,
            message: '长度在 5 到 16 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    // 点击重制按钮，重制登陆表单
    resetLoginForm() {
      // console.log(this)// this就是指代当前组件 Login.vue
      this.$refs.loginFormRef.resetFields()
    },
    // 点击按钮触发校验
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return
        // 结果是 promise，就要用 await
        try {
          const result = await this.$http.post('login/', this.loginForm)
          console.log(result)
          if (result.status !== 200) return this.$message.error('登陆失败！')
          this.$message.success('登陆成功！')
          // 1. 将登陆成功之后的 token，保存在客户端的 sessionStorage 中
          //  1.1 项目中除了登陆之外的其他API接口，必须在登陆之后才能访问
          //  1.2 token 只应在当前网站打开期间生效，所以将token保存在 sessionStorage 中
          window.sessionStorage.setItem('token', result.data.token)
          // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
          this.$router.push('/home')
        } catch (error) {
          console.log('haha')
          return this.$message.error('登陆失败！')
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 460px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  background-color: #fff;

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: center;
}

.more-sign ul {
    margin-bottom: 10px;
    list-style: none;
}

li {
    display: list-item;
    text-align: -webkit-match-parent;
}

.sign .more-sign ul li {
  margin: 0 5px;
  display: inline-block;
  box-sizing: border-box;
}

.more-sign {
    margin-top: 30px;
}

.ic-arkid:before {
    content: url(../assets/arkid.png);
}

h6 {
    text-align: center;
    position: relative;
    margin: 0 0 10px;
    font-size: 12px;
    color: #000000;
}

h6:before {
    left: 30px;
}

h6:after {
    right: 30px;
}

h6:after,h6:before {
    content: "";
    border-top: 1px solid #b5b5b5;
    display: block;
    position: absolute;
    width: 60px;
    top: 5px;
}

:after, :before {
    box-sizing: border-box;
}
</style>
