<script setup lang="ts">
    import { ref } from "vue";
    import {weatherLocation} from "../interfaces.ts";
    const props = defineProps<{
        weatherLocation: weatherLocation
    }>()
     
    const email = ref("");
    const time = ref(6);

    function registerForAlerts(){
        console.log('email', email.value);
        console.log('time', time.value);
        var mySelectedLocation = props.weatherLocation.formattedAddress;
        console.log('subscribed city', mySelectedLocation)
    }
</script>

<template>
    <div class="mb-5 text-start">
        <h2>Sign up to receive Rainy Day Alerts</h2>
        <label for="email-input" aria="email input label" class="label">Email</label>
        <input type="email" placeholder="Please enter your email address..." id="email-input" v-model="email"/>
        <label for="time-select" aria="time drop down" class="label">Alert Hour</label>
        <select v-model="time" id="time-select">
            <option :value="6">6 am</option>
            <option :value="9">9 am</option>
        </select>
        <div class="flex justify-center mb-5">
            <button @click="registerForAlerts" class="primary">Sign me up!</button>
        </div>
        
    </div>
</template>
