<template>
  <div class="hello">
    <h1>1.普通对象</h1>
    {{code}} {{message}}

    <h1>2.if-else</h1>
    <p v-if="code==='success'"> success ===> {{message}}  </p>
    <p v-else-if="code==='failure'"> failure ===> {{message}} </p>
    <p v-else>未知异常</p>

    <h1>3.for循环</h1>
    <p v-for="(data, index) in dataList">
      {{index+1}} - {{data.userName}} - {{data.userPwd}} 
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      code: '',
      message: '',
      dataList: []
    }
  },

  created(){
    //调用接口
    this.$http.post('/user/queryList', {}, resp => {
      this.code=resp.code;
      this.message=resp.message;
      this.dataList=resp.data;
    })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
