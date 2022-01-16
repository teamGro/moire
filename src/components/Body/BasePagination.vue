<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === 1 }"
        aria-label="Предыдущая страница"
        @click.prevent="onPrevPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li
      class="pagination__item"
      v-for="pageNum in pages"
      :key="pageNum"
      @click="onPage(pageNum)"
    >
      <a
        class="pagination__link"
        :class="{ 'pagination__link--current': pageNum === page }"
      >
        {{ pageNum }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page === pages }"
        aria-label="Следующая страница"
        @click.prevent="onNextPage"
      >
        <!-- href="#" -->
        <svg width="8" height="14" fill="currentColor">
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
  setup(props, context) {
    const pages = computed(() => Math.ceil(props.count / props.productsPerPage));

    const onNextPage = () => {
      if (props.page === pages.value) return;
      const currentPage = props.page + 1;
      context.emit('update:page', currentPage);
    };

    const onPrevPage = () => {
      if (props.page === 1) return;
      const currentPage = props.page - 1;
      context.emit('update:page', currentPage);
    };

    const onPage = (pageNumber) => {
      context.emit('update:page', pageNumber);
    };

    return {
      pages,
      onNextPage,
      onPrevPage,
      onPage,
    };
  },
});
</script>
