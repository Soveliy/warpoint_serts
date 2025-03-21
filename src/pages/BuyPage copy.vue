<template>
  <q-page class="flex">
    <q-stepper v-model="step" flat header-nav animated keep-alive>
      <!-- Шаг 1: Ввод номера сертификата -->
      <q-step name="1" title="Шаг 1" subtitle="Введите данные сертификата">
        <div class="form__body">
          <q-input
            class="form__input"
            filled
            v-model="form.certificateNumber"
            label="Номер сертификата"
            :rules="[(val) => !!val || 'Поле обязательно']"
            lazy-rules
            @input="errors.step1 = ''"
          />
          <div class="q-mt-md">
            <q-btn class="form__button" color="primary" label="Далее" @click="goToStep2" />
            <div v-if="errors.step1" class="text-negative q-mt-xs">
              {{ errors.step1 }}
            </div>
          </div>
        </div>
      </q-step>

      <!-- Шаг 2: Выбор суммы пополнения -->
      <q-step name="2" title="Шаг 2" subtitle="Выберите сумму пополнения">
        <div class="form__body">
          <q-radio
            v-model="form.sum"
            val="1000"
            label="1 000 ₽"
            @update:model-value="onSumChange"
          />
          <q-radio
            v-model="form.sum"
            val="5000"
            label="5 000 ₽"
            @update:model-value="onSumChange"
          />
          <q-radio
            v-model="form.sum"
            val="10000"
            label="10 000 ₽"
            @update:model-value="onSumChange"
          />
          <q-radio
            v-model="form.sum"
            val="20000"
            label="20 000 ₽"
            @update:model-value="onSumChange"
          />
          <q-radio
            v-model="form.sum"
            val="50000"
            label="50 000 ₽"
            @update:model-value="onSumChange"
          />
          <q-radio
            v-model="form.sum"
            val="custom"
            label="Другая сумма (от 500 до 100 000 ₽)"
            @update:model-value="onSumChange"
          />
          <!-- Поле для ввода произвольной суммы -->
          <q-input
            v-if="form.sum === 'custom'"
            filled
            type="number"
            v-model.number="form.customSum"
            label="Введите сумму"
            :rules="[customSumRule]"
            lazy-rules
            @input="errors.step2 = ''"
            class="q-mt-md"
          />
          <div class="q-mt-md">
            <q-btn class="form__button" color="primary" label="Далее" @click="goToStep3" />
            <q-btn flat color="secondary" label="Назад" class="q-ml-sm" @click="step = '1'" />
            <div v-if="errors.step2" class="text-negative q-mt-xs">
              {{ errors.step2 }}
            </div>
          </div>
        </div>
      </q-step>

      <!-- Шаг 3: Контактные данные -->
      <q-step name="3" title="Шаг 3" subtitle="Введите контактные данные">
        <div class="form__body">
          <q-input
            class="form__input"
            filled
            v-model="form.name"
            label="Имя"
            :rules="[(val) => !!val || 'Поле обязательно']"
            lazy-rules
            @input="errors.step3 = ''"
          />
          <q-input
            class="form__input"
            filled
            v-model="form.phone"
            label="Телефон"
            :rules="[phoneRule]"
            lazy-rules
            @input="errors.step3 = ''"
          />
          <q-input
            class="form__input"
            filled
            v-model="form.email"
            label="Email"
            :rules="[emailRule]"
            lazy-rules
            @input="errors.step3 = ''"
          />
          <div class="q-mt-md">
            <q-btn class="form__button" color="primary" label="Далее" @click="goToStep4" />
            <q-btn flat color="secondary" label="Назад" class="q-ml-sm" @click="step = '2'" />
            <div v-if="errors.step3" class="text-negative q-mt-xs">
              {{ errors.step3 }}
            </div>
          </div>
        </div>
      </q-step>

      <!-- Шаг 4: Подтверждение -->
      <q-step name="4" title="Шаг 4" subtitle="Подтверждение">
        <div class="form__body">
          <div><b>Номер сертификата:</b> {{ form.certificateNumber }}</div>
          <div>
            <b>Сумма:</b>
            <span v-if="form.sum !== 'custom'"> {{ formatSum(form.sum) }} ₽ </span>
            <span v-else> {{ form.customSum }} ₽ </span>
          </div>
          <div><b>Имя:</b> {{ form.name }}</div>
          <div><b>Телефон:</b> {{ form.phone }}</div>
          <div><b>Email:</b> {{ form.email }}</div>
          <div><b>Срок действия:</b> до 12.12.2024 (пример)</div>
          <q-checkbox
            v-model="form.acceptPolicy"
            label="Нажимая «Оплатить», я соглашаюсь с Офертой и Политикой обработки персональных данных"
            class="q-mt-md"
            :rules="[(val) => !!val || 'Необходимо принять условия']"
            lazy-rules
            @update:model-value="errors.step4 = ''"
          />
          <div class="q-mt-md">
            <q-btn class="form__button" color="primary" label="Оплатить" @click="submitPayment" />
            <q-btn flat color="secondary" label="Назад" class="q-ml-sm" @click="step = '3'" />
          </div>
          <div v-if="errors.step4" class="text-negative q-mt-xs">
            {{ errors.step4 }}
          </div>
          <!-- Блок для отображения результата оплаты -->
          <div v-if="paymentResult.status" class="q-mt-lg">
            <div :class="paymentResult.success ? 'text-positive' : 'text-negative'">
              {{ paymentResult.message }}
            </div>
          </div>
        </div>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
export default {
  name: 'CertificateActivation',
  data() {
    return {
      step: '1',
      form: {
        certificateNumber: '',
        sum: null,
        customSum: null,
        name: '',
        phone: '',
        email: '',
        acceptPolicy: false,
      },
      errors: {
        step1: '',
        step2: '',
        step3: '',
        step4: '',
      },
      paymentResult: {
        status: false,
        success: false,
        message: '',
      },
    }
  },
  computed: {
    customSumRule() {
      return (val) => {
        if (this.form.sum !== 'custom') return true
        if (!val) return 'Поле обязательно'
        const numericVal = parseInt(val, 10)
        if (numericVal < 500 || numericVal > 100000) {
          return 'Сумма должна быть от 500 до 100000'
        }
        return true
      }
    },
    phoneRule() {
      return (val) => {
        if (!val) {
          return 'Поле обязательно'
        }
        // Пример простой проверки на длину номера
        return val.length >= 10 || 'Номер должен содержать не менее 10 символов'
      }
    },
    emailRule() {
      return (val) => {
        if (!val) {
          return 'Поле обязательно'
        }
        // Простейшая проверка формата email
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return pattern.test(val) || 'Неверный формат email'
      }
    },
  },
  methods: {
    onSumChange() {
      // Если выбрана фиксированная сумма, сбрасываем customSum
      if (this.form.sum !== 'custom') {
        this.form.customSum = null
      }
    },
    goToStep2() {
      // Проверка шага 1
      if (!this.form.certificateNumber) {
        this.errors.step1 = 'Введите номер сертификата'
      } else {
        this.step = '2'
      }
    },
    goToStep3() {
      // Проверка шага 2
      if (!this.form.sum) {
        this.errors.step2 = 'Выберите сумму'
        return
      }
      if (this.form.sum === 'custom') {
        const check = this.customSumRule(this.form.customSum)
        if (check !== true) {
          this.errors.step2 = check
          return
        }
      }
      this.step = '3'
    },
    goToStep4() {
      // Проверка шага 3
      if (!this.form.name) {
        this.errors.step3 = 'Введите имя'
        return
      }
      const phoneCheck = this.phoneRule(this.form.phone)
      if (phoneCheck !== true) {
        this.errors.step3 = phoneCheck
        return
      }
      const emailCheck = this.emailRule(this.form.email)
      if (emailCheck !== true) {
        this.errors.step3 = emailCheck
        return
      }
      this.step = '4'
    },
    submitPayment() {
      // Проверка принятия условий
      if (!this.form.acceptPolicy) {
        this.errors.step4 = 'Необходимо принять условия'
        return
      }
      // Здесь можно вызвать реальный метод оплаты
      // Для примера сделаем фейковый ответ

      // Сброс результата предыдущей попытки
      this.paymentResult = { status: false, success: false, message: '' }

      // Имитация успешной/неуспешной оплаты
      const isSuccess = Math.random() > 0.5
      this.paymentResult.status = true
      this.paymentResult.success = isSuccess
      this.paymentResult.message = isSuccess
        ? 'Оплата прошла успешно! Спасибо, что выбрали Warpoint!'
        : 'Оплата не прошла. Проверьте, достаточно ли средств или повторите попытку.'
    },
    formatSum(value) {
      return Number(value).toLocaleString('ru-RU')
    },
  },
}
</script>

<style scoped>
/* Без дополнительных стилей – только базовая логика */
</style>
