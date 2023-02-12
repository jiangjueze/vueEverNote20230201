<template>
  <span :title="username">{{slug}}</span>
</template>

<script>
  import Auth from '@/apis/auth'
  // import Bus from '@/helpers/bus'
  import {mapGetters,mapActions} from 'vuex'

  export default {
    data() {
      return {}
    },

    created(){
      // Bus.$on('userInfo',user => {
      //   this.username = user.username
      // })
      // Auth.getInfo().then(res => {  // 判断是否登录
      //   if(res.isLogin){
      //     this.username = res.data.username
      //   }
      // })

      this.setUser()
    },

    methods:{
      ...mapActions({
        'setUser':'checkLogin'
      })
    },

    computed:{
      ...mapGetters([
        'username',
        'slug'
      ])
    }
  }
</script>

<style scoped>

span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>