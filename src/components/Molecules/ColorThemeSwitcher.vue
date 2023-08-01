<script setup lang="ts">

import { onMounted } from "vue";
import { useThemeHandler, type ThemeHandlerOptions } from 'maz-ui'

import MazSwitch from "maz-ui/components/MazSwitch";

const options: ThemeHandlerOptions = {
  darkClass: 'dark',
  storageThemeKey: 'theme',
  storageThemeValueDark: 'dark',
  storageThemeValueLight: 'light',
}

const {
  autoSetTheme,
  toggleTheme,
  theme
} = useThemeHandler(options)

onMounted(() => {
  autoSetTheme()
})
</script>

<template>
  <div class="color-theme">
    <MazSwitch @click="toggleTheme"/>
    Toggle theme
  </div>
</template>


<style lang="scss">
.color-theme {
  display: flex;
}
</style>
