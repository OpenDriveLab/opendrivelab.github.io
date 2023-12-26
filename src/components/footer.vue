<template>
    <div class="footer">
      <div>
        <span>上海市徐汇区龙文路129号国际传媒港L1栋10层C区</span>
        <a-divider type="vertical" />
        <span>Area C, 10F, Building L1, 129 Longwen Rd, Shanghai</span>
      </div>
      <div>
        <span>OpenDriveLab at Shanghai AI Lab</span>
        <a-divider type="vertical" />
        <span>Copyright © 2021 - 2023 All Rights Reserved</span>
        <a-divider type="vertical" />
        <span>沪ICP备2021009351号</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style lang="scss" scoped>
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    background-color: #252525;
    font-size: 14px;
    font-family: Verdana, sans-serif;
    color: grey;
  }
  ::v-deep .ant-divider {
    background: grey;
  }
  </style>
  