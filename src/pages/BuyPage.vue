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
          <q-step :name="1" subtitle="Введите данные">
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
              <div class="to-whom__row">
                <q-radio
                  v-model="form.giftTo"
                  val="myself"
                  label="Себе"
                  :error="errors.giftTo"
                  :error-message="errors.giftTo"
                />
                <q-radio
                  v-model="form.giftTo"
                  val="gift"
                  label="В подарок"
                  :error="errors.giftTo"
                  :error-message="errors.giftTo"
                />
              </div>
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
                  v-model="text"
                  label="или укажите свою"
                  stack-label
                  placeholder="от 500 до 100 000 ₽"
                  :dense="dense"
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
          <q-step :name="2" subtitle="Введите данные">
            <div class="form__stepper-title">кому подарок</div>
            <div class="form__stepper-desc">Сертификат мы отправим на указанный e-mail</div>
            <div class="form__group">
              <div class="form__item">
                <q-input
                  class="form__input form__input--type-2"
                  outlined
                  v-model="form.name"
                  label="Имя"
                  stack-label
                  placeholder="Введите имя"
                  :dense="dense"
                />
              </div>
              <div class="form__item">
                <div class="phone-input">
                  <IntlTelInput
                    v-model="form.phone"
                    :options="{
                      initialCountry: 'ru',
                      separateDialCode: true,
                      strictMode: true,
                    }"
                  />
                  <label for="" class="form__item-label">телефон</label>
                </div>
                <!-- <q-input
                  class="form__input form__input--type-2"
                  outlined
                  v-model="form.phone"
                  label="телефон"
                  stack-label
                  placeholder="+7 (000) 000-00-00"
                  :dense="dense"
                /> -->
              </div>
              <div class="form__item">
                <q-input
                  class="form__input form__input--type-2"
                  outlined
                  v-model="form.email"
                  label="email"
                  stack-label
                  placeholder="youremail@email.com"
                  :dense="dense"
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
          <q-step :name="3" subtitle="Введите данные">
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
                  :dense="dense"
                />
              </div>
              <div class="form__item">
                <q-input
                  class="form__input form__input--type-2"
                  outlined
                  v-model="form.recipientPhone"
                  label="телефон"
                  stack-label
                  placeholder="+7 (000) 000-00-00"
                  :dense="dense"
                />
              </div>
              <div class="form__item">
                <q-input
                  class="form__input form__input--type-2"
                  outlined
                  v-model="form.recipientEmail"
                  label="email"
                  stack-label
                  placeholder="youremail@email.com"
                  :dense="dense"
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

          <q-step :name="4" subtitle="Введите данные">
            <div class="form__group">
              <div class="form__item">
                <q-input
                  class="form__textarea"
                  outlined
                  v-model="form.comment"
                  label="поздравление"
                  stack-label
                  placeholder="Добавьте приятных слов к подарку"
                  :dense="dense"
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
          <q-step :name="5" subtitle="Введите данные">
            <div class="time">
              <div class="form__stepper-title">когда отправить подарок?</div>
              <div class="time__row row justify-center">
                <q-btn class="time__btn time__btn--red" label="Сейчас" @click="alert = true" />
                <q-btn
                  class="time__btn"
                  label="выбрать время"
                  color="primary"
                  @click="dateWindow = true"
                />
                <q-dialog v-model="dateWindow">
                  <q-card>
                    <q-date v-model="form.date" minimal :locale="myLocale" />
                    <q-input
                      class="form__input form__input--type-3"
                      outlined
                      v-model="form.recipientName"
                      label="Имя"
                      stack-label
                      placeholder="Введите имя"
                    />
                    <q-card-actions align="center">
                      <q-btn flat label="OK" color="primary" v-close-popup />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </div>
            </div>
            <div class="form__stepper-title">проверьте, всё ли верно:</div>
            <div class="data">
              <div class="data__items">
                <div class="data-item">
                  <div class="data-item__label">Сумма сертификата</div>
                  <div class="data-item__value">{{ form.sum }}</div>
                </div>
                <div class="data-item">
                  <div class="data-item__label">Срок действия</div>
                  <div class="data-item__value">до 12.12.2024</div>
                </div>
              </div>
              <div class="data__items">
                <div class="data-item">
                  <div class="data-item__label">Отправитель</div>
                  <div class="data-item__value">{{ form.name }}</div>
                  <div class="data-item__value">{{ form.phone }}</div>
                  <div class="data-item__value">{{ form.email }}</div>
                </div>
                <div class="data-item">
                  <div class="data-item__label">Получатель</div>
                  <div class="data-item__value">{{ form.recipientName }}</div>
                  <div class="data-item__value">{{ form.recipientPhone }}</div>
                  <div class="data-item__value">{{ form.recipientEmail }}</div>
                </div>
              </div>
              <div class="data__items">
                <div class="data-item">
                  <div class="data-item__label">Поздравление</div>
                  <div class="data-item__value">{{ form.comment }}</div>
                </div>
              </div>
              <q-checkbox v-model="form.agree" size="md">
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
    const totalSteps = computed(() => (form.value.giftTo === 'toMe' ? 3 : 5))
    const dateWindow = ref(false)
    const myLocale = {
      /* начиная с понедельника */
      days: 'Понедельник_Вторник_Среда_Четверг_Пятница_Суббота_Воскресенье'.split('_'),
      daysShort: 'Пн_Вт_Ср_Чт_Пт_Сб_Вс'.split('_'),
      months:
        'Январь_Февраль_Март_Апрель_Май_Июнь_Июль_Август_Сентябрь_Октябрь_Ноябрь_Декабрь'.split(
          '_',
        ),
      monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
      firstDayOfWeek: 1, // 0-6, 0 - Воскресенье, 1 - Понедельник, ...
      format24h: true,
      pluralDay: 'дней',
    }
    const form = ref({
      certificateNumber: '',
      sum: null,
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
    })

    const errors = ref({})

    const progressWidth = computed(() => `${(step.value / totalSteps.value) * 100}%`)
    const isFirstStep = computed(() => step.value === 1)
    const isLastStep = computed(() => step.value === totalSteps.value)

    function nextStep() {
      if (step.value < totalSteps.value) {
        step.value++
      }
    }

    function prevStep() {
      if (step.value > 1) {
        step.value--
      }
    }

    function submitPayment() {
      alert('Оплата прошла успешно!')
    }

    return {
      myLocale,
      step,
      totalSteps,
      dateWindow,
      form,
      errors,
      progressWidth,
      isFirstStep,
      isLastStep,
      nextStep,
      prevStep,
      submitPayment,
    }
  },
}
</script>

<style scoped></style>
