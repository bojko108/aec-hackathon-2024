<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page>
    <MapView />
    <MapControls />
    <BasemapSwitcher />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import MapView from 'components/MapView.vue';
import MapControls from 'src/components/MapControls.vue';
import BasemapSwitcher from 'src/components/BasemapSwitcher.vue';
import { mainStore } from 'src/stores/main-store';

export default defineComponent({
  name: 'IndexPage',
  components: {
    MapView,
    MapControls,
    BasemapSwitcher,
  },
  computed: {
    store: () => mainStore(),
  },
});
</script>
