<template>
  <aside class="filter">
    <form autocomplete="off" class="filter__form form">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>

        <base-filter-input
          name="min-price"
          placeholder="0"
          title="От"
          v-model:price="minPrice"
        ></base-filter-input>

        <base-filter-input
          name="max-price"
          placeholder="12345"
          title="До"
          v-model:price="maxPrice"
        ></base-filter-input>
      </fieldset>

      <base-filter-categories
        title="Категория"
        :categories="categories"
        v-model:category="currentCategory"
      >
      </base-filter-categories>

      <color-filter
        title="Цвет"
        :colors="colors"
        v-model:colorIds="colorIds"
      ></color-filter>

      <base-filter-select
        title="Материал"
        :elements="materials"
        v-model:ids="materialIds"
      ></base-filter-select>

      <base-filter-select
        title="Коллекция"
        :elements="seasons"
        v-model:ids="seasonIds"
      ></base-filter-select>

      <button
        class="filter__submit button button--primery"
        type="submit"
        @click.prevent="applyFilters"
      >
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
        @click="resetFilters"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import {
  defineComponent, reactive, computed, ref,
} from 'vue';
import { useStore } from 'vuex';
import BaseFilterInput from '@/components/Body/BaseFilterInput.vue';
import BaseFilterSelect from '@/components/Body/BaseFilterSelect.vue';
import ColorFilter from '@/components/Body/ColorFilter.vue';
import BaseFilterCategories from '@/components/Body/BaseFilterCategories.vue';

export default defineComponent({
  components: {
    BaseFilterInput,
    BaseFilterSelect,
    ColorFilter,
    BaseFilterCategories,
  },
  setup() {
    const store = useStore();
    const filtersData = reactive({});
    const page = ref(1);
    const productsPerPage = ref(6);

    const minPrice = ref(0);
    const maxPrice = ref(0);

    const currentCategory = ref(0);

    const colorIds = ref([]);
    const seasonIds = ref([]);
    const materialIds = ref([]);

    store.dispatch('getMaterials');
    store.dispatch('getSeasons');
    store.dispatch('getColors');
    store.dispatch('getCategories');

    function applyFilters() {
      store.dispatch('getProducts', {
        page: page.value,
        productsPerPage: productsPerPage.value,
        minPrice: minPrice.value,
        maxPrice: maxPrice.value,
        category: currentCategory.value,
        colorIds: colorIds.value,
        materialIds: materialIds.value,
        seasonIds: seasonIds.value,
      });
    }

    function resetFilters() {
      minPrice.value = 0;
      maxPrice.value = 0;
      currentCategory.value = 0;
      colorIds.value = [];
      seasonIds.value = [];
      materialIds.value = [];

      store.dispatch('getProducts', {
        page: page.value,
        productsPerPage: productsPerPage.value,
        minPrice: minPrice.value,
        maxPrice: maxPrice.value,
        category: currentCategory.value,
      });
    }

    return {
      minPrice,
      maxPrice,
      currentCategory,
      filtersData,
      colorIds,
      seasonIds,
      materialIds,
      seasons: computed(() => store.state.seasons) || [],
      materials: computed(() => store.state.materials) || [],
      colors: computed(() => store.state.colors || []),
      categories: computed(() => store.state.categories || []),
      applyFilters,
      resetFilters,
    };
  },
});
</script>

.<style lang="less">
.form__select {
  background-color: #fafafa;
}
</style>
