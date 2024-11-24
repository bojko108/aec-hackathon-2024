<template>
  <!-- https://quasar.dev/layout-builder -->

  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn flat dense round icon="mdi-menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <!-- {{ $package.productName }} -->
          HazeAway
        </q-toolbar-title>

        <img src="logo.png">
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
          <q-btn-group>
            <q-btn color="primary" icon="mdi-eye" label="Show" @click="showTrackStatisticsOnMap">
              <q-tooltip>
                Click to view detailed information for each part of the track on the map
              </q-tooltip>
            </q-btn>
            <q-btn color="primary" icon="mdi-eye-off" label="Hide" @click="hideTrackStatisticsOnMap">
              <q-tooltip>
                Click to hide detailed information for each part of the track from the map
              </q-tooltip>
            </q-btn>
          </q-btn-group>
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
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { transform } from 'ol/proj.js';
import { defineComponent } from 'vue';
import { min, max, average, total, getColor } from '../helpers.js';
import { getMapPointStyle } from '../mapStyles';
import DisplayValue from 'src/components/DisplayValue.vue';
import ValuesInfo from 'src/components/ValuesInfo.vue';

import { mainStore } from 'src/stores/main-store';
import { APPREADY } from 'src/events';

export default defineComponent({
  name: 'MainLayout',
  components: {
    DisplayValue,
    ValuesInfo
  },
  data() {
    return {
      leftDrawerOpen: false,
      trackInfo: null
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

      this.store.app.map.defaultLayer.setStyle((feature, resolution) => {
        const modelValue = feature.get('modelValue');
        const style = getMapPointStyle(modelValue);
      });
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    showTrackStatisticsOnMap() {
      const features = this.trackInfo.coordinates.map((item) => {
        return new Feature({
          geometry: new Point(transform([item.longitude, item.latitude], 'EPSG:4326', 'EPSG:3857')),
          modelValue: item.value,
          color: getColor(item.value)
        });
      });
      debugger;
      this.store.app.map.defaultLayer.addFeatures(features);
    },
    hideTrackStatisticsOnMap() {
      this.store.map.defaultLayer.getClearSource();
    },
    async handleSelectionChanged(selection) {
      const track = selection[0];
      await this.calculateTrackInfo(track);
    },
    async calculateTrackInfo(track) {
      let coordinates = track.getGeometry().getCoordinates();
      coordinates = coordinates.map(c => {
        const [longitude, latitude] = transform([c[0], c[1]], 'EPSG:3857', 'EPSG:4326');
        return { latitude, longitude };
      });

      const { data } = await this.$axios.post(`${this.store.servicesURL}/utils/gate`, { coordinates });
      const values = data.map(i => Math.round(i.value));

      this.trackInfo = {
        coordinates: data,
        minimum: min(values),
        maximum: max(values),
        average: average(values),
        total: total(values)
      }
    }
  }
})
</script>