import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
  app.config.globalProperties.$mapConfig = {
    view: {
      center: [23, 42],
      zoom: 8,
      rotation: 0,
      //maxExtent: [22.89001090810938, 40.47927316246091, 26.794206491209703, 43.474444191298005]
    },
    controls: {
      rotate: true,
      zoom: true,
      attribution: false,
      scale: true,
      mousePosition: false,
    },
    interactions: {
      altShiftDragRotate: false,
      doubleClickZoom: true,
      dragPan: true,
      pinchRotate: false,
      pinchZoom: true,
      keyboard: true,
      mouseWheelZoom: true,
      shiftDragZoom: true,
    },
    layers: []
  };
});
