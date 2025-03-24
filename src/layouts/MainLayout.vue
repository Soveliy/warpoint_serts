<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderSection></HeaderSection>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import HeaderSection from 'src/components/HeaderSection.vue'
</script>
