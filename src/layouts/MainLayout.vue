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
          <q-btn color="primary" icon="mdi-eye" label="Show On Map" @click="showTrackStatisticsOnMap">
            <q-tooltip>
              Click to view detailed information for each part of the track on the map
            </q-tooltip>
          </q-btn>
          <q-btn color="primary" icon="mdi-eye-off" label="Hide From Map" @click="hideTrackStatisticsOnMap">
            <q-tooltip>
              Click to hide detailed information for each part of the track from the map
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
import { min, max, average, total, getColor } from '../helpers.js';
import DisplayValue from 'src/components/DisplayValue.vue';
import ValuesInfo from 'src/components/ValuesInfo.vue';

import { mainStore } from 'src/stores/main-store';
import { APPREADY } from 'src/events';

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
        coordinates: [],
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
  created() {
    this.$events.on(APPREADY, this.appReady);
  },
  methods: {
    appReady() {
      this.store.app.widgets.select.on('changed', this.handleSelectionChanged);
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    showTrackStatisticsOnMap() {
      const features = this.trackInfo.coordinates.map(({ item }) => {

        // project to web mercator?
        return new Features({
          geometry: new Point([item.longitude, item.latitude]),
          modelValue: item.value,
          color: getColor(item.value)
        });
      });

      console.log(features);

      this.store.map.defaultLayer.addFeatures(features);
    },
    hideTrackStatisticsOnMap() {
      this.store.map.defaultLayer.getClearSource();
    },
    async handleSelectionChanged(selection) {
      console.log(selection);

      const track = selection[0];
      await this.calculateTrackInfo(track);
    },
    async calculateTrackInfo(track) {
      const coordinates = track.getGeometry().getCoordinates();

      // project to wgs84?

      const coordinatesAndModelValues = await this.$axios.post(`${this.store.servicesURL}/utils/gate`, { coordinates });
      const values = coordinatesAndModelValues.map(value => value);

      console.log(coordinatesAndModelValues);
      console.log(values);

      this.trackInfo = {
        coordinates: coordinatesAndModelValues,
        minimum: min(values),
        maximum: max(values),
        average: average(values),
        total: total(values)
      }
    }
  }
})
</script>