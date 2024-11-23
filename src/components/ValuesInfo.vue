<template>
  <div class="q-pa-md q-gutter-md text-center">
    <q-badge rounded color="green" label="Normal">
      <q-tooltip>
        Good, you are on a good path!
      </q-tooltip>
    </q-badge>
    <q-badge rounded color="orange" label="Warning">
      <q-tooltip>
        Consider changing your path.
      </q-tooltip>
    </q-badge>
    <q-badge rounded color="red" label="Critical">
      <q-tooltip>
        You are probably dead :(
      </q-tooltip>
    </q-badge>
  </div>
  <!-- <q-list dense>
    <q-item>
      <q-item-section side>
        <DisplayValue textValue="Normal" colorStatic="green" :hideUnits="true" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          Good, air pollution is normal!
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section side>
        <DisplayValue textValue="Warning" colorStatic="orange" :hideUnits="true" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          You should change your
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section side>
        <DisplayValue textValue="Critical" colorStatic="red" :hideUnits="true" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          You are probably dead :(
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list> -->
</template>

<script>
//import DisplayValue from './DisplayValue.vue';

export default {
  name: 'ValuesInfo',
  // components: {
  //   DisplayValue
  // }
}
</script>
