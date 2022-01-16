<template>
  <fieldset class="form__block">
    <legend class="form__legend">{{ title }}</legend>
    <ul class="check-list">
      <li class="check-list__item" v-for="el in elements" :key="el.id">
        <label class="check-list__label">
          <input
            class="check-list__check sr-only"
            type="checkbox"
            :name="el.type"
            :value="el.id"
            :code="el.code"
            @click="updateIds($event, el)"
            :checked="ids.find((item) => item === el.id)"
          />
          <span class="check-list__desc">
            {{ el.title }}
            <span>({{ el.productsCount }})</span>
          </span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: ['title', 'elements', 'ids'],
  setup(props, ctx) {
    const materialIds = computed(() => props.ids);

    function updateIds(e, item) {
      let updates = [];
      if (props.ids.find((elem) => elem === item.id)) {
        updates = props.ids.filter((elem) => elem !== item.id);
      } else {
        updates = props.ids;
        updates.push(item.id);
      }
      ctx.emit('update:ids', updates);
    }

    return {
      materialIds,

      updateIds,
    };
  },
});
</script>
