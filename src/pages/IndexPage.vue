<template>
  <q-page class="flex flex-center column hero">
    <h1 class="hero__title">ПОДАРОЧНЫЕ СЕРТИФИКАТЫ</h1>
    <p class="hero__desc">Подарите билет в виртуальный мир WARPOINT</p>

    <q-card class="my-card">
      <q-card-section>
        <h2>ПЛАСТИКОВЫЙ СЕРТИФИКАТ</h2>
        <p>
          Для тех, кто предпочитает вручать подарки лично! Приобрести пластиковый сертификат можно
          только на локации.
        </p>
        <p>Если вы уже забрали сертификат, активируйте его, пополнив баланс на необходимую сумму</p>
        <q-btn color="primary" to="/activate/" label="активировать" />
      </q-card-section>
    </q-card>

    <q-card class="my-card">
      <q-card-section>
        <h2>ONLINE-СЕРТИФИКАТ</h2>
        <p>
          Мгновение — и подарочный сертификат в вашем распоряжении. Подарок прилетит на e-mail
          получателя
        </p>
        <q-btn color="primary" label="КУПИТЬ" />
      </q-card-section>
    </q-card>

    <q-card class="my-card">
      <q-card-section>
        <h2>У ВАС ЕСТЬ СЕРТИФИКАТ?</h2>
        <p>Ура! Самое время отправиться тратить денежки!</p>
        <p>А здесь можно узнать точное их количество:</p>
        <q-btn color="primary" to="/examination/" label="ПРОВЕРИТЬ БАЛАНС" />
      </q-card-section>
    </q-card>
  </q-page>
  <FaqSection></FaqSection>
</template>

<script setup>
//
import FaqSection from 'src/components/FaqSection.vue'
</script>

<style lang="scss" scoped>
.hero {
  &__title {
    font-weight: 600;
    font-size: 40px;
    line-height: 140%;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    text-align: center;
    color: #fff;
  }
  &__desc {
    font-weight: 500;
    font-size: 22px;
    line-height: 121%;
    text-align: center;
    color: #8f96a3;
  }
}
</style>
