<template>
  <q-badge v-if="hideUnits" :color="color">
    {{ value ?? textValue }}
  </q-badge>
  <q-badge v-else :color="color">
    {{ value ?? textValue }} µg/m<sup>3</sup>
  </q-badge>
</template>

<script>
import { getBadgeColor } from '../helpers.js';

export default {
  name: 'DisplayValue',
  props: {
    value: { type: Number },
    textValue: { type: String },
    colorStatic: { type: String },
    hideUnits: { type: Boolean }
  },
  data() {
    return {
      color: null
    }
  },
  mounted() {
    if (this.textValue)
      this.color = this.colorStatic;
    else
      this.color = getBadgeColor(this.value);

    console.log(this.color);
  }
}
</script>
