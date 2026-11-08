<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import type { TableColumnCtx } from "element-plus";

interface RowData {
  [key: string]: any;
}

interface Column extends Partial<TableColumnCtx<RowData>> {
  prop?: string;
  label?: string;
  slot?: string;
}

interface Props {
  data?: RowData[];
  columns: Column[];
  loading?: boolean;
  showIndex?: boolean;
  indexLabel?: string;
  actionsLabel?: string;
  actionsWidth?: string | number;
  mobileBreakpoint?: number;
  showPagination?: boolean;
  currentPage?: number;
  pageSize?: number;
  total?: number;
  tableProps?: Record<string, any>;
  selectable?: boolean;
  expandable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  loading: false,
  showIndex: false,
  indexLabel: "ល.រ",
  actionsLabel: "សកម្មភាព",
  actionsWidth: 190,
  mobileBreakpoint: 768,
  showPagination: true,
  currentPage: 1,
  pageSize: 10,
  total: 0,
  tableProps: () => ({}),
  selectable: false,
  expandable: false,
});

const emit = defineEmits<{
  "update:currentPage": [value: number];
  "update:pageSize": [value: number];
  "page-change": [];
  "selection-change": [rows: RowData[]];
}>();

const currentPageProxy = computed({
  get: () => props.currentPage,
  set: (value) => emit("update:currentPage", value),
});

const pageSizeProxy = computed({
  get: () => props.pageSize,
  set: (value) => emit("update:pageSize", value),
});

const windowWidth = ref(0);
const isMobile = computed(() => windowWidth.value <= props.mobileBreakpoint);

const onResize = () => (windowWidth.value = window.innerWidth);

onMounted(() => {
  onResize();
  window.addEventListener("resize", onResize);
});

onUnmounted(() => window.removeEventListener("resize", onResize));

const selectedRows = ref<RowData[]>([]);

const isSelected = (row: RowData) => selectedRows.value.includes(row);

const onSelectionChange = (rows: RowData[]) => {
  selectedRows.value = rows;
  emit("selection-change", rows);
};

const toggleMobileSelection = (row: RowData, checked: boolean) => {
  selectedRows.value = checked
    ? [...selectedRows.value, row]
    : selectedRows.value.filter((item) => item !== row);

  emit("selection-change", selectedRows.value);
};

watch(
  () => props.data,
  () => {
    selectedRows.value = [];
    emit("selection-change", []);
  },
);
</script>

<template>
  <div class="app-table">
    <div v-if="showPagination" class="app-table-pagination">
      <span>សរុប {{ total }}</span>

      <el-pagination
        v-model:current-page="currentPageProxy"
        v-model:page-size="pageSizeProxy"
        :total="total"
        :layout="isMobile ? 'prev, next' : 'prev, pager, next'"
        @change="emit('page-change')"
      />
    </div>

    <el-table
      v-if="!isMobile"
      :data="data"
      v-loading="loading"
      stripe
      border
      v-bind="tableProps"
      @selection-change="onSelectionChange"
    >
      <el-table-column v-if="selectable" type="selection" width="50" />

      <el-table-column
        v-if="showIndex"
        type="index"
        :label="indexLabel"
        width="50"
        align="center"
      />

      <el-table-column v-if="expandable" type="expand">
        <template #default="scope">
          <slot name="expand" v-bind="scope" />
        </template>
      </el-table-column>

      <el-table-column
        v-for="col in columns"
        :key="col.prop || col.label"
        v-bind="col"
      >
        <template v-if="col.slot" #default="scope">
          <slot :name="col.slot" v-bind="scope" />
        </template>
      </el-table-column>

      <el-table-column
        v-if="$slots.actions"
        :label="actionsLabel"
        :width="actionsWidth"
      >
        <template #default="scope">
          <slot name="actions" v-bind="scope" />
        </template>
      </el-table-column>
    </el-table>

    <div v-else class="app-table-cards" v-loading="loading">
      <el-empty v-if="!data.length && !loading" description="គ្មានទិន្នន័យ" />

      <div
        v-for="(row, idx) in data"
        :key="idx"
        class="app-table-card"
        :class="{ 'is-selected': selectable && isSelected(row) }"
      >
        <el-checkbox
          v-if="selectable"
          :model-value="isSelected(row)"
          @change="(val: boolean) => toggleMobileSelection(row, val)"
        />

        <div
          v-for="col in columns"
          :key="col.prop || col.label"
          class="app-table-card-row"
        >
          <span class="app-table-card-label">{{ col.label }}</span>

          <span class="app-table-card-value">
            <slot v-if="col.slot" :name="col.slot" :row="row" :$index="idx" />
            <template v-else>{{ row[col.prop || ""] }}</template>
          </span>
        </div>

        <div v-if="$slots.actions" class="app-table-card-actions">
          <slot name="actions" :row="row" :$index="idx" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-table-pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
}

.app-table-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.app-table-card {
  padding: 12px 14px;
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  background: var(--el-bg-color);
}

.app-table-card-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 6px 0;
  border-bottom: 1px dashed var(--el-border-color-lighter);
  font-size: 13px;
}

.app-table-card-label {
  color: var(--el-text-color-secondary);
  flex-shrink: 0;
}

.app-table-card-value {
  text-align: right;
  word-break: break-word;
}

.app-table-card-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--el-border-color-lighter);
}

.app-table-card.is-selected {
  border-color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
}

@media (max-width: 768px) {
  .app-table-pagination {
    justify-content: center;
  }
}
</style>
