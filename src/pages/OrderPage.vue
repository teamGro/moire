<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'Main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'Basket' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">Оформление заказа</h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div class="cart__data">
            <OrderInput
              type="text"
              name="name"
              placeholder="Введите ваше полное имя"
              title="ФИО"
              v-model:data="userData.name"
              :error="errors.name"
            />

            <OrderInput
              type="text"
              name="address"
              placeholder="Введите ваш адрес"
              title="Адрес доставки"
              v-model:data="userData.address"
              :error="errors.address"
            />

            <OrderInput
              type="tel"
              name="phone"
              placeholder="Введите ваш телефон"
              title="Телефон"
              v-model:data="userData.phone"
              :error="errors.phone"
            />

            <OrderInput
              type="email"
              name="email"
              placeholder="Введи ваш Email"
              title="Email"
              v-model:data="userData.email"
              :error="errors.email"
            />

            <OrderTextarea
              name="comments"
              placeholder="Ваши пожелания"
              title="Комментарий к заказу"
              v-model:data="userData.comments"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="1"
                    checked=""
                    v-model="userData.deliveryTypeId"
                  />
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    value="2"
                    v-model="userData.deliveryTypeId"
                  />
                  <span class="options__value"> Курьером <b>290 ₽</b> </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    value="1"
                    checked=""
                    v-model="userData.paymentTypeId"
                  />
                  <span class="options__value"> Картой при получении </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="cash"
                    value="2"
                    v-model="userData.paymentTypeId"
                  />
                  <span class="options__value"> Наличными при получении </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li
              class="cart__order"
              v-for="product in products"
              :key="product.id"
            >
              <h3>{{ product.title }}</h3>
              <b>{{ formatNumber(product.price) }} ₽</b>
              <span>Артикул: 150030</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>бесплатно</b></p>
            <p>
              Итого: <b>{{ products.length }}</b> товара на сумму
              <b>{{ calculateTotalPrice() }} ₽</b>
            </p>
          </div>

          <button
            class="cart__button button button--primery"
            type="submit"
            @click.prevent="sendUserData"
          >
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="errorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ errorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import {
  computed, defineComponent, reactive, ref,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';
import formatNumber from '@/helpers/formatNumber';
import OrderInput from '../components/OrderForm/OrderInput.vue';
import OrderTextarea from '../components/OrderForm/OrderTextarea.vue';
import url from '@/helpers/apiURL';

export default defineComponent({
  components: { OrderInput, OrderTextarea },
  setup() {
    const store = useStore();
    const router = useRouter();
    const products = computed(() => store.getters.getBasketItems);
    const userData = reactive({
      deliveryTypeId: 1,
      paymentTypeId: 1,
    });
    const errors = ref({});
    const errorMessage = ref('');
    const accessKey = computed(() => store.state.accessKey);

    function calculateTotalPrice() {
      const totalPrice = products.value.reduce((sum, cur) => cur.price * cur.quantity + sum, 0);
      return formatNumber(totalPrice);
    }

    function sendUserData() {
      errors.value = {};
      errorMessage.value = '';
      axios
        .post(`${url.urlPart}orders?userAccessKey=${accessKey.value}`, {
          ...userData,
        })
        .then((response) => {
          store.commit('saveOrderInfo', response.data);
          router.push({ name: 'OrderInfo', params: { id: response.data.id } });
        })
        .catch((err) => {
          errors.value = err.response.data.error.request || {};
          errorMessage.value = 'Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.';
        });
    }

    return {
      products,
      formatNumber,
      userData,
      errors,
      errorMessage,
      calculateTotalPrice,
      sendUserData,
    };
  },
});
</script>
