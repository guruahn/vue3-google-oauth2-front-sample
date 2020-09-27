import { reactive, readonly, inject, computed } from "vue";
let googleAuthIsInit = false;
let googleAuthIsAuthorized = false;
const Vue3GoogleOauth = reactive({
  isInit: false,
  isAuthorized: false
})
const googleAuth = (function () {

  function installClient() {
    const apiUrl = 'https://apis.google.com/js/api.js';
    return new Promise((resolve) => {
      let script = document.createElement('script');
      script.src = apiUrl;
      script.onreadystatechange = script.onload = function () {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
          setTimeout(function () {
            resolve()
          }, 500)
        }
      }
      document.getElementsByTagName('head')[0].appendChild(script);
    })
  }

  function initClient(config) {
    return new Promise((resolve, reject) => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init(config)
          .then(() => {
            resolve(window.gapi);
          }).catch((error) => {
            reject(error);
          })
      })
    })

  }

  function Auth() {
    if (!(this instanceof Auth))
      return new Auth();
    this.GoogleAuth = null; /* window.gapi.auth2.getAuthInstance() */
    this.prompt = null;

    this.load = (config) => {
      installClient()
        .then(() => {
          return initClient(config)
        })
        .then((gapi) => {
          this.GoogleAuth = gapi.auth2.getAuthInstance();
          this.prompt = config.prompt;
          Vue3GoogleOauth.isInit = true
          Vue3GoogleOauth.isAuthorized = this.GoogleAuth.isSignedIn.get();
        }).catch((error) => {
          console.error(error);
        })
    };

    this.signIn = () => {
      return new Promise((resolve, reject) => {
        if (!this.GoogleAuth) {
          reject(false)
          return
        }
        this.GoogleAuth.signIn()
          .then(googleUser => {
            Vue3GoogleOauth.isAuthorized = this.GoogleAuth.isSignedIn.get();
            resolve(googleUser);;
          })
          .catch(error => {
            reject(error);
          })
      })
    };

    this.getAuthCode = () => {
      return new Promise((resolve, reject) => {
        if (!this.GoogleAuth) {
          reject(false)
          return
        }
        this.GoogleAuth.grantOfflineAccess({ prompt: this.prompt })
          .then(function (resp) {
            resolve(resp.code)
          })
          .catch(function (error) {
            reject(error)
          })
      })
    };

    this.signOut = () => {
      return new Promise((resolve, reject) => {
        if (!this.GoogleAuth) {
          reject(false)
          return
        }
        this.GoogleAuth.signOut()
          .then(() => {
            Vue3GoogleOauth.isAuthorized = false;
            resolve(true)
          })
          .catch(error => {
            reject(error)
          })
      })
    };
  }

  return new Auth()
})();

export default {
  install: (app, options) => {
    console.log('install vue3-google-oauth2')
    let config = null
    let defaultConfig = { scope: 'profile email', prompt: 'select_account' };
    if (typeof options === 'object') {
      config = Object.assign(defaultConfig, options);
      if (!options.clientId) {
        throw new Error('clientId is require');
      }
    } else {
      throw new TypeError('invalid option type. Object type accepted only');
    }
    googleAuth.load(defaultConfig);
    app.config.globalProperties.$translate = googleAuth;
    // app.provide('gAuthIsInit', googleAuthIsInit);
    // app.provide('gAuthIsAuthorized', googleAuthIsAuthorized);

    app.provide('Vue3GoogleOauth', readonly(Vue3GoogleOauth))

    console.log('provided')

  }
}