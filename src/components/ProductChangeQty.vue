<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="decreaseQty">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" :value="qty" name="count" />

    <button type="button" aria-label="Добавить один товар" @click="increaseQty">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  props: ['qty', 'id'],
  setup(props, ctx) {
    const route = useRoute();
    const store = useStore();

    function increaseQty() {
      let { qty } = props;
      qty += 1;
      if (route.name === 'Basket') {
        store.dispatch('updateProductQtyInBasket', { id: props.id, qty });
      } else {
        ctx.emit('update:qty', qty);
      }
    }

    function decreaseQty() {
      if (props.qty === 1) return;
      let { qty } = props;
      qty -= 1;
      if (route.name === 'Basket') {
        store.dispatch('updateProductQtyInBasket', { id: props.id, qty });
      } else {
        ctx.emit('update:qty', qty);
      }
    }

    return {
      increaseQty,
      decreaseQty,
    };
  },
});
</script>
