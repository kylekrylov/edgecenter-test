<script setup>
import { ref } from "vue";

import MazBtn from "maz-ui/components/MazBtn";
import MazDialog from "maz-ui/components/MazDialog";
import Form from "@/components//Molecules/Form.vue";

const isOpen = ref(false)
</script>

<template>
  <section class="container">
    <MazBtn @click="isOpen = true">
      Открыть форму
    </MazBtn>
    
    
    <MazDialog
      scrollable
      max-height="95vh"
      v-model="isOpen"
      title="Title"
    >
      <Form/>
    </MazDialog>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
