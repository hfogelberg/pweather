<template lang="html">
  <div class='daily'>
    <ul>
      <li v-for='daily in dailyForecasts' class='daily-forecast'>
        <day :daily='daily'></day>
      </li>
    </ul>
  </div>
</template>

<script>
import Day from './Day.vue'

export default {
  props: ['dailyForecasts'],
  components: {
    'day': Day
  }
}
</script>

<style lang="css" scoped>
ul {
  list-style: none;
}
</style>
