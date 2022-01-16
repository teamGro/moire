<template>
  <fieldset class="form__block">
    <legend class="form__legend">{{ title }}</legend>
    <label class="form__label form__label--select">
      <select
        class="form__select"
        name="category"
        @change="getCategory($event)"
        v-model="currentCategory"
      >
        <option value="0">Все категории</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.title }}
        </option>
      </select>
    </label>
  </fieldset>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: ['title', 'categories', 'category'],
  setup(props, ctx) {
    const currentCategory = computed(() => props.category);
    function getCategory(e) {
      ctx.emit('update:category', e.target.value);
    }

    return {
      currentCategory,
      getCategory,
    };
  },
});
</script>
