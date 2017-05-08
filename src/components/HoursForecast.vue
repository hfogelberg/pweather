<template lang="html">
  <div class = 'hourly'>
    <ul>
      <li v-for="hour in hourlyForecasts">
        <hour :hour='hour'></hour>
      </li>
    </ul>
  </div>
</template>

<script>
import Hour from './Hour.vue'

export default {
  props: ['hourlyForecasts'],
  components: {
    'hour': Hour
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
</style>
