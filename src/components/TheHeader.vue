<script setup>

import ColorThemeSwitcher from "@/components//Molecules/ColorThemeSwitcher.vue";
</script>

<template>
  <header class="header">
    <div class="header__container container">
      <ColorThemeSwitcher/>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding-block: 12px;
  
  // .header__container
  &__container {
    display: flex;
    justify-content: end;
  }
}
</style>
