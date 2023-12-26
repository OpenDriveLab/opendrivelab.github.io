<template>
  <a-layout>
    <div class="logo">
      <a href="https://opendrivelab.com/" target="_blank" rel="noopener noreferrer">
        <img src="../assets/OpenDriveLab.png" alt="Logo"
      /></a>
    </div>
    <a-layout-header class="layout-header">
      <a-menu mode="horizontal">
        <a-menu-item>
          <!-- <a href="" rel="noopener noreferrer">
            <a-icon type="database" />AD-Datasets
          </a> -->
          <router-link to="/"> <a-icon type="database" />AD-Datasets</router-link>
        </a-menu-item>
        <a-menu-item key="Sponsor">
          <a
            href="https://github.com/sponsors/OpenDriveLab"
            target="_blank"
            rel="noopener noreferrer"
          >
            <!-- <a-icon type="heart" shape="solid" color="#FF0000" /> -->
            <a-icon
              type="heart"
              theme="filled"
              style="color: rgba(220, 20, 60, 1)"
            />Sponsor</a
          >
        </a-menu-item>
      </a-menu>
    </a-layout-header>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.ant-menu-horizontal {
  line-height: 65px;
  white-space: nowrap;
  border: 0;
  /* border-bottom: 1px solid #e8e8e8; */
  box-shadow: none;
}
.ant-layout {
  display: flex;
  flex: auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 0;
  background: #fff;
}
.ant-layout-header {
  height: 64px;
  padding: 0 50px;
  line-height: 64px;
  background: #fff;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 0 24px;
  img {
    height: 32px;
    width: 200px;
  }
}
</style>
