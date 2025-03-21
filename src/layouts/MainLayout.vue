<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header shadow-0">
      <div class="container">
        <q-toolbar class="justify-between q-p-none">
          <q-btn href="https://warpoint.ru/" class="header__back-btn">
            <q-icon name="svguse:icons.svg#chevron-left | 0 0 20 20"></q-icon>

            на сайт
          </q-btn>
          <q-btn class="header__logo" to="/">
            <img alt="Warpoint logo" src="~assets/logo.svg" />
          </q-btn>

          <q-select
            class="header__select"
            filled
            borderless
            dense
            hide-bottom-space
            v-model="model"
            :options="options"
            option-value="id"
            option-label="desc"
            option-disable="inactive"
            emit-value
            map-options
            hide-dropdown-icon
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

<style lang="scss">
.header {
  padding: 15px 0;
  background: #101114;
  box-shadow: none;
  &__logo {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: transparent;
    box-shadow: none;
    &::before {
      display: none;
    }
    .q-focus-helper {
      display: none;
    }
  }

  &__back-btn {
    display: flex;
    align-items: center;
    padding: 10px 20px 10px 16px;
    border: 1px solid rgba(196, 200, 207, 0.2);
    border-radius: 24px;
    box-sizing: border-box;
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 13px;
    line-height: 123%;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #c4c8cf;
    i {
      margin-top: -1px;
      height: 20px;
      width: 20px;
      margin-right: 4px;
    }
  }
  .q-field--auto-height.q-field--dense .q-field__control,
  .q-field--auto-height.q-field--dense .q-field__native {
    min-height: inherit;
  }
  .q-field--dark .q-field__control:before,
  .q-field--filled .q-field__control:after {
    display: none;
  }
  &__select {
    .q-field__control {
      border: 1px solid rgba(196, 200, 207, 0.2);
      border-radius: 24px;
      padding: 11px 12px;
      min-width: 57px;
      box-sizing: border-box;
    }

    .q-field__native {
      justify-content: center;
      padding: 0;
      font-weight: 600;
      font-size: 13px;
      line-height: 123%;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #c4c8cf;
    }
  }

  .q-toolbar {
    padding: 0;
  }
}
</style>
