<template>
  <base-order-el :title="title">
    <textarea
      class="form__input form__input--area"
      :name="name"
      :placeholder="placeholder"
      @value="userData"
      @input="changeUserData($event)"
    ></textarea>
  </base-order-el>
</template>

<script>
import { defineComponent } from 'vue';
import BaseOrderEl from './BaseOrderEl.vue';

export default defineComponent({
  components: { BaseOrderEl },
  props: ['title', 'placeholder', 'name'],
  setup(props, ctx) {
    function changeUserData(e) {
      ctx.emit('update:data', e.target.value);
    }

    return {
      changeUserData,
    };
  },
});
</script>
