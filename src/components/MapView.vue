<template>
  <div id="md-map"></div>
</template>

<script>

import { mainStore } from 'src/stores/main-store';
import { APPREADY, MAPREADY } from '../events';
import { createApp } from 'mapdaemon';
import appconf from '../stores/appConfig';

export default {
  name: 'MapView',
  computed: {
    store: () => mainStore()
  },
  created() {
    this.$events.on(APPREADY, this.appReady);
  },
  async mounted() {
    await this.initMap();
  },
  beforeUnmount() {
    this.$events.off(APPREADY, this.appReady);
  },
  methods: {
    appReady() {
      window.app = this.store.app;
    },
    async initMap() {
      try {
        //const { data } = await this.$axios.get(`${this.store.servicesURL}/mapps/fires_main`);
        const data = appconf;

        const app = await createApp(data.value);
        this.store.app = app;

        this.store.app.map.once('rendercomplete', () => {
          this.$events.emit(MAPREADY);
        });
        this.$events.emit(APPREADY);
      } catch (error) {
        console.error(error);

        this.$q.dialog({
          title: 'Alert',
          message: `${this.$t('errorMapLoad')} ${error.message}`
        }).onOk(() => {

        })
      }
    }
  }
}
</script>

<style>
@import '../../node_modules/ol/ol.css';

#md-map {
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  /*#aaaaaa url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAAAAABzHgM7AAAAAnRSTlMAAHaTzTgAAAARSURBVHgBY3iKBFEAOp/+MgB+UQnYeBZPWAAAAABJRU5ErkJggg==) !important; */
}

.ol-popup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.2rem;
  border: 1px solid lightgray;
}

.ol-popup-content {
  max-height: 100%;
  min-width: 20vh;
  max-width: 30vh;
}

.popup-title {
  text-align: center;
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-weight: bolder;
  color: blue;
  padding: 1rem;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>