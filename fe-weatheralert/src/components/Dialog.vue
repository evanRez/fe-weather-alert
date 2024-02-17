<script setup lang="ts">
import { watch } from 'vue';

    const props = defineProps<{showModal: boolean}>();
    const emit = defineEmits(['flipModal'])


    function smoothScroll() {
        var dialog = document.getElementById("dialog");
        dialog?.scrollIntoView({"behavior": "smooth"});
    };

    watch(
    props.showModal.valueOf, 
    () => {smoothScroll();})

    function closeDialog(): void {
        console.log('current modal value', props.showModal)
        console.log('lets close this thing by setting a flag to false');
        emit("flipModal")
    }

</script>

<template>
    <dialog :open="showModal">
        <div class="container" id="dialog"> 
            <h3>Success! You've signed up for weather alerts.</h3>
            <p>When it is expected to rain, you'll receive an email around 6:00am</p>
            <button autofocus @click="closeDialog">Sounds Good 👍</button>
        </div>
    </dialog>
</template>

<style scoped>
    dialog {
        background-color: var(--teal);
        border-radius: 15px;
        border-width: 0;
    }

    dialog::backdrop {
        background-image: linear-gradient(
            45deg,
            var(--darkest-blue),
            var(--darker-blue)
        );
        opacity: 0.75;
    }

    button {
        background-color: var(--darkest-blue);
    }

</style>