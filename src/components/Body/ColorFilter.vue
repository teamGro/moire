<template>
  <fieldset class="form__block">
    <legend class="form__legend">{{title}}</legend>
    <ul class="colors-list">
      <li
        class="colors-list__item"
        v-for="color in colors"
        :key="color.id"
        :class="{'colors-list__item--active':
        colorIds.find((item) => item === color.id)}"
      >
        <label class="colors-list__label">
          <input
            class="colors-list__input"
            type="radio"
            :value="color.id"
          >
          <span
            class="colors-list__value"
            v-bind:style="{'background-color': color.code}"
            @click="updateColorState($event, color)"
          ></span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['colors', 'title', 'colorIds'],
  setup(props, ctx) {
    function updateColorState(e, color) {
      let updColors = [];
      if (props.colorIds.find((item) => item === color.id)) {
        updColors = props.colorIds.filter((item) => item !== color.id);
      } else {
        updColors = props.colorIds;
        updColors.push(color.id);
      }
      ctx.emit('update:colorIds', updColors);
    }

    return {
      updateColorState,
    };
  },
});
</script>

<style lang="less">
.colors-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;

  &__item {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    margin-bottom: 10px;
    transition: border-color 5.9s ease-in;

    &:not(:last-child) {
      margin-right: 10px;
    }

    &:hover {
      border: 1px solid #000;
    }

    &--active {
      border: 1px solid #000;
    }
  }

  &__label {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  &__input {
    position: absolute;
    top: 0;
    left: 0;

    width: 0px;
    height: 0px;
  }

  &__value {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>
