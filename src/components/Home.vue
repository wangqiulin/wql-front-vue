<template>
    <div>
        <h1>{{ projectName }}</h1>

        <router-link to="helloWord">用户</router-link>   
   
    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      projectName: 'wql-front-vue'
    }
  }
}
</script>
