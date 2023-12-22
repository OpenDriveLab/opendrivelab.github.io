<template>
  <div style="margin-top: 50px">
    <h1>Autonomous Driving Dataset</h1>
    <a-table
      style="margin: 30px"
      :data-source="data"
      :columns="columns"
      :rowKey="
        (record, index) => {
          return index;
        }
      "
    >
      <div
        slot="filterDropdown"
        slot-scope="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column,
        }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="(c) => (searchInput = c)"
          :placeholder="`Search ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="
            () => handleSearch(selectedKeys, confirm, column.dataIndex)
          "
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button
          size="small"
          style="width: 90px"
          @click="() => handleReset(clearFilters)"
        >
          Reset
        </a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text, record, index, column">
        <span v-if="searchText && searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
              >{{ fragment }}</mark
            >
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
      </template>
      <!-- <span slot="tags" slot-scope="text, record">
        <a-tag v-for="tag in record.tags" :key="tag" :color="tagColor(tag)">
          {{ tag }}
        </a-tag>
      </span> -->
      <!-- <span slot="tags" slot-scope="tags">
        <a-tag v-for="tag in tags" :key="tag" :color="tagColor(tag)">
          {{ tag.toUpperCase() }}
        </a-tag>
      </span> -->
    </a-table>
  </div>
</template>
<script>
import dataSource from "./data";
const columns = [
  {
    title: "Name",
    dataIndex: "id",
    key: "id",
    width: "200",
    // defaultSortOrder: "descend",
    sorter: (a, b) => a.id.localeCompare(b.id),
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      customRender: "customRender",
    },
    onFilter: (value, record) =>
      record.id.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: "N° Citations",
    dataIndex: "citationCount",
    key: "citationCount",
    width: "200",
    // defaultSortOrder: "descend",
    sorter: (a, b) => Number(a.citationCount) - Number(b.citationCount),
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      customRender: "customRender",
    },
    onFilter: (value, record) =>
      record.citationCount
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
  },
  {
    title: "Size [h]",
    dataIndex: "size_hours",
    key: "size_hours",
    width: "200",
    // sorter: (a, b) => Number(a.size_hours) - Number(b.size_hours),
    sorter: (a, b) => {
      if (isNaN(a.size_hours) && isNaN(b.size_hours)) {
        return 0;
      } else if (isNaN(a.size_hours)) {
        return 1;
      } else if (isNaN(b.size_hours)) {
        return -1;
      } else {
        return Number(a.size_hours) - Number(b.size_hours);
      }
    },
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      customRender: "customRender",
    },
    onFilter: (value, record) =>
      record.citationCount
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
  },
  {
    title: "Size [GB]",
    dataIndex: "size_storage",
    key: "size_storage",
    width: "200",
    // defaultSortOrder: "descend",
    sorter: (a, b) => {
      if (isNaN(a.size_storage) && isNaN(b.size_storage)) {
        return 0;
      } else if (isNaN(a.size_storage)) {
        return 1;
      } else if (isNaN(b.size_storage)) {
        return -1;
      } else {
        return Number(a.size_storage) - Number(b.size_storage);
      }
    },
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      customRender: "customRender",
    },
    onFilter: (value, record) =>
      record.size_storage
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
  },
  {
    title: "Frames",
    dataIndex: "frames",
    key: "frames",
    width: "200",
    // defaultSortOrder: "descend",
    sorter: (a, b) => {
      if (isNaN(a.frames) && isNaN(b.frames)) {
        return 0;
      } else if (isNaN(a.frames)) {
        return 1;
      } else if (isNaN(b.frames)) {
        return -1;
      } else {
        return Number(a.frames) - Number(b.frames);
      }
    },
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      customRender: "customRender",
    },
    onFilter: (value, record) =>
      record.frames.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: "N° Scenes",
    dataIndex: "numberOfScenes",
    key: "numberOfScenes",
    width: "200",
    // defaultSortOrder: "descend",
    sorter: (a, b) => {
      if (isNaN(a.numberOfScenes) && isNaN(b.numberOfScenes)) {
        return 0;
      } else if (isNaN(a.numberOfScenes)) {
        return 1;
      } else if (isNaN(b.numberOfScenes)) {
        return -1;
      } else {
        return Number(a.numberOfScenes) - Number(b.numberOfScenes);
      }
    },
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      customRender: "customRender",
    },
    onFilter: (value, record) =>
      record.numberOfScenes
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
  },
  {
    title: "Scene Length [s]",
    dataIndex: "lengthOfScenes",
    key: "lengthOfScenes",
    width: "200",
    // defaultSortOrder: "descend",
    sorter: (a, b) => {
      if (isNaN(a.lengthOfScenes) && isNaN(b.lengthOfScenes)) {
        return 0;
      } else if (isNaN(a.lengthOfScenes)) {
        return 1;
      } else if (isNaN(b.lengthOfScenes)) {
        return -1;
      } else {
        return Number(a.lengthOfScenes) - Number(b.lengthOfScenes);
      }
    },
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      customRender: "customRender",
    },
    onFilter: (value, record) =>
      record.lengthOfScenes
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
  },
  {
    title: "Sensortypes",
    dataIndex: "sensors",
    key: "sensors",
    width: "200",
    // scopedSlots: { customRender: "tags" },
    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.sensors.localeCompare(b.sensors),
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      customRender: "customRender",
      // customRender: "tags",
      // tags: "tags",
    },
    onFilter: (value, record) =>
      record.sensors.toString().toLowerCase().includes(value.toLowerCase()),
  },
];

export default {
  data() {
    return {
      data: [],
      dataSource: [],
      searchText: "",
      searchInput: undefined,
      searchedColumn: "",
      columns,
    };
  },
  created() {
    // console.log("dataSource===================", dataSource);
    this.dataSource = dataSource;
    // console.log("this.data===================", this.data);
    this.data = JSON.parse(JSON.stringify(this.dataSource));
    this.data = this.dataSource.map((item) => {
      return {
        ...item,
        size_hours:
          !item.size_hours || isNaN(item.size_hours) ? "--" : item.size_hours,
        size_storage:
          !item.size_storage || isNaN(item.size_storage)
            ? "--"
            : item.size_storage,
        frames: !item.frames || isNaN(item.frames) ? "--" : item.frames,
        numberOfScenes:
          !item.numberOfScenes || isNaN(item.numberOfScenes)
            ? "--"
            : item.numberOfScenes,
        lengthOfScenes:
          !item.lengthOfScenes || isNaN(item.lengthOfScenes)
            ? "--"
            : item.lengthOfScenes,
        sensors:
          !item.sensors || typeof item.sensors !== "string"
            ? []
            : item.sensors.split(","),
      };
    });
  },
  methods: {
    tagColor(tag) {
      console.log("tagColor===================", tag);
      switch (tag) {
        case "camera":
          return "volcano";
        case "lidar":
          return "geekblue";
        case "radar":
          return "green";
        case "gps/imu":
          return "gold";
        default:
          return "blue";
      }
    },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    },
  },
};
</script>
<style scoped>
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
