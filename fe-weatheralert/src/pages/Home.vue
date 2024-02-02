<script setup lang="ts">
import AutoLocation from "../components/AutoLocation.vue"
import CitySearch from "../components/CitySearch.vue"
import EmailRegister from "../components/EmailRegister.vue"
import { ref, onMounted, watch } from "vue"
import {weatherLocation } from "../interfaces"


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
const currentTime = ref("")

const VITE_OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
const VITE_GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

onMounted(() => {
    getCurrentPosition();
    getDate();
    setInterval(() => {
      getDate();
    }, 1000)
    
})

function getCurrentPosition(lat?: number, long?: number) {
    if (lat != null && long != null) {
        console.log('THIS WAS HIT')
        location.value.lat = lat;
        location.value.long = long;
    } else {
        console.log('only on initial render')
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
  const googleResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.value.lat},${location.value.long}&key=${VITE_GOOGLE_MAPS_API_KEY}`)
  const googleData = await googleResponse.json();
  console.log('google data', googleData);
  console.log('geodate', geoData);
  location.value.formattedAddress = googleData.results[6].formatted_address;
  location.value.weatherDesc = formatDescription(geoData.weather[0].description);
  location.value.temp = geoData.main.temp.toFixed(0);
  location.value.high = geoData.main.temp_max.toFixed(0);
  location.value.low = geoData.main.temp_min.toFixed(0);
  location.value.icon = `https://openweathermap.org/img/wn/${geoData.weather[0].icon}@2x.png`

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

watch(
  location, 
  () => {getGeoData();}, 
  { deep: true })


</script>

<template>
    <div class="flex">
        <div>
            <AutoLocation :weather-location="location" :current-time="currentTime"/>
        </div>
        <div>
            <CitySearch/>
            <EmailRegister :weather-location="location" @custom-change="getCurrentPosition"/>
        </div>
    </div>
</template>