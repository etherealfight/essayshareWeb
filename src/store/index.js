import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//创建vuex实例
const store = new Vuex.Store({
    state: {
        userName: '', //用户名
        sex: 0, //用户性别
        nickName: '', //用户昵称
        loginState: false, //登录状态
        userImage: "http://www.shuoshuodaitupian.com/images/avatar_selection/avatar0011.jpg", //用户头像
        sign: '', //用户签名
        introduction: '', //用户简介
        tempUsername: '' //被点击查询主页的用户名
    },
    mutations: {
        /**
         * 修改用户信息
         */
        changeStates(state, payload) {
            state.nickName = payload.nickname;
            state.sex = payload.sex;
            state.sign = payload.sign;
            state.introduction = payload.introduction;
        },
        /**
         * 修改用户头像
         */
        changeUserImage(state, payload) {
            state.userImage = "http://192.168.1.104:8080" + payload.userImage;
        },
        /**
         * 初始化用户信息
         */
        initialData(state, payload) {
            state.userName = payload.username;
            state.nickName = payload.nickname;
            state.sex = payload.sex;
            state.sign = payload.sign;
            state.introduction = payload.introduction;
            state.userImage = payload.userImage;
            state.loginState = true;
        },

    }
})

export default store