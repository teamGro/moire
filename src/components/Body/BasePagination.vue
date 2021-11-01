<template>
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
    <li
      class="pagination__item"
      v-for="pageNum in pages"
      :key="pageNum"
    >
      <a
        class="pagination__link"
        :class="{'pagination__link--current': pageNum === page}"
      >
        {{ pageNum }}
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
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: ['page', 'productsPerPage', 'count'],
  setup(props) {
    const pages = computed(() => Math.ceil(props.count / props.productsPerPage));

    return {
      pages,
    };
  },
});
</script>
