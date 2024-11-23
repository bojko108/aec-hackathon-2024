<template>
    <q-btn-group flat dense class="absolute top-right column text-primary" style="max-width: 2.4rem">
        <q-btn class="bg-white" icon="mdi-refresh" @click="refreshMap">
            <q-tooltip anchor="center right" self="center left" class="bg-black">
                {{ $t('refreshMapBtnTooltip') }}
            </q-tooltip>
        </q-btn>
        <q-btn class="bg-white" icon="mdi-plus" @click="zoomIn">
            <q-tooltip anchor="center right" self="center left" class="bg-black">
                {{ $t('zoomInMapBtnTooltip') }}
            </q-tooltip>
        </q-btn>
        <q-btn class="bg-white" icon="mdi-minus" @click="zoomOut">
            <q-tooltip anchor="center right" self="center left" class="bg-black">
                {{ $t('zoomOutMapBtnTooltip') }}
            </q-tooltip>
        </q-btn>
        <q-btn v-if="$q.platform.is.desktop" class="bg-white" icon="mdi-arrow-left-thick" @click="previousExtent">
            <q-tooltip anchor="center right" self="center left" class="bg-black">
                {{ $t('prevExtentBtnTooltip') }}
            </q-tooltip>
        </q-btn>
        <q-btn v-if="$q.platform.is.desktop" class="bg-white" icon="mdi-home" @click="initialExtent">
            <q-tooltip anchor="center right" self="center left" class="bg-black">
                {{ $t('initExtentBtnTooltip') }}
            </q-tooltip>
        </q-btn>
        <q-btn v-if="$q.platform.is.desktop" class="bg-white" icon="mdi-arrow-right-thick" @click="nextExtent">
            <q-tooltip anchor="center right" self="center left" class="bg-black">
                {{ $t('nextExtentBtnTooltip') }}
            </q-tooltip>
        </q-btn>
    </q-btn-group>
</template>
  
<script>
import { mainStore } from 'src/stores/main-store';

export default {
    name: 'MapControls',
    computed: {
        store: () => mainStore(),
        isMapRotated() {
            if (this.store.app) return this.store.app.map.rotation === 0;
            else return false;
        },
        canGoBack() {
            if (this.store.app) return this.store.app.widgets.bookmarks.canGoBackward;
            else return false;
        },
        canGoForward() {
            if (this.store.app) return this.store.app.widgets.bookmarks.canGoForward;
            else return false;
        }
    },
    methods: {
        refreshMap() {
            //this.store.app.map.refreshVectorData(); // not implemented yet
            this.store.app.map.getVectorLayers().forEach(l => l.getSource().refresh());
        },
        zoomIn() {
            this.store.app.map.zoom = this.store.app.map.zoom++;
        },
        zoomOut() {
            this.store.app.map.zoom = this.store.app.map.zoom--;
        },
        initialExtent() {
            this.store.app.widgets.bookmarks.initialExtent();
        },
        previousExtent() {
            this.store.app.widgets.bookmarks.previousExtent();
        },
        nextExtent() {
            this.store.app.widgets.bookmarks.nextExtent();
        },
        mapRotation() {
            return `transform:rotate(${this.store.app.map.rotation}deg)`;
        },
        rotateMap() {
            this.store.app.map.rotation = 0;
        },
    }
}
</script>
  
<style>
.top-left {
    top: 1rem;
    left: 1rem;
}

.top-right {
    top: 1rem;
    right: 1rem;
}

.top-right-offset-top {
    top: 4rem;
    right: 0.5rem;
}

.top-right-offset-right {
    top: 0.5rem;
    right: 4rem;
}

.button-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    width: 2.4rem;
    height: 2.4rem;
    border: 1px solid lightgray;
    cursor: pointer;
    border-radius: 0.2rem;
}

.button-wrapper:hover {
    background: lightsteelblue;
}

.button-wrapper-active {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--q-secondary);
    width: 2.4rem;
    height: 2.4rem;
    border: 1px solid lightgray;
    cursor: pointer;
    border-radius: 0.2rem;
}
</style>