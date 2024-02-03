<script setup lang="ts">

import { ref, watch } from "vue";
import { debounce } from "../utility";
import {iNinjaCity} from "../interfaces"

const emit = defineEmits(['customChange'])

const selected = ref<iNinjaCity>()
const baseUrl = 'https://api.api-ninjas.com/v1/city?country=US&limit=5&name=';
let searchTerm = ref("");
let cities = ref(Array<ninjaCity>());
const VITE_API_NINJA_CITY_KEY = import.meta.env.VITE_API_NINJA_CITY_KEY;
const VITE_OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

//http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

//https://open.gsa.gov/api/location-public-api/


const searchCities = async () => {
    const response = await fetch(`${baseUrl}${searchTerm.value}`, 
    {
        headers: {
            'X-Api-Key': VITE_API_NINJA_CITY_KEY
        }
    });
    const data: Array<ninjaCity> = await response.json();
    cities.value.length = 0;
   
    data.forEach((el: ninjaCity) => cities.value.push(el));
    
    console.log('data for real', data)
}


watch(
    searchTerm,
    async () => {
        console.log('city plain', searchTerm.value);
        deboucedSearch();
    },
    {deep: true}
)

const deboucedSearch = debounce( searchCities, 800);

function fetchNewCity() {
    console.log('the selected city is', selected.value);
    console.log('new coords', selected.value?.latitude, selected.value?.longitude);
    emit("customChange",selected.value?.latitude, selected.value?.longitude);
}
    
</script>

<template>
    <div class="container text-start">
        <div class="card">
            <h2>Change City Location Details</h2>
            <label for="city" class="label" aria="city">Search for your City</label>
            <div>
                <input v-model="searchTerm" id="city" list="cityOptions" placeholder="Search for a city..."/>
                <datalist id="cityOptions">
                    <option v-for="item in cities" :value="item.name">{{ item?.name }}</option>
                </datalist>
            </div>
            
            <div class="flex justify-center mb-5">
                <button class="primary" @click="fetchNewCity">Check City</button>
            </div>
        </div>
        
    </div>
</template>

<style scoped>
    #city {
        line-height: 2rem;
        width: 100%;
        margin-bottom: 2rem;
        margin-top: 1rem;
    }


</style>