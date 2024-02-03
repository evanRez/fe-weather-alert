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
    <div class="container mb-5 text-start">
        <div class="card">
            <h2>Sign up to receive Rainy Day Alerts</h2>
            <label for="email-input" aria="email input label" class="label">Email</label>
            <input type="email" placeholder="Please enter your email address..." id="email-input" v-model="email"/>
            <label for="time-select" aria="time drop down" class="label mb-5">Alert Hour</label>
            <div class="mb-5">
                <input type="radio" id="6" :value="6" v-model="time">
                <label for="6">6 am</label>

                <input type="radio" id="9" :value="9" v-model="time">
                <label for="9">9 am</label>
            </div>
            <div class="flex justify-center mb-5">
                <button @click="registerForAlerts" class="primary">Sign me up!</button>
            </div>
        </div>
    </div>
</template>
