<template>
  <label class="form__label form__label--price">
    <input
      class="form__input"
      type="text"
      :name="name"
      :placeholder="placeholder"
      @input="setPrice($event)"
    >
    <span class="form__value">{{ title }}</span>
  </label>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['name', 'placeholder', 'title', 'price'],
  setup(props, ctx) {
    function setPrice(e) {
      ctx.emit('update:price', e.target.value);
    }

    return {
      setPrice,
    };
  },
});
</script>
