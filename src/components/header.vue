<template>
  <a-menu v-model="current" mode="horizontal">

    <a-menu-item>
      <a href="https://opendrivelab.com/"  rel="noopener noreferrer">
      <img src="../assets/OpenDriveLab.png"/></a>
    </a-menu-item>

    <a-menu-item>
      <a href="https://github.com/sponsors/OpenDriveLab"  rel="noopener noreferrer">
      <a-icon type="heart" shape="solid" />Sponsor</a>
      <!-- <a-icon
        type="heart"
        theme="filled"
        style="color: rgba(220, 20, 60, 1)"
      />Sponsor</a
      > -->
    </a-menu-item>

  </a-menu>
</template>

<script>
export default {
  data() {
    return {
      current: ["mail"],
    };
  },
};
</script>

<style></style>
