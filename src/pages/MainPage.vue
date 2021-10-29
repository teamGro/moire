<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{ productsQty }} товара
        </span>
      </div>
    </div>

    <div class="content__catalog">

      <filters></filters>

      <section class="catalog">

        <product-list></product-list>

        <ul class="catalog__pagination pagination">
          <li class="pagination__item">
            <a
              class="pagination__link pagination__link--arrow pagination__link--disabled"
              aria-label="Предыдущая страница"
            >
              <svg
                width="8"
                height="14"
                fill="currentColor"
              >
                <use xlink:href="#icon-arrow-left"></use>
              </svg>
            </a>
          </li>
          <li class="pagination__item">
            <a class="pagination__link pagination__link--current">
              1
            </a>
          </li>
          <li class="pagination__item">
            <a
              class="pagination__link"
              href="#"
            >
              2
            </a>
          </li>
          <li class="pagination__item">
            <a
              class="pagination__link"
              href="#"
            >
              3
            </a>
          </li>
          <li class="pagination__item">
            <a
              class="pagination__link"
              href="#"
            >
              4
            </a>
          </li>
          <li class="pagination__item">
            <a
              class="pagination__link"
              href="#"
            >
              ...
            </a>
          </li>
          <li class="pagination__item">
            <a
              class="pagination__link"
              href="#"
            >
              10
            </a>
          </li>
          <li class="pagination__item">
            <a
              class="pagination__link pagination__link--arrow"
              href="#"
              aria-label="Следующая страница"
            >
              <svg
                width="8"
                height="14"
                fill="currentColor"
              >
                <use xlink:href="#icon-arrow-right"></use>
              </svg>
            </a>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import Filters from '@/components/Body/Filters.vue';
import ProductList from '@/components/Body/ProductList.vue';

export default defineComponent({
  components: { Filters, ProductList },
  setup() {
    const store = useStore();

    return {
      productsQty: computed(() => store.getters.getProductsQty || 0),
    };
  },
});
</script>
