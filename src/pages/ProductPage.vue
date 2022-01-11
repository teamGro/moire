<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'Main'}">
                Каталог
            </router-link>
        </li>
        <li class="breadcrumbs__item">
            <router-link class="breadcrumbs__link" :to="{name: 'Main'}">
                {{ product.category.title }}
            </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{product.title}}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
          width="570"
          height="570"
          :src="product.img"
          :alt="product.title">
        </div>
        <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img width="98" height="98" src="img/product-square-2.jpg" alt="Название товара">
            </a>
          </li>
          <li class="pics__item">
            <a href="" class="pics__link">
              <img width="98" height="98" src="img/product-square-3.jpg" alt="Название товара">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: 150030</span>
        <h2 class="item__title">
          {{ product.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <div class="item__row item__row--center">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" value="1" name="count">

                <button type="button" aria-label="Добавить один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="item__price">
                {{ product.price}} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                    <li class="colors__item" v-for="color in product.colors" :key="color.id">
                        <label class="colors__label" >
                            <input
                            class="colors__radio sr-only"
                            type="radio"
                            name="color-item"
                            value="blue"
                            checked="">
                            <span
                                class="colors__value"
                                :style="{'background-color': color.color.code}">
                            </span>
                        </label>
                    </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" name="category">
                    <option
                        v-for="size in product.sizes"
                        :key="size.id"
                        :value="size.id">{{ size.title }}</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit">
              В корзину
            </button>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>

        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const route = useRoute();
    const store = useStore();

    store.dispatch('getProduct', route.params.id);

    return {
      product: computed(() => store.state.product),
    };
  },
});
</script>
