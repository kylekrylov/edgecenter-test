<script setup>
import { ref } from "vue";

import MazBtn from "maz-ui/components/MazBtn";
import MazDialog from "maz-ui/components/MazDialog";
import Form from "@/components//Molecules/Form.vue";

const isOpen = ref(false)

function handleCloseForm() {
  isOpen.value = false;
};

const handleFormOpen = ()=> {
  isOpen.value = true
}

</script>

<template>
  <section class="container">
    <MazBtn @click="handleFormOpen()">
      Открыть форму
    </MazBtn>
    <MazDialog
      scrollable
      max-height="95vh"
      v-model="isOpen"
      title="Title"
    >
      <Form @closeForm="handleCloseForm()"/>
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
