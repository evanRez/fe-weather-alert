<script setup lang="ts">
import {weatherLocation} from '../interfaces';

const props = defineProps<{
  weatherLocation: weatherLocation,
  currentTime: string}
  >()

</script>

<template>
  <div class="container">
    <div class="card mid-blue">
      <h2 class="mb-5">{{ props.weatherLocation.formattedAddress }}</h2>
      <div>
        {{ props.weatherLocation.weatherDesc }}
      </div>
      <div class="flex vert-center justify-center">
        <h2>{{ props.weatherLocation.temp }}°F</h2>
        <img :src="props.weatherLocation.icon" />
      </div>
        <div>
          High - {{ props.weatherLocation.high }}°F
        </div>
        <div>
          Low - {{ props.weatherLocation.low }}°F
        </div>
      <p>{{ props.currentTime }}</p>
    </div>
    
  </div>

</template>


<style scoped>

</style>

