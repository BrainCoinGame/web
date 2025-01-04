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

    <RouterLink to="C:\Users\Administrator\Desktop\bg\game-project\src\app.vue" custom v-slot="{ isActive, navigate }">
      <i
        class="menu-button fa fa-sack-dollar"
        :class="{ active: isActive }"
        @click="navigate"
        aria-hidden="true"
      ></i>
    </RouterLink>

    <RouterLink to="/friends" custom v-slot="{ isActive, navigate }">
      <i
        class="menu-button fa fa-users"
        :class="{ active: isActive }"
        @click="navigate"
        aria-hidden="true"
      ></i>
    </RouterLink>

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
