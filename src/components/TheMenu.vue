<template>
  <div class="menu">
    <RouterLink to="/" custom v-slot="{ isActive, navigate }">
      <i
        class="menu-button fa fa-brain"
        :class="{ active: isActive }"
        @click="navigate"
        aria-hidden="true"
      ></i>
    </RouterLink>

    <RouterLink to="https://game-project-k9b.pages.dev" custom v-slot="{ isActive, navigate }">
      <i
        class="menu-button fa fa-sack-dollar"
        :class="{ active: isActive }"
        @click="navigate"
        aria-hidden="true"
      ></i>
    <RouterLink to="src/App.vue" custom v-slot="{ isActive, navigate }">

    <RouterLink to="/friends" custom v-slot="{ isActive, navigate }">
      <i
        class="menu-button fa fa-users"
        :class="{ active: isActive }"
        @click="navigate"
        aria-hidden="true"
      ></i>
    <RouterLink to="https://ccc4c025.game-project-k9b.pages.dev" custom v-slot="{ isActive, navigate }">

<RouterLink to="/friends" custom v-slot="{ isActive, navigate }">
      <i
        class="menu-button fa fa-graduation-cap"
        :class="{ active: isActive }"
        @click="navigate"
        aria-hidden="true"
      ></i>
    </RouterLink>

    <RouterLink to="/tasks" custom v-slot="{ isActive, navigate }">
      <i
        class="menu-button fa fa-globe"
        :class="{ active: isActive }"
        @click="navigate"
        aria-hidden="true"
      ></i>
    </RouterLink>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
</script>
