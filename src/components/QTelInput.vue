<template>
  <q-input v-model="phone" outlined label="Номер телефона" :rules="[validatePhone]">
    <template v-slot:prepend>
      <q-btn-dropdown flat>
        <template v-slot:label>
          <img :src="selectedCountryFlag" width="24" height="16" />
        </template>
        <q-list>
          <q-item
            v-for="country in countryOptions"
            :key="country.iso2"
            clickable
            v-close-popup
            @click="selectCountry(country)"
          >
            <q-item-section avatar>
              <img :src="getFlag(country.iso2)" width="24" height="16" />
            </q-item-section>
            <q-item-section> {{ country.name }} ({{ country.dialCode }}) </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </template>
  </q-input>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { allCountries } from 'vue-tel-input' // <-- Используем новый метод

export default {
  props: {
    modelValue: String,
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const phone = ref(props.modelValue)
    const selectedCountry = ref('ru')
    const countryOptions = ref([])

    const getFlag = (iso) => `/flags/${iso}.svg`
    const selectedCountryFlag = computed(() => getFlag(selectedCountry.value))

    const selectCountry = (country) => {
      selectedCountry.value = country.iso2
      phone.value = `+${country.dialCode} `
      emit('update:modelValue', phone.value)
    }

    const validatePhone = (val) => val.length > 4 || 'Введите корректный номер'

    onMounted(() => {
      countryOptions.value = allCountries.map((c) => ({
        name: c.name,
        dialCode: c.dialCode,
        iso2: c.iso2,
      }))
    })

    return {
      phone,
      selectedCountry,
      selectedCountryFlag,
      countryOptions,
      getFlag,
      selectCountry,
      validatePhone,
    }
  },
}
</script>
