<template>
  <label class="form__label">
    <!-- <input
                class="form__input"
                type="tel"
                name="phone"
                placeholder="Введите ваш телефон"
              /> -->
    <slot></slot>
    <span class="form__value">{{ title }}</span>
    <span class="form__error" v-if="error">{{ error }}</span>
  </label>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['title', 'error'],
  setup() {},
});
</script>
