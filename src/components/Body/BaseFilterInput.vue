<template>
  <label class="form__label form__label--price">
    <input
      class="form__input"
      type="number"
      :name="name"
      :placeholder="placeholder"
      @input="setPrice($event)"
      v-model="currentPrice"
    />
    <span class="form__value">{{ title }}</span>
  </label>
</template>

<script>
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: ['name', 'placeholder', 'title', 'price'],
  setup(props, ctx) {
    const currentPrice = computed(() => props.price || '');

    function setPrice(e) {
      ctx.emit('update:price', e.target.value);
    }

    return {
      setPrice,
      currentPrice,
    };
  },
});
</script>
