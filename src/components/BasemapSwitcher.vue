<template>
    <div v-if="currentBasemap" class="absolute row bottom-right basemap-control">
        <!-- <q-btn v-if="$q.platform.is.desktop" class="bg-primary" @click="toggleBasemapSwitcher">
        <q-btn v-if="$q.platform.is.desktop" class="bg-primary" @click="toggleBasemapSwitcher">
            <q-avatar square size="42px">
                <img :src="currentBasemap.layerInfo.icon">
            </q-avatar>
            <q-tooltip anchor="center right" self="center left" class="bg-black">
                {{ $t('basemapSwitcherButtonTooltip') }}
            </q-tooltip>
        </q-btn>
        <q-btn v-else class="bg-white text-primary" style="max-width: 2.4rem" icon="mdi-layers" -->

        <q-btn class="bg-white text-primary" style="max-width: 2.4rem" icon="mdi-layers" @click="toggleBasemapSwitcher">
            <q-tooltip anchor="center right" self="center left" class="bg-black">
                {{ $t('basemapSwitcherButtonTooltip') }}
            </q-tooltip>
        </q-btn>

        <div v-if="store.app" v-show="basemapsSwitcherVisible" class="absolute row basemap-wrapper">
            <q-list highlight class="bg-white basemap rounded">
                <q-item clickable v-for="basemap in store.app.map.basemaps" :key="basemap.layerInfo.name"
                    @click="activateBasemap(basemap.layerInfo.name)">
                    <q-item-section avatar>
                        <img :src="basemap.layerInfo.icon" class="basemap-thumbnail rounded bordered">
                    </q-item-section>
                    <q-item-section>
                        <strong v-if="currentBasemap.layerInfo.name === basemap.layerInfo.name">{{ basemap.layerInfo.title
                        }}</strong>
                        <div v-else>{{ basemap.layerInfo.title }}</div>
                    </q-item-section>
                    <q-item-section v-if="basemap.layerInfo.name === 'sentinel'">
                        <q-btn icon="mdi-calendar-clock" flat dense>
                            <q-tooltip anchor="center right" self="center left" class="bg-black">
                                {{ $t('basemapSwitcherWMSButtonTooltip') }}
                            </q-tooltip>
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-date flat range v-model="store.wmsDateRange" :locale="getLocale()" mask="YYYY-MM-DD">
                                    <div class="row items-center justify-end q-gutter-sm">
                                        <q-btn label="Cancel" color="primary" flat v-close-popup />
                                        <q-btn label="OK" color="primary" flat @click="updateWMSDateRange" v-close-popup />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-btn>
                    </q-item-section>
                </q-item>
                <!-- add NONE item -->
                <q-item clickable key="basemap_none" @click="activateBasemap('none')">
                    <q-item-section avatar>
                        <div class="basemap-thumbnail map-bg rounded bordered" />
                    </q-item-section>
                    <q-item-section>
                        <strong v-if="currentBasemap.layerInfo.name === 'none'">{{ 'None'
                        }}</strong>
                        <div v-else>{{ 'None' }}</div>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
    </div>
</template>
  
<script>
//:class="currentBasemap === basemap.layerInfo.name ? 'bg-grey-13' : null"
import { APPREADY } from 'src/events';
import { getLocalizedCalendar } from 'src/localization';
import { mainStore } from 'src/stores/main-store';

export default {
    name: 'BasemapSwitcher',
    data() {
        return {
            currentBasemap: null,
            basemapsSwitcherVisible: false
        };
    },
    computed: {
        store: () => mainStore(),
    },
    created() {
        this.$events.on(APPREADY, this.initialize);
    },
    beforeUnmount() {
        this.$events.off(APPREADY, this.initialize);
    },
    methods: {
        initialize() {
            this.currentBasemap = this.store.app.map.getLayerBy(this.store.app.map.basemap);
        },
        toggleBasemapSwitcher() {
            this.basemapsSwitcherVisible = !this.basemapsSwitcherVisible;

            // hide when the user click on the map
            if (this.basemapsSwitcherVisible) {
                this.store.app.map.once('singleclick', () => {
                    this.basemapsSwitcherVisible = false;
                });
            }
        },
        activateBasemap(name) {
            this.store.app.map.basemap = name;
            this.currentBasemap = this.store.app.map.getLayerBy(name) || { layerInfo: { name: 'none' } };
        },
        getLocale() {
            return getLocalizedCalendar(this.$i18n.locale);
        },
        updateWMSDateRange() {
            const wmsLayer = this.store.app.map.getLayerBy('sentinel');
            if (!wmsLayer) return;

            const { wmsDateRange } = this.store;
            wmsLayer.getSource().params_.time = `${wmsDateRange.from}/${wmsDateRange.to}`;
            wmsLayer.getSource().refresh();
        }
    }
}
</script>
  
<style>
.top-right {
    top: 0.5rem;
    right: 0.5rem;
}

.bottom-right {
    bottom: 0.5rem;
    right: 0.5rem;
}

.basemap-thumbnail {
    width: 4rem;
    height: 4rem;
    border-radius: 0.3rem;
}

.basemap-active {
    border: 1px solid #4caf50;
    background: rgba(189, 189, 189, 0.3);
}

.basemap-control {
    z-index: 1;
}

.basemap-wrapper {
    max-height: 75vh;
    bottom: 0rem;
    right: 3rem;
}

.basemap {
    width: 15rem;
    max-width: 65vw;
    overflow-y: auto;
    border: 1px solid lightgray;
}

.map-bg {
    background: white url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAAAAABzHgM7AAAAAnRSTlMAAHaTzTgAAAARSURBVHgBY3iKBFEAOp/+MgB+UQnYeBZPWAAAAABJRU5ErkJggg==) !important;
}
</style>