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
    <div class="text-start">
        <label for="city" aria="city">Search for your City</label>
        <input v-model="searchTerm" id="city" type="text" placeholder="Search for a city..."/>
        <select v-model="selected">
            <option v-for="item in cities" :value="item">{{ item?.name }}</option>
        </select>
        <button @click="fetchNewCity">Make this my city</button>
    </div>
</template>