import Vue from 'vue'

export default new Vue()

/*
使用方法

// 在接受数据的组件里
import Bus from '@/helpers/bus'
Bus.$on('test',msg => {
  console.log(msg)
})

// 在发送数据的组件里
import Bus from '@/helpers/bus'
Bus.$emit('test','hello jirengu')

*/ 