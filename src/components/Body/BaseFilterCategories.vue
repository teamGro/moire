<template>
    <fieldset class="form__block">
        <legend class="form__legend">{{title}}</legend>
        <label class="form__label form__label--select">
          <select
            class="form__select"
            name="category"
            @change="getCategory($event)"
          >
            <option value="0">Все категории</option>
            <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id">
            {{ category.title }}
            </option>
          </select>
        </label>
      </fieldset>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['title', 'categories', 'category'],
  setup(props, ctx) {
    function getCategory(e) {
      ctx.emit('update:category', e.target.value);
    }

    return {
      getCategory,
    };
  },
});
</script>
