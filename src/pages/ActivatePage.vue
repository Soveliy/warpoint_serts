<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md">
      <q-stepper v-model="step" vertical>
        <q-step :name="1" title="Введите данные сертификата">
          <q-input v-model="certificateNumber" label="Номер сертификата" />
          <q-btn label="Далее" @click="step = 2" color="primary" />
        </q-step>

        <q-step :name="2" title="Выберите сумму пополнения">
          <q-btn
            v-for="amount in amounts"
            :key="amount"
            @click="selectAmount(amount)"
            :label="`${amount} ₽`"
          />
          <q-btn label="Далее" @click="step = 3" color="primary" />
        </q-step>

        <q-step :name="3" title="Ваши контактные данные">
          <q-input v-model="name" label="Имя" />
          <q-input v-model="phone" label="Телефон" />
          <q-input v-model="email" label="Email" />
          <q-btn label="Отправить" @click="submitForm" color="primary" />
        </q-step>
      </q-stepper>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const step = ref(1)
const certificateNumber = ref('')
const name = ref('')
const phone = ref('')
const email = ref('')
const amounts = ref([1000, 5000, 10000, 20000, 50000])
const selectedAmount = ref(null)

const selectAmount = (amount) => {
  selectedAmount.value = amount
}

const submitForm = () => {
  console.log({ certificateNumber, name, phone, email, selectedAmount })
}
</script>
