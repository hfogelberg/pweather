<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import '/assets/styles/reset';
@import '/assets/styles/master';

#app {
  margin-top: 20px;
}


</style>
