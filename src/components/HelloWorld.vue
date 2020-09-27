<template>
<div>
  <h1>googleAuthIsInit: {{ Vue3GoogleOauth.isInit }}</h1>
  <button @click="handleClickSignIn" :disabled="!Vue3GoogleOauth.isInit">sign in</button>
  <button @click="handleClickLogin" :disabled="!Vue3GoogleOauth.isInit">get authCode</button>
</div>
</template>

<script>
import {
  ref,
  reactive,
  inject
} from "vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup(props) {
    console.log("hello");
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    console.log("Vue3GoogleOauth", Vue3GoogleOauth);

    const handleClickLogin = () => {};
    const handleClickSignIn = () => {};
    return {
      Vue3GoogleOauth,
      handleClickLogin,
      handleClickSignIn,
    };
  },
};
</script>

<style>
button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

button:disabled {
  background: #fff;
  color: #ddd;
  cursor: not-allowed;
}
</style>
