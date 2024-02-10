<script setup lang="ts">
    import { ref } from "vue";
    import {weatherLocation} from "../interfaces.ts";
    const props = defineProps<{
        weatherLocation: weatherLocation
    }>();

    const emit = defineEmits(['flipModal']);
     
    const email = ref("");
    const name = ref("");


    async function registerForAlerts(){
        let baseUrl = `https://fn-weather-alert-02092024.azurewebsites.net/api/CommitToSix?code=jtsNbe8Pys8zqqg7dv3zK2V-38GJr00ynks6zhf3wmIMAzFu2WTExg==`

        const payload = {
            "Name": name.value,
            "Email": email.value,
            "TimeId": 6, 
            "Active": true, 
            "UserId": "7993419d-6147-446e-b41f-fa1817170410", 
            "Latitude": props.weatherLocation.lat.toFixed(2), 
            "Longitude": props.weatherLocation.long.toFixed(2)
        }

        try {
            const response = await fetch(baseUrl, {
                method: "POST", 
                mode: "cors", 
                credentials: "same-origin", 
                headers: {
                "Content-Type": "application/json",
                },
                redirect: "follow", 
                referrerPolicy: "no-referrer", 
                body: JSON.stringify(payload), 
            });
            if (!response.ok) {
                throw new Error("Network Response was not ok. Check the network tab for details")
            }
            emit("flipModal");

        } catch (error) {
            console.error("Error: ", error);
        }
        
    }
</script>

<template>
    <div class="container mb-5 text-start">
        <div class="card">
            <h2>Sign up to receive Rainy Day Alerts</h2>
            <label for="email-input" aria="email input label" class="label">Email</label>
            <input type="email" placeholder="Please enter your email address..." id="email-input" v-model="email"/>
            <label for="name" aria="name input label" class="label mb-5">Name</label>
            <input type="text" placeholder="Please enter your name.." id="name" v-model="name"/>
            <div class="flex justify-center mb-5">
                <button @click="registerForAlerts" class="primary">Sign me up!</button>
            </div>
        </div>
    </div>
</template>
