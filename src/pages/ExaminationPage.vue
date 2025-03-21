<template>
  <q-page class="page">
    <div class="page__head">
      <h1 class="page__title">{{ certificateInfo.title }}</h1>
      <q-img
        v-if="certificateStatus === 'not_found'"
        class="page__title-icon"
        src="~assets/no_search.svg"
      />
    </div>
    <q-form class="form" @submit.prevent="checkCertificate">
      <div
        v-if="certificateStatus !== null && certificateStatus !== 'not_found'"
        class="form__status"
      >
        <span>{{ certificateInfo.statusText }}</span>
        <q-img class="form__status-icon" :src="certificateInfo.icon" />
      </div>

      <div v-if="certificateStatus === 'not_found'" class="form__desc">
        Вы точно указали верные данные? <br />
        Проверьте правильность заполненных полей и попробуйте еще раз:
      </div>

      <div
        class="form__body form__body--lit"
        :class="{
          'form__body--found': certificateStatus === 'found',
          'form__body--pending': certificateStatus === 'pending_activation',
        }"
      >
        <div class="form__content">
          <template v-if="certificateStatus !== 'found'">
            <div class="form__input-container">
              <q-input
                class="form__input"
                outlined
                v-model="certificateNumber"
                placeholder="XX00-0000-0000-0000"
                label="Номер сертификата"
                stack-label
                mask="AA##-####-####-####"
              />
            </div>
            <div class="form__input-container">
              <q-input
                class="form__input"
                outlined
                v-model="pinCode"
                placeholder="0000"
                label="PIN"
                stack-label
                mask="####"
              />
            </div>
          </template>

          <template v-else>
            <div class="form__certificate certificate">
              <div class="certificate__header">
                <div class="certificate__row row justify-between no-wrap">
                  <div class="certificate__item">
                    <div class="certificate__label">Номер сертификата</div>
                    <div class="certificate__value">{{ certificateData.number }}</div>
                  </div>
                  <div class="certificate__item">
                    <div class="certificate__label">PIN</div>
                    <div class="certificate__value">{{ certificateData.pin }}</div>
                  </div>
                </div>
              </div>

              <div class="certificate__item">
                <div class="certificate__label">ФИО покупателя</div>
                <div class="certificate__value certificate__value--mob-lit">
                  {{ certificateData.owner }}
                </div>
              </div>

              <div class="certificate__row row justify-between no-wrap">
                <div class="certificate__item">
                  <div class="certificate__label">Актуальный остаток</div>
                  <div class="certificate__value">{{ certificateData.balance }}</div>
                </div>
                <div class="certificate__item">
                  <div class="certificate__label">Дата активации</div>
                  <div class="certificate__value">{{ certificateData.activationDate }}</div>
                </div>
              </div>

              <div class="certificate__item">
                <div class="certificate__label">Действителен до (включительно)</div>
                <div class="certificate__value">{{ certificateData.expiry }}</div>
              </div>
            </div>
          </template>

          <q-img loading="eager" class="form__logo" src="~assets/logo.svg" />
        </div>

        <q-btn
          v-if="certificateStatus !== 'found' && certificateStatus !== 'pending_activation'"
          class="form__button"
          type="submit"
          color="primary"
          :label="certificateInfo.buttonText"
        />

        <q-btn
          v-if="certificateStatus === 'found'"
          class="form__button"
          color="primary"
          :label="certificateInfo.buttonText"
          to="/locations/"
        />

        <q-btn
          v-if="certificateStatus === 'pending_activation'"
          class="form__button"
          color="positive"
          :label="certificateInfo.buttonText"
          to="/activate/"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

const certificateNumber = ref('')
const pinCode = ref('')
const certificateStatus = ref(null) // 'found', 'not_found', 'pending_activation', null
const certificateData = ref({})

const certificates = {
  'RU12-3456-7891-0111': {
    pin: '4012',
    status: 'found',
    owner: 'Константин Белоусов-Головановский',
    balance: '20 000 ₽',
    activationDate: '03 / 03 / 2025',
    expiry: '03 / 03 / 2026',
  },
  'RU12-3456-7891-0222': { pin: '1234', status: 'pending_activation' },
}

const checkCertificate = () => {
  const cert = certificates[certificateNumber.value]
  if (cert && cert.pin === pinCode.value) {
    certificateStatus.value = cert.status
    certificateData.value =
      cert.status === 'found'
        ? { ...cert, number: certificateNumber.value, pin: pinCode.value }
        : {}
  } else {
    certificateStatus.value = 'not_found'
  }
}

const certificateInfo = computed(() => {
  const info = {
    found: {
      title: 'Сертификат найден',
      buttonText: 'К адресам локаций',
      statusText: 'Активирован',
      icon: '/src/assets/circle-check.svg',
    },
    not_found: {
      title: 'Сертификат не найден',
      buttonText: 'Попробовать снова',
      statusText: '',
      icon: '/src/assets/no_search.svg',
    },
    pending_activation: {
      title: 'Сертификат найден',
      buttonText: 'Перейти к активации',
      statusText: 'Ждёт активации',
      icon: '/src/assets/time.svg',
    },
    default: {
      title: 'Проверка баланса',
      buttonText: 'Проверить',
      statusText: '',
      icon: '',
    },
  }
  return info[certificateStatus.value] || info.default
})
</script>
