<template>
  <!-- https://quasar.dev/layout-builder -->

  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn flat dense round icon="mdi-menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <!-- {{ $package.productName }} -->
          $$$ NAME $$$
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div v-if="trackInfo">
        <q-list dense>
          <q-item>
            <q-item-section>
              <q-item-label>Minimum:</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>
                <DisplayValue :value="trackInfo.minimum" />
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Maximum:</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>
                <DisplayValue :value="trackInfo.maximum" />
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Average:</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>
                <DisplayValue :value="trackInfo.average" />
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Total:</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>
                <DisplayValue :value="trackInfo.total" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <ValuesInfo />

        <div class="text-center">
          <q-btn color="primary" icon="mdi-palette" label="Show On Map" @click="showTrackStatisticsOnMap">
            <q-tooltip>
              Click to view detailed information for each part of the track on the map
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal bordered class="bg-white text-dark">
      Current location:
      <DisplayValue textValue="--" colorStatic="grey" />
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
import DisplayValue from 'src/components/DisplayValue.vue';
import ValuesInfo from 'src/components/ValuesInfo.vue';

import { mainStore } from 'src/stores/main-store';

export default defineComponent({
  name: 'MainLayout',
  components: {
    DisplayValue,
    DisplayValue,
    ValuesInfo,
    DisplayValue
  },
  data() {
    return {
      leftDrawerOpen: false,
      trackInfo: {
        minimum: 23,
        maximum: 67,
        average: (67 + 23) / 2,
        total: 67 + 23
      }
    }
  },
  computed: {
    store: () => mainStore()
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    showTrackStatisticsOnMap() {
      console.log('aaa');
    }
  }
})
</script>