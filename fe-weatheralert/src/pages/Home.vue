<script setup lang="ts">
import AutoLocation from "../components/AutoLocation.vue"
import CitySearch from "../components/CitySearch.vue"
import EmailRegister from "../components/EmailRegister.vue"
import Dialog from "../components/Dialog.vue"
import { ref, onMounted, watch } from "vue"
import { weatherLocation } from "../interfaces"


const location = ref<weatherLocation>({
    'lat': 0,
    'long': 0,
    'formattedAddress': "",
    'weatherDesc': "",
    'temp': 0,
    'high': 0,
    'low':  0,
    'icon': ""
});
const currentTime = ref("");

//const modalElement = ref(null);

const showModal = ref<boolean>(false);

const VITE_OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

onMounted(() => {
    getCurrentPosition();
    getDate();
    setInterval(() => {
      getDate();
    }, 1000)
    
})

function getCurrentPosition(lat?: number, long?: number) {
    if (lat != null && long != null) {
        location.value.lat = lat;
        location.value.long = long;
    } else {
        navigator.geolocation.getCurrentPosition((position) => {
            let { latitude, longitude } = position.coords;
            location.value.lat = Number(latitude.toFixed(2));
            location.value.long = Number(longitude.toFixed(2));
        });
    }
    
}

async function getGeoData() {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.value.lat}&lon=${location.value.long}&units=imperial&appid=${VITE_OPEN_WEATHER_API_KEY}`);
  const geoData = await response.json();

  const rvrsGeocodingResponse = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${location.value.lat}&lon=${location.value.long}&limit=1&appid=${VITE_OPEN_WEATHER_API_KEY}`);
  const rvrsGeocodingData = await rvrsGeocodingResponse.json();


  location.value.formattedAddress = `${rvrsGeocodingData[0].name}, ${rvrsGeocodingData[0].state}, ${rvrsGeocodingData[0].country}`;
  location.value.weatherDesc = formatDescription(geoData.weather[0].description);
  location.value.temp = geoData.main.temp.toFixed(0);
  location.value.high = geoData.main.temp_max.toFixed(0);
  location.value.low = geoData.main.temp_min.toFixed(0);
  location.value.icon = `https://openweathermap.org/img/wn/${geoData.weather[0].icon}@2x.png`;
}

function getDate() {
  let date = new Date();
  let formatted_date = date.toDateString();
  let formatted_time = date.toLocaleTimeString();
  let dateTime = `${formatted_date} - ${formatted_time}`;
  currentTime.value = dateTime;
}

function formatDescription(str: string) {
  var arr = str.split(' ');
  var formatted = arr.map( (x: string) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
  return formatted;
}

function flipModal() {
  showModal.value = !showModal.value;
  console.log('modal flip', showModal.value)
}

watch(
  location, 
  () => {getGeoData();}, 
  { deep: true })


</script>

<template>
    <div class="flex">
        <div class="container">
            <AutoLocation :weather-location="location" :current-time="currentTime"/>
        </div>
        <div class="container">
            <CitySearch @custom-change="getCurrentPosition"/>
            <EmailRegister :weather-location="location" @flip-modal="flipModal"/>
        </div>
        <Dialog v-show="showModal" :show-modal="showModal" @flip-modal="flipModal" />
    </div>
</template>