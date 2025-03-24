<template>
  <div class="faq">
    <div class="container">
      <div class="faq__title">часто задаваемые вопросы</div>
      <q-list bordered class="faq__list">
        <q-expansion-item
          v-for="(item, index) in faqItems"
          :key="index"
          expand-separator
          group="faq"
          :label="item.question"
          header-class="text-weight-bold"
        >
          <q-card>
            <q-card-section>
              {{ item.answer }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqItems = ref([
  {
    question: 'Где можно купить пластиковый сертификат?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Как пополнить пластиковый сертификат?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Как купить электронный сертификат?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Как узнать баланс карты?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Какой срок действия сертификата?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Где можно воспользоваться сертификатом?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Правила покупки и использования подарочного сертификата',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Правила обмена и возврата сертификата',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
])
</script>

<style lang="scss">
.faq {
  padding: 144px 0 280px;
  @media (max-width: 992px) {
    padding: 60px 0;
  }
  &__title {
    font-family: var(--font-family);
    font-weight: 600;
    font-size: 32px;
    line-height: 125%;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    text-align: center;
    color: #fff;
    margin-bottom: 64px;
    @media (max-width: 992px) {
      font-size: 20px;
    }
  }
  &__list {
    max-width: 1120px;
    margin: 0 auto;
    border: 0;
    .q-expansion-item + .q-expansion-item {
      margin-top: 16px;
    }
    .q-item {
      padding: 16px 24px;
      box-sizing: border-box;

      @media (max-width: 992px) {
        padding: 0.75rem 1rem;
      }
    }
    .q-expansion-item {
      position: relative;
      overflow: hidden;
      background: rgba(91, 137, 248, 0.05);
      border-radius: 16px;
      transition: 0.3s;
      .q-separator {
        display: none;
      }
      .q-card {
        background: transparent;
      }
      &--expanded {
        background: #282d37;
        .q-focus-helper {
          opacity: 0 !important;
        }
        .q-item__label {
          color: #5b89f8;
        }
      }
    }
    .q-item__label {
      font-family: var(--second-family);
      font-weight: 500;
      font-size: 24px;
      line-height: 121%;
      color: #c4c8cf;
      @media (max-width: 992px) {
        font-size: 16px;
      }
    }
    .q-list--dark .q-item__section--side:not(.q-item__section--avatar),
    .q-item--dark .q-item__section--side:not(.q-item__section--avatar) {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      border: 1px solid #0554f8;
      border-radius: 12px;
      width: 48px;
      height: 48px;
      background: rgba(5, 84, 248, 0.1);
      @media (max-width: 992px) {
        height: 32px;
        width: 32px;
      }
    }
    .q-card__section {
      padding: 16px 24px 32px;
      font-weight: 500;
      font-size: 18px;
      line-height: 121%;
      color: #8f96a3;
      @media (max-width: 992px) {
        font-size: 16px;
      }
    }
  }
}
</style>
