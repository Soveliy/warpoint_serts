<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header shadow-0">
      <div class="container">
        <q-toolbar class="justify-between q-p-none">
          <q-btn
            align="between"
            class="btn-fixed-width"
            color="white"
            label="На сайт"
            icon="chevron_left"
            href="https://warpoint.ru/"
            outline
          />
          <img alt="Warpoint logo" src="~assets/logo.svg" />

          <q-select
            filled
            v-model="model"
            :options="options"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            emit-value
            map-options
          />
        </q-toolbar>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      model: ref('ru'),

      options: [
        {
          id: 'ru',
          desc: 'RU',
        },
        {
          id: 'en',
          desc: 'EN',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.header {
  padding: 20px 0;
  background: #101114;
  box-shadow: none;
  .q-toolbar {
    padding: 0;
  }
}
</style>
