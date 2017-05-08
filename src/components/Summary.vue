<template lang="html">
  <div class="summary">
    <img src="../assets/img/sun.svg">
    <div class='summary-text'>{{summary.text}}</div>
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

    .summary-text {
      padding-left: 1em;
      font-size: 1.75em;
      line-height: 1.25em;
    }
  }
</style>
