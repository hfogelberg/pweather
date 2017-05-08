<template lang="html">
  <div class="summary">
    <img src="../assets/img/sun.svg">
    <h3>{{summary.text}}</h3>
  </div>
</template>

<script>
export default {
  props: ['summary']
}
</script>

<style lang="scss" scoped>
  @import '../assets/styles/fonts';

  .summary {
    border: 4px solid $border-color;
    border-radius: 20px;
    box-shadow: 10px 10px 5px $shadow-color;
    padding: 2em;
    margin-top: 2em;
    margin-right: 10vw;
    margin-bottom: 2em;
    margin-left: 10vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    img {
      flex: 0.4
    }

    h3 {
      flex: 0.6;
    }
  }
</style>
