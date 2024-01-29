<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'


const location = ref({
    lat: 0,
    long: 0
})

const VITE_OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

onMounted(() => {
    getCurrentPosition();
    console.log('location data', location);
    console.log('api key', VITE_OPEN_WEATHER_API_KEY);
    
})

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
        let { latitude, longitude } = position.coords;
        location.value.lat = Number(latitude.toFixed(2));
        location.value.long = Number(longitude.toFixed(2));
    });
}

async function getGeoData() {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.value.lat}&lon=${location.value.long}&appid=${VITE_OPEN_WEATHER_API_KEY}`);
  const geoData = await response.json();
  console.log('geodate', geoData);
}

watch(
  location, 
  () => {getGeoData();}, 
  { deep: true })


</script>

<template>

  <div class="card">
    
    <p>
      Is this the correct address?
    </p>
    <p>Lat: <div>{{ location.lat }}</div></p>
    <p>Long: <div>{{ location.long }}</div></p>
  </div>

</template>

<style scoped>

</style>
