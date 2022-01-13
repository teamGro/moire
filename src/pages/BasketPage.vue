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
            Итого: <span>{{ calculateTotalPrice() }} ₽</span>
          </p>

          <router-link
            tag="button"
            class="cart__button button button--primery"
            :to="{ name: 'Order' }"
          >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import ProductChangeQty from '@/components/ProductChangeQty.vue';

export default defineComponent({
  components: { ProductChangeQty },
  setup() {
    const store = useStore();
    const basketItems = computed(() => store.getters.getBasketItems);

    function calculateTotalPrice() {
      let totalPrice = 0;
      basketItems.value.forEach((item) => {
        totalPrice += item.price;
      });

      return totalPrice;
    }

    function deleteProduct(e, id) {
      store.dispatch('deleteProductFromBasket', id);
    }

    return {
      basketItems,
      calculateTotalPrice,
      deleteProduct,
    };
  },
});
</script>
