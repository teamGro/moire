<template>
  <aside class="filter">
    <form
      class="filter__form form"
      action="#"
      method="get"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>

        <base-filter-input
          name="min-price"
          placeholder="0"
          title="От"
        ></base-filter-input>

        <base-filter-input
          name="max-price"
          placeholder="12345"
          title="До"
        ></base-filter-input>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            type="text"
            name="category"
          >
            <option value="value1">Все категории</option>
            <option value="value2">Футболки</option>
            <option value="value3">Бюстгалтеры</option>
            <option value="value4">Носки</option>
          </select>
        </label>
      </fieldset>

      <color-filter
        title="Цвет"
        :colors="colors"
      ></color-filter>

      <base-filter-select
        title='Материал'
        :elements="materials"
      ></base-filter-select>

      <base-filter-select
        title='Коллекция'
        :elements="seasons"
      ></base-filter-select>

      <button
        class="filter__submit button button--primery"
        type="submit"
      >
        Применить
      </button>
      <button
        class="filter__reset button button--second"
        type="button"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { defineComponent, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import BaseFilterInput from '@/components/Body/BaseFilterInput.vue';
import BaseFilterSelect from '@/components/Body/BaseFilterSelect.vue';
import ColorFilter from '@/components/Body/ColorFilter.vue';

export default defineComponent({
  components: { BaseFilterInput, BaseFilterSelect, ColorFilter },
  setup() {
    const store = useStore();
    const filtersData = reactive({});

    store.dispatch('getMaterials');
    store.dispatch('getSeasons');
    store.dispatch('getColors');

    return {
      filtersData,
      seasons: computed(() => store.state.seasons) || [],
      materials: computed(() => store.state.materials) || [],
      colors: computed(() => store.state.colors || []),
    };
  },
});
</script>

.<style lang="less">
.form__select {
  background-color: #fafafa;
}
</style>
