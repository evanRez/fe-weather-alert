<script setup lang="ts">

import { ref, watch, computed } from "vue";
import { debounce } from "../utility";
import { weatherCityClass} from "../interfaces"

const VITE_OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const emit = defineEmits(['customChange'])
const baseUrl = `http://api.openweathermap.org/geo/1.0/direct?limit=5&appid=${VITE_OPEN_WEATHER_API_KEY}&q=`
let searchTerm = ref("");

let cities = ref(Array<weatherCityClass>());

const selected = ref<weatherCityClass>();



const searchCities = async () => {
    console.log('starting to search cities');
    console.log('selected', selected);
    console.log('selected full', selected.value?.full_name)
    const response = await fetch(`${baseUrl}${searchTerm.value}`);
    const data: Array<weatherCityClass> = await response.json();
    cities.value.length = 0;
    data.forEach((el: weatherCityClass) => cities.value.push(el));
    
    console.log('data for real', data)
}


const selectedFullName = computed(() => {
    return `${selected.value?.name}, ${selected.value?.state}, ${selected.value?.country}`
})

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
    console.log('new coords', selected.value?.lat, selected.value?.lon);
    emit("customChange",selected.value?.lat, selected.value?.lon);

    console.log('city info ', cities.value)
}


function updateSearchTerm() {
    searchTerm.value = selectedFullName.value;
}

    
</script>

<template>
    <div class="container text-start">
        <div class="card">
            <h2>Change City Location Details</h2>
            <label for="city" class="label" aria="city">Search for your City</label>
            <div>
                <input v-model="searchTerm" id="city" type="text" placeholder="Search for a city..."/>
                <select v-model="selected" @change="updateSearchTerm">
                    <option v-for="item in cities" :value="item">{{ item.name + ", " + item.state + ", " + item.country }}</option>
                </select>
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