<template>
  <q-page class="page">
    <div class="page__head">
      <h1 class="page__title">покупка online-сертификата</h1>
    </div>
    <q-form class="form">
      <div class="form__head">
        <q-btn class="form__back-btn" @click="prevStep" :disable="isFirstStep">
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
        <q-stepper v-model="step" flat animated>
          <q-step :name="1" title="Введите данные">
            <div class="form__stepper-title">выбор номинала</div>
            <div class="to-whom">
              <q-btn-toggle
                v-model="form.giftTo"
                spread
                unelevated
                rounded
                no-wrap
                :options="[
                  { label: 'Себе', value: 'toMe' },
                  { label: 'В подарок', value: 'gift' },
                ]"
              />
            </div>
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
              <div class="form__item">
                <q-input
                  class="form__input form__input--type-2"
                  outlined
                  v-model="form.customSum"
                  label="или укажите свою"
                  stack-label
                  placeholder="от 500 до 100 000 ₽"
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
          <q-step v-if="form.giftTo === 'gift'" :name="2" title="Шаг 2 (Только для подарка)">
            <div class="form__stepper-title">кому подарок</div>
            <div class="form__stepper-desc">Сертификат мы отправим на указанный e-mail</div>
            <div class="form__group">
              <div class="form__item">
                <q-input
                  class="form__input form__input--type-2"
                  outlined
                  v-model="form.name"
                  name="name"
                  label="Имя"
                  stack-label
                  placeholder="Введите имя"
                  :error="!!errors.name"
                  :error-message="errors.name"
                />
              </div>
              <div class="form__item">
                <div class="phone-input">
                  <label for="" class="form__item-label">телефон</label>
                  <div class="phone-input">
                    <IntlTelInput
                      v-model="form.phone"
                      :options="{
                        initialCountry: 'ru',
                        separateDialCode: true,
                        strictMode: true,
                      }"
                      :error="!!errors.phone"
                      :error-message="errors.phone"
                      name="phone"
                    />
                  </div>
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
                  :error="!!errors.email"
                  :error-message="errors.email"
                  name="email"
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
          <q-step :name="form.giftTo === 'gift' ? 3 : 2" title="Шаг 3">
            <div class="form__stepper-title">ваши контактные данные</div>
            <div class="form__group">
              <div class="form__item">
                <q-input
                  class="form__input form__input--type-2"
                  outlined
                  v-model="form.recipientName"
                  label="Имя"
                  stack-label
                  placeholder="Введите имя"
                  :error="!!errors.recipientName"
                  :error-message="errors.recipientName"
                  name="recipientName"
                />
              </div>
              <div class="form__item">
                <div class="phone-input">
                  <IntlTelInput
                    v-model="form.recipientPhone"
                    :options="{
                      initialCountry: 'ru',
                      separateDialCode: true,
                      strictMode: true,
                    }"
                    :error="!!errors.recipientPhone"
                    :error-message="errors.recipientPhone"
                    name="recipientPhone"
                  />
                </div>
              </div>
              <div class="form__item">
                <q-input
                  class="form__input form__input--type-2"
                  outlined
                  v-model="form.recipientEmail"
                  label="email"
                  stack-label
                  placeholder="youremail@email.com"
                  :error="!!errors.recipientEmail"
                  :error-message="errors.recipientEmail"
                  name="recipientEmail"
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

          <q-step v-if="form.giftTo === 'gift'" :name="4" title="Шаг 4">
            <div class="form__group">
              <div class="form__item">
                <q-input
                  class="form__textarea"
                  outlined
                  v-model="form.comment"
                  label="поздравление"
                  stack-label
                  placeholder="Добавьте приятных слов к подарку"
                  type="textarea"
                />
                <span class="form__item-counter">{{ 360 - form.comment.length }}</span>
              </div>

              <q-btn
                class="form__button"
                color="primary"
                :label="isLastStep ? 'Завершить' : 'Далее'"
                @click="nextStep"
              />
            </div>
          </q-step>
          <q-step :name="form.giftTo === 'gift' ? 5 : 3" title="Финальный шаг">
            <div class="form__time time">
              <div class="form__stepper-title form__stepper-title--lit-mb">
                когда отправить сертификат?
              </div>
              <div class="time__row row justify-center">
                <template v-if="!form.formattedDateTime && !selectedGift">
                  <q-btn
                    class="time__btn time__btn--red"
                    label="Сейчас"
                    @click="form.formattedDateTime = 'Сейчас'"
                  />
                  <q-btn
                    class="time__btn"
                    label="выбрать время"
                    color="primary"
                    @click="dateWindow = true"
                  />
                </template>

                <div v-if="form.formattedDateTime" class="time__result">
                  {{ form.formattedDateTime }}
                  <q-btn v-if="form.giftTo === 'gift'" icon="close" dense flat @click="resetDate" />
                </div>
                <q-dialog class="date-modal shadow-0" v-model="dateWindow">
                  <q-card class="date-modal__content">
                    <q-date
                      v-model="selectedDate"
                      minimal
                      :options="disablePastDates"
                      :locale="myLocale"
                    >
                    </q-date>
                    <q-input
                      class="form__input form__input--type-3 date-modal__input"
                      outlined
                      v-model="selectedTime"
                      label="Время отправки (часовой пояс МСК)"
                      stack-label
                      placeholder="Введите время"
                      mask="##:##"
                    />
                    <div class="date-modal__footer row justify-between">
                      <q-btn
                        @click="applyDateTime"
                        outline
                        label="отменить"
                        v-close-popup
                        class="date-modal__button date-modal__button--cancel"
                      />
                      <q-btn
                        @click="applyDateTime"
                        class="date-modal__button date-modal__button--apply shadow-0"
                        label="OK"
                        color="primary"
                        v-close-popup
                      />
                    </div>
                  </q-card>
                </q-dialog>
              </div>
            </div>
            <div class="form__stepper-title form__stepper-title--lit-mb">
              проверьте, всё ли верно:
            </div>
            <div class="data">
              <div class="data__items data__items--w50-mobile">
                <div class="data-item">
                  <div class="data-item__label">Сумма сертификата</div>

                  <div class="data-item__value data-item__value--big">
                    {{ form.customSum ? form.customSum : form.sum }} ₽
                  </div>
                </div>
                <div class="data-item">
                  <div class="data-item__label">Срок действия</div>
                  <div class="data-item__value data-item__value--big">до 12.12.2024</div>
                </div>
              </div>
              <div class="data__items">
                <div class="data-item data-item--right-mob">
                  <div
                    class="data-item__label data-item__label--abs-mob"
                    v-text="form.giftTo === 'toMe' ? 'Получатель' : 'Отправитель'"
                  ></div>

                  <div class="data-item__value">{{ form.recipientName }}</div>
                  <div class="data-item__value">{{ form.recipientPhone }}</div>
                  <div class="data-item__value">{{ form.recipientEmail }}</div>
                </div>
                <div class="data-item data-item--right-mob" v-if="form.giftTo === 'gift'">
                  <div class="data-item__label data-item__label--abs-mob">
                    Получатель
                    <q-icon name="svguse:icons.svg#gift | 0 0 20 20"></q-icon>
                  </div>
                  <div class="data-item__value">{{ form.name }}</div>
                  <div class="data-item__value">{{ form.phone }}</div>
                  <div class="data-item__value">{{ form.email }}</div>
                </div>
              </div>
              <div class="data__items" v-if="form.giftTo === 'gift' && form.comment">
                <div class="data-item">
                  <div class="data-item__label">Поздравление</div>
                  <div class="data-item__value">{{ form.comment }}</div>
                </div>
              </div>
              <q-checkbox v-model="form.agree" size="md">
                Нажимая <strong>«Оплатить»</strong>, я соглашаюсь с
                <a href="/oferta" class="text-primary" target="_blank">Офертой</a> и
                <a href="/policy" class="text-primary" target="_blank"
                  >Политикой обработки персональных данных</a
                >
              </q-checkbox>
              <div v-if="form.errors.agree" class="text-negative">
                {{ form.errors.agree }}
              </div>
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
  </q-page>
</template>

<script>
import { ref, computed, watch } from 'vue'
import IntlTelInput from 'intl-tel-input/vueWithUtils'
import 'intl-tel-input/styles'

export default {
  components: {
    IntlTelInput,
  },
  setup() {
    const step = ref(1)
    const totalSteps = computed(() => (form.value.giftTo === 'toMe' ? 3 : 5))
    const dateWindow = ref(false)
    const selectedDate = null
    const selectedTime = ref('12:00')
    const status = ref(null)
    const myLocale = {
      days: 'Понедельник_Вторник_Среда_Четверг_Пятница_Суббота_Воскресенье'.split('_'),
      daysShort: 'Пн_Вт_Ср_Чт_Пт_Сб_Вс'.split('_'),
      months:
        'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split(
          '_',
        ),
      monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
      firstDayOfWeek: 0,
      format24h: true,
      pluralDay: 'дней',
    }

    const form = ref({
      certificateNumber: '',
      sum: '5 000',
      customSum: '',
      name: '',
      phone: null,
      email: '',
      recipientName: '',
      recipientPhone: '',
      recipientEmail: '',
      giftTo: 'gift',
      acceptPolicy: false,
      comment: '',
      agree: false,
      formattedDateTime: null,
      errors: {
        agree: '',
      },
    })

    function setNow() {
      form.value.formattedDateTime = 'Сейчас'
    }

    function resetDate() {
      selectedDate.value = null
      selectedTime.value = '12:00'
      form.value.formattedDateTime = null
    }

    const disablePastDates = (date) => {
      const today = new Date()
      const formattedToday =
        today.getFullYear() +
        '/' +
        String(today.getMonth() + 1).padStart(2, '0') +
        '/' +
        String(today.getDate()).padStart(2, '0')

      return date >= formattedToday
    }

    function applyDateTime() {
      if (selectedDate.value && selectedTime.value) {
        const formattedDate = new Intl.DateTimeFormat('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(new Date(selectedDate.value))

        form.value.formattedDateTime = `${formattedDate} ${selectedTime.value} (МСК)`
      }
    }

    const errors = ref({})

    const progressWidth = computed(() => `${(step.value / totalSteps.value) * 100}%`)
    const isFirstStep = computed(() => step.value === 1)
    const isLastStep = computed(() => step.value === totalSteps.value)

    function validateCurrentStep() {
      if (form.value.giftTo === 'gift') {
        switch (step.value) {
          case 1:
          case 4:
            return true
          case 2:
            return validateStep2()
          case 3:
            return validateStep3()
          case 5:
            return validateLastStep()
          default:
            return false
        }
      } else {
        switch (step.value) {
          case 1:
            return true
          case 2:
            return validateStep3()
          case 3:
            return validateLastStep()
          default:
            return false
        }
      }
    }

    function nextStep() {
      if (validateCurrentStep() && step.value !== totalSteps.value) {
        step.value++
      }
    }

    function prevStep() {
      if (step.value > 1) {
        step.value--
      }
    }

    function validateStep2() {
      errors.value.name = form.value.name ? '' : 'Введите имя'
      errors.value.phone = form.value.phone ? '' : 'Введите номер телефона'
      errors.value.email =
        form.value.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.value.email)
          ? ''
          : 'Введите корректный email'

      return !errors.value.name && !errors.value.phone && !errors.value.email
    }
    function validateStep3() {
      errors.value.recipientName = form.value.recipientName ? '' : 'Введите имя'
      errors.value.recipientPhone = form.value.recipientPhone ? '' : 'Введите номер телефона'
      errors.value.recipientEmail =
        form.value.recipientEmail && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.value.recipientEmail)
          ? ''
          : 'Введите корректный email'

      return (
        !errors.value.recipientName && !errors.value.recipientName && !errors.value.recipientEmail
      )
    }
    function validateLastStep() {
      if (form.value.acceptPolicy) {
        form.value.errors.agree = ''
        submitPayment()
        return true
      }
      form.value.errors.agree = 'Для продолжения необходимо согласие'
      return false
    }
    function submitPayment() {
      alert('Оплата прошла успешно!')
    }

    watch(
      () => form.value.giftTo,
      (newGiftTo) => {
        if (newGiftTo === 'toMe') {
          form.value.formattedDateTime = 'Сейчас'
        } else {
          form.value.formattedDateTime = null
        }
      },
      { immediate: true },
    )

    return {
      status,
      myLocale,
      step,
      totalSteps,
      dateWindow,
      form,
      errors,
      progressWidth,
      isFirstStep,
      isLastStep,
      selectedDate,
      selectedTime,
      validateCurrentStep,
      validateStep2,
      validateStep3,
      validateLastStep,
      disablePastDates,
      applyDateTime,
      resetDate,
      setNow,
      nextStep,
      prevStep,
      submitPayment,
    }
  },
}
</script>

<style scoped></style>
