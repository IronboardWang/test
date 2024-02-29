<template>
  <div class="top">
    <div class="left"></div>
    <div class="center"></div>
    <div class="right"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;
  .left {
    flex: 1;
    background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
    background-size: cover;
  }
  .center {
    flex: 2;
  }
  .right {
    flex: 1;
  }
}
</style>
