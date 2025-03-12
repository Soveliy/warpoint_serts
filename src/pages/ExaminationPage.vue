<template>
  <q-page class="q-pa-md">
    <q-form @submit="onSubmit">
      <q-input v-model="certificateNumber" label="Номер сертификата" outlined class="q-mb-md" />
      <q-input v-model="pin" label="PIN" type="password" outlined class="q-mb-md" />
      <q-btn type="submit" label="Активировать" color="primary" />
    </q-form>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      certificateNumber: '',
      pin: '',
    }
  },
  methods: {
    onSubmit() {
      // Handle form submission
      console.log('Certificate Number:', this.certificateNumber)
      console.log('PIN:', this.pin)
    },
  },
}
</script>

<style scoped>
.q-page {
  max-width: 400px;
  margin: auto;
}
</style>
