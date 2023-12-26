<template>
  <div style="margin-top: 50px">
    <div class="title">Autonomous Driving Dataset</div>
    <a-form-model :model="form" labelAlign="left" style="margin: 30px" :label-col="labelCol" :wrapper-col="wrapperCol" >
      <a-form-model-item label="请选择显示的列">
        <a-select
          v-model="form.arr"
          mode="multiple"
          style="width: 100%"
          placeholder="请选择"
          allowClear
          @change="handleChange"
        >
          <a-select-option v-for="item in columnsSelect" :key="item.index" :value="item.key">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
    </a-form-model>
    <a-table
      style="margin: 20px;width: 98%;"
      :data-source="data"
      :columns="columns"
      :rowKey="
        (record, index) => {
          return index;
        }
      "
      :scroll="{ x: 1200, }"
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
      <span slot="tags" slot-scope="tags">
        <a-tag v-for="tag in tags" :key="tag" :color="tagColor(tag)">
          {{ tag }}
        </a-tag>
      </span>
      <template slot="licensing" slot-scope="text">
        <a-tooltip placement="topLeft">
          <template slot="title"> {{ text }} </template>
          {{ text }}
        </a-tooltip>
      </template>
      <template slot="relatedPaper" slot-scope="text">
        <a-tooltip placement="topLeft">
          <template slot="title">
            <a :href="text" target="_blank" rel="noopener noreferrer">{{
              text
            }}</a>
          </template>
          <a :href="text" target="_blank" rel="noopener noreferrer">{{
            text
          }}</a>
        </a-tooltip>
      </template>
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
    ellipsis: true,
    width: 150,
    fixed: 'left',
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
    width: 150,
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
    width: 150,
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
      record.size_hours
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
  },
  {
    title: "Size [GB]",
    dataIndex: "size_storage",
    key: "size_storage",
    width: 150,
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
    width: 150,
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
    width: 150,
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
    width: 180,
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
    width: 300,
    // scopedSlots: { customRender: "tags" },
    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.sensors.localeCompare(b.sensors),
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon",
      // customRender: "customRender",
      customRender: "tags",
      // tags: "tags",
    },
    onFilter: (value, record) =>
      record.sensors.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: "Licensing",
    dataIndex: "licensing",
    key: "licensing",
    ellipsis: true,
    width: 'auto',
    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.licensing.localeCompare(b.licensing),
    scopedSlots: {
      // filterDropdown: "filterDropdown",
      // filterIcon: "filterIcon",
      customRender: "licensing",
    },
    onFilter: (value, record) =>
      record.licensing.toString().toLowerCase().includes(value.toLowerCase()),
  },
  {
    title: "Related Paper",
    dataIndex: "relatedPaper",
    key: "relatedPaper",
    ellipsis: true,
    width: 200,
    fixed: 'right',
    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.relatedPaper.localeCompare(b.relatedPaper),
    scopedSlots: {
      // filterDropdown: "filterDropdown",
      // filterIcon: "filterIcon",
      customRender: "relatedPaper",
    },
    // onFilter: (value, record) =>
    //   record.relatedPaper
    //     .toString()
    //     .toLowerCase()
    //     .includes(value.toLowerCase()),
  },
];

export default {
  data() {
    return {
      columnsSelect: [
        {
          index: 1,
          key: "id",
          name: "Name",
        },
        {
          index: 2,
          key: "citationCount",
          name: "N° Citations",
        },
        {
          index: 3,
          key: "size_hours",
          name: "Size [h]",
        },
        {
          index: 4,
          key: "size_storage",
          name: "Size [GB]",
        },
        {
          index: 5,
          key: "frames",
          name: "Frames",
        },
        {
          index: 6,
          key: "numberOfScenes",
          name: "N° Scenes",
        },
        {
          index: 7,
          key: "lengthOfScenes",
          name: "Scene Length [s]",
        },
        {
          index: 8,
          key: "sensors",
          name: "Sensortypes",
        },
        {
          index: 9,
          key: "licensing",
          name: "Licensing",
        },
        {
          index: 10,
          key: "relatedPaper",
          name: "Related Paper",
        },
      ],
      labelCol: { span: 2 },
      wrapperCol: { span: 6 },
      form: {
        arr: [],
      },
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
        licensing:
          !item.licensing || item.licensing === "-" ? "--" : item.licensing,
        relatedPaper:
          !item.relatedPaper || item.relatedPaper === "-"
            ? "--"
            : item.relatedPaper,
      };
    });
  },
  methods: {
    handleChange() {
      console.log('this.form.arr===============',this.form.arr);
      // console.log('columns===============',columns);
      // arr.filter(item => arrtemp.includes(item.key))
      this.columns=columns.filter((item)=>{
        console.log('item.key============',item.key,this.form.arr.includes(item.key) )
        return   this.form.arr.includes(item.key)
      })
      console.log( "this.columns====================",this.columns)
    },
    tagColor(tag) {
      // console.log("tag===================", tag);
      switch (tag.trim()) {
        case "camera":
          return "green";
        case "lidar":
          return "geekblue";
        case "radar":
          return "volcano";
        case "gps/imu":
          return "gold"; // 金色
        case "gps":
          return "orange"; // 橙色
        default:
          return "blue"; // 蓝色
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
<style lang="scss" scoped>
.title {
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
}
.table-operations {
  margin-bottom: 16px;
}

.table-operations > button {
  margin-right: 8px;
}
</style>
