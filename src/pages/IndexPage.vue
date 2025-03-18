<template>
  <q-page class="flex flex-center column hero">
    <div class="container">
      <h1 class="hero__title q-ma-none">ПОДАРОЧНЫЕ СЕРТИФИКАТЫ</h1>
      <p class="hero__desc q-ma-none">Подарите билет в виртуальный мир WARPOINT</p>
      <div class="hero__cards">
        <div class="row hero__cards-row justify-center">
          <q-card class="card" flat>
            <q-card-section>
              <div class="card__top">
                <q-img src="~assets/card.svg" />
                <h3 class="card__title q-ma-none">ПЛАСТИКОВЫЙ СЕРТИФИКАТ</h3>
              </div>
              <div class="card__desc">
                <p>
                  Для тех, кто предпочитает вручать подарки лично! Приобрести пластиковый сертификат
                  можно <b>только на локации</b>.
                </p>
                <p>
                  Если вы уже забрали сертификат, активируйте его, пополнив баланс на необходимую
                  сумму
                </p>
              </div>
              <q-btn class="card__button" color="primary" to="/activate/" label="активировать" />
            </q-card-section>
          </q-card>

          <q-card class="card" flat>
            <q-card-section>
              <div class="card__top">
                <q-img src="~assets/gift.svg" />
                <h3 class="card__title q-ma-none">online-сертификат</h3>
              </div>
              <div class="card__desc">
                <p>
                  Мгновение — и подарочный сертификат в вашем распоряжении. Подарок прилетит на
                  e-mail получателя
                </p>
              </div>
              <q-btn class="card__button" color="primary" to="/buy/" label="купить" />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <q-card class="card card--full" flat>
      <q-card-section>
        <div class="card__top">
          <h3 class="card__title q-ma-none">У вас есть сертификат?</h3>
          <q-img src="~assets/heart.svg" />
        </div>
        <div class="card__desc">
          <p>
            Ура! Самое время отправиться тратить денежки! А&nbsp;здесь можно узнать точное
            их&nbsp;количество:
          </p>
        </div>
        <q-btn class="card__button" color="primary" to="/examination/" label="проверить баланс" />
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
  padding-top: 80px;
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
  &__cards {
    margin-top: 58px;
    &-row {
      gap: 104px;
    }
  }
}
.card {
  border-radius: 0.5rem;
  padding: 2rem 0rem;
  max-width: 640px;
  width: 100%;
  background-color: #0d0e10;
  &--full {
    margin-top: 32px;
    max-width: 100%;
    .card__desc {
      margin: 0 auto 16px;
      max-width: 508px;
      padding: 0;
    }
  }
  &__top {
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: center;
    margin-bottom: 24px;
    .q-img {
      width: 48px;
      height: 48px;
    }
  }
  &__title {
    font-weight: 600;
    font-size: 28px;
    line-height: 129%;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    text-align: center;
    color: #ececee;
  }
  &__desc {
    font-family: var(--second-family);
    font-weight: 500;
    font-size: 18px;
    line-height: 121%;
    text-align: center;
    color: #8f96a3;
    text-align: center;
    margin-bottom: 24px;
    padding: 0 60px;
    box-sizing: border-box;
    p {
      margin-bottom: 0;
      margin-top: 20px;
    }
    > *:first-child {
      margin-top: 0;
    }
    > *:last-child {
      margin-bottom: 0;
    }

    b {
      font-weight: 700;
      color: #ececee;
    }
  }
  &__button {
    display: block;
    margin: auto auto 0;
    width: 100%;
    max-width: 224px;
    border-radius: 10px;
    padding: 12px;
    box-sizing: border-box;
    font-weight: 600;
    font-size: 13px;
    line-height: 123%;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #c4c8cf;
  }
  .q-card__section {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
