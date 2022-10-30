<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="" class="nav-content nav-link nav-title"><b>Some Image Viewer</b></RouterLink>
      <RouterLink to="/" class="nav-link" href="/">Home</RouterLink>
      <RouterLink to="/viewpost" class="nav-link">View an Image</RouterLink>
      <RouterLink to="/post_image" class="nav-link">Post an Image</RouterLink>
      <RouterLink to="/login" class="nav-link">Login</RouterLink>
      <RouterLink to="/register" class="nav-link" href="/register">Registration</RouterLink>
    </nav>
  </header>

  <RouterView />
  <footer class="flex-container column">
    Some statisitics for this site or something
  </footer>
</template>