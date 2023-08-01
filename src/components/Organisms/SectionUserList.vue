<script setup>
import { ref, onMounted } from 'vue';
import exampleApi from '@/api/exampleApi';

const users = ref([]);

onMounted(async () => {
  const response = await exampleApi.getUsers();
  users.value = response.data;
  console.log(users.value)
});
</script>

<template>
  <section>
    <div class="container">
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  
  ul {
    min-width: 540px;
  }
}
</style>
