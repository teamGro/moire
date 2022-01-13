<template>
  <base-order-el :title="title" :error="error">
    <input
      class="form__input"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @value="userData"
      @input="changeUserData($event)"
    />
  </base-order-el>
</template>

<script>
import { defineComponent } from 'vue';
import BaseOrderEl from './BaseOrderEl.vue';

export default defineComponent({
  components: { BaseOrderEl },
  props: ['title', 'error', 'placeholder', 'type', 'name', 'data'],
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
