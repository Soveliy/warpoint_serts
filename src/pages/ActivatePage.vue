<template>
  <q-page class="page">
    <div class="page__head">
      <h1 class="page__title">активация сертификата</h1>
    </div>
    <q-form v-if="status === null" class="form">
      <div class="form__head">
        <q-btn class="form__back-btn shadow-0" @click="prevStep" :disable="isFirstStep">
          <q-icon name="svguse:icons.svg#arrow_left | 0 0 32 32"></q-icon>
        </q-btn>
        <div class="form__steps">
          <span>{{ step }} из {{ totalSteps }}</span>
          <div class="form__progress">
            <div class="form__current-progress" :style="{ width: progressWidth }"></div>
          </div>
        </div>
      </div>

      <div class="form__body">
        <q-stepper v-model="step" flat animated :header-nav="false">
          <q-step :name="1" title="Введите данные">
            <div class="form__stepper-title">введите данные сертификата</div>
            <div class="form__card form__card--lit form__card--primary">
              <div class="form__input-container">
                <q-input
                  class="form__input"
                  outlined
                  v-model="form.certificateNumber"
                  placeholder="XX00-0000-0000-0000"
                  label="Номер сертификата"
                  stack-label
                  mask="AA##-####-####-####"
                  :error="!!errors.certificateNumber"
                  :error-message="errors.certificateNumber"
                />
              </div>
              <q-img loading="eager" class="form__logo" src="~assets/logo.svg" />
            </div>
            <q-btn
              class="form__button form__button--lit"
              color="primary"
              :label="isLastStep ? 'Завершить' : 'Далее'"
              @click="nextStep"
            />
          </q-step>
          <q-step :name="2" title="Введите данные">
            <div class="form__stepper-title">введите сумму пополнения</div>
            <div class="form__group">
              <div class="form__item">
                <label for="" class="form__item-label">выберите сумму</label>
                <div class="form__radious-group">
                  <q-btn-toggle
                    v-model="form.sum"
                    spread
                    unelevated
                    rounded
                    no-wrap
                    :options="[
                      { label: '1 000 ₽', value: '1 000' },
                      { label: '2 000 ₽', value: '2 000' },
                      { label: '5 000 ₽', value: '5 000' },
                      { label: '20 000 ₽', value: '20 000' },
                      { label: '50 000 ₽', value: '50 000' },
                    ]"
                  />
                </div>
              </div>
              <div v-if="errors.sum" class="text-negative text-caption q-mt-xs">
                {{ errors.sum }}
              </div>
              <div class="form__item">
                <q-input
                  class="form__input form__input--type-2"
                  outlined
                  v-model="form.customSum"
                  label="или укажите свою"
                  stack-label
                  placeholder="от 500 до 100 000 ₽"
                  :error="!!errors.customSum"
                  :error-message="errors.customSum"
                />
              </div>
            </div>
            <q-btn
              class="form__button"
              color="primary"
              :label="isLastStep ? 'Завершить' : 'Далее'"
              @click="nextStep"
            />
          </q-step>
          <q-step :name="3" title="Введите данные">
            <div class="form__stepper-title">ваши контактные данные</div>
            <div class="form__group">
              <div class="form__item">
                <q-input
                  class="form__input form__input--type-2"
                  outlined
                  v-model="form.name"
                  label="Имя"
                  stack-label
                  placeholder="Введите имя"
                />
              </div>
              <div class="form__item">
                <div class="phone-input">
                  <label for="" class="form__item-label">телефон</label>
                  <IntlTelInput
                    v-model="form.phone"
                    :options="{
                      initialCountry: 'ru',
                      separateDialCode: true,
                      strictMode: true,
                      countrySearch: false,
                    }"
                  />
                </div>
              </div>
              <div class="form__item">
                <q-input
                  class="form__input form__input--type-2"
                  outlined
                  v-model="form.email"
                  label="email"
                  stack-label
                  placeholder="youremail@email.com"
                />
              </div>
            </div>
            <q-btn
              class="form__button"
              color="primary"
              :label="isLastStep ? 'Завершить' : 'Далее'"
              @click="nextStep"
            />
          </q-step>
          <q-step :name="4" title="Введите данные">
            <div class="form__stepper-title">проверьте, всё ли верно:</div>
            <div class="data">
              <div class="data__items">
                <div class="data-item">
                  <div class="data-item__label">Номер сертификата</div>
                  <div class="data-item__value">{{ form.certificateNumber }}</div>
                </div>
              </div>
              <div class="data__items">
                <div class="data-item">
                  <div class="data-item__label">Сумма сертификата</div>
                  <div class="data-item__value">
                    {{ form.customSum ? form.customSum : form.sum }} ₽
                  </div>
                </div>
                <div class="data-item">
                  <div class="data-item__label">Срок действия</div>
                  <div class="data-item__value">до 12.12.2024</div>
                </div>
              </div>
              <div class="data__items">
                <div class="data-item">
                  <div class="data-item__label">Покупатель</div>
                  <div class="data-item__value">{{ form.name }}</div>
                  <div class="data-item__value">{{ form.phone }}</div>
                  <div class="data-item__value">{{ form.email }}</div>
                </div>
              </div>
              <q-checkbox v-model="form.acceptPolicy" size="md">
                Нажимая <strong>«Оплатить»</strong>, <br />
                я соглашаюсь с
                <a href="/oferta" class="text-primary" target="_blank">Офертой</a> и
                <a href="/policy" class="text-primary" target="_blank"
                  >Политикой обработки персональных данных</a
                >
              </q-checkbox>
            </div>
            <q-btn
              class="form__button"
              color="primary"
              :label="isLastStep ? 'Завершить' : 'Далее'"
              @click="nextStep"
            />
          </q-step>
        </q-stepper>
      </div>
    </q-form>
    <div v-else-if="status === 'success'" class="result">
      <div class="result__content">
        <div class="result__top">
          <q-icon
            class="result__icon result__icon--true"
            name="svguse:icons.svg#true-icon | 0 0 24 24"
          ></q-icon>
          <div class="result__top-content">
            <div class="result__title">Оплата прошла успешно!</div>
            <div class="result__desc">Спасибо, что выбрали Warpoint</div>
          </div>
        </div>
        <div class="result__item">
          <div class="result__item-label">сертификат на сумму</div>
          <div class="result__item-value">{{ form.customSum ? form.customSum : form.sum }} ₽</div>
        </div>
        <div class="result__item">
          <div class="result__item-label">мы отправили на email</div>
          <div class="result__item-value">{{ form.email }}</div>
        </div>
      </div>
      <q-btn class="form__button" color="primary" label="вернуться на сайт" to="/" />
    </div>
    <div v-else-if="status === 'error'" class="result">
      <div class="result__content">
        <div class="result__top">
          <q-icon
            class="result__icon result__icon--false"
            name="svguse:icons.svg#false-icon | 0 0 24 24"
          ></q-icon>
          <div class="result__top-content">
            <div class="result__title">Оплата не прошла</div>
          </div>
        </div>
        <div class="result__item">
          <div class="result__item-label">возможная причина</div>
          <div class="result__item-value">
            Проверьте, достаточно ли средств на счете, с которого производится оплата
          </div>
        </div>
      </div>
      <q-btn class="form__button" color="primary" label="попробовать еще раз" to="/activate/" />
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue'
import IntlTelInput from 'intl-tel-input/vueWithUtils'
import 'intl-tel-input/styles'
export default {
  components: {
    IntlTelInput,
  },
  setup() {
    const step = ref(1)
    const totalSteps = 4
    const status = ref(null) // 'success' или 'error'
    const form = ref({
      certificateNumber: '',
      sum: '5 000',
      customSum: '',
      name: '',
      phone: '',
      email: '',
      acceptPolicy: false,
    })

    const errors = ref({})

    const progressWidth = computed(() => `${(step.value / totalSteps) * 100}%`)
    const isFirstStep = computed(() => step.value === 1)
    const isLastStep = computed(() => step.value === totalSteps)

    function validateStep1() {
      errors.value.certificateNumber = form.value.certificateNumber
        ? ''
        : 'Введите номер сертификата'
      return !errors.value.certificateNumber
    }

    function validateStep3() {
      errors.value.name = form.value.name ? '' : 'Введите имя'
      errors.value.phone = form.value.phone ? '' : 'Введите номер телефона'
      errors.value.email =
        form.value.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.value.email)
          ? ''
          : 'Введите корректный email'

      return !errors.value.name && !errors.value.phone && !errors.value.email
    }

    function validateStep4() {
      errors.value.acceptPolicy = form.value.acceptPolicy ? '' : 'Необходимо принять условия'
      if (!errors.value.acceptPolicy) {
        submitPayment()
        return true
      }
      return false
    }
    function validateCurrentStep() {
      switch (step.value) {
        case 1:
          return validateStep1()
        case 2:
          return true
        case 3:
          return validateStep3()
        case 4:
          return validateStep4()
        default:
          return false
      }
    }

    function nextStep() {
      if (validateCurrentStep() && step.value !== totalSteps) {
        step.value++
      }
    }

    function prevStep() {
      if (step.value > 1) {
        step.value--
      }
    }

    function submitPayment() {
      // Симуляция запроса к API
      setTimeout(() => {
        status.value = Math.random() > 0.5 ? 'success' : 'error'
      }, 1000)
    }

    return {
      step,
      totalSteps,
      status,
      form,
      errors,
      progressWidth,
      isFirstStep,
      isLastStep,
      validateStep1,
      validateStep3,
      validateStep4,
      nextStep,
      prevStep,
      submitPayment,
    }
  },
}
</script>

<style scoped></style>
