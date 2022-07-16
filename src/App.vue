<template>
  <div id="app" class="stage">
    <router-view></router-view>
  </div>
</template>

<style>
body {
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  max-width: 100vw;
}

.stage {
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>