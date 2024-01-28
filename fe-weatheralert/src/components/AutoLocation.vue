<script setup lang="ts">
import { ref, onMounted } from 'vue'


// navigator.geolocation.getCurrentPosition((position) => {
//   doSomething(position.coords.latitude, position.coords.longitude);
// });


const location = ref({
    lat: 0,
    long: 0
})

onMounted(() => {
    getCurrentPosition();
    console.log('location data', location);
})

function getCurrentPosition() {
    return navigator.geolocation.getCurrentPosition((position) => {
        let { latitude, longitude } = position.coords;
        location.value.lat = latitude;
        location.value.long = longitude;
    });
}
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
.read-the-docs {
  color: #888;
}
</style>
