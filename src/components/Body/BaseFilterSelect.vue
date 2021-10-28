<template>
  <fieldset class="form__block">
    <legend class="form__legend">{{title}}</legend>
    <ul class="check-list">
      <li
        class="check-list__item"
        v-for="el in elements"
        :key="el.id"
      >
        <label class="check-list__label">
          <input
            class="check-list__check sr-only"
            type="checkbox"
            :name="el.type"
            :value="el.title"
            :code="el.code"
          >
          <span class="check-list__desc">
            лен
            <span>(3)</span>
          </span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['title', 'elements'],
  setup() {

  },
});
</script>
