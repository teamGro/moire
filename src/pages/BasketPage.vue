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
          <a class="breadcrumbs__link"> Корзина </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">Корзина</h1>
        <span class="content__info"> {{ basketItems.length }} товара </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <li
              class="cart__item product"
              v-for="item in basketItems"
              :key="item.id"
            >
              <div class="product__pic">
                <img
                  :src="item.image"
                  width="120"
                  height="120"
                  :alt="item.title"
                />
              </div>
              <h3 class="product__title">{{ item.title }}</h3>
              <p class="product__info product__info--color">
                Цвет:
                <span>
                  <i :style="{ 'background-color': item.color.color.code }"></i>
                  {{ item.color.color.title }}
                </span>
              </p>
              <span class="product__code"> Артикул: 1501230 </span>

              <ProductChangeQty v-model:qty="item.quantity" :id="item.id" />

              <b class="product__price"> {{ item.price }} ₽ </b>

              <button
                class="product__del button-del"
                type="button"
                aria-label="Удалить товар из корзины"
                @click="deleteProduct($event, item.id)"
              >
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ calculateTotalPrice }} ₽</span>
          </p>

          <a
            tag="button"
            class="cart__button button button--primery"
            @click.prevent="goToOrder"
          >
            Оформить заказ
          </a>
        </div>
        <div class="cart__error form__error-block" v-if="basketError">
          <h4>Оформление заказа невозможно!</h4>
          <p>Корзина пуста!</p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ProductChangeQty from '@/components/ProductChangeQty.vue';
import formatNumber from '@/helpers/formatNumber';

export default defineComponent({
  components: { ProductChangeQty },
  setup() {
    const store = useStore();
    const router = useRouter();
    const basketItems = computed(() => store.getters.getBasketItems);
    const basketError = ref(false);

    const calculateTotalPrice = computed(() => {
      const total = basketItems.value.reduce((sum, cur) => cur.price * cur.quantity + sum, 0);
      return formatNumber(total);
    });

    function deleteProduct(e, id) {
      store.dispatch('deleteProductFromBasket', id);
    }

    function goToOrder() {
      if (!store.state.basket.items.length) {
        basketError.value = true;
        return;
      }
      router.push({ name: 'Order' });
      basketError.value = false;
    }

    return {
      basketItems,
      calculateTotalPrice,
      basketError,
      deleteProduct,
      goToOrder,
    };
  },
});
</script>
