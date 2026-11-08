
<script setup lang="ts">
interface FilterField {
  slot: string
  span?: number
}

withDefaults(defineProps<{
  fields?: FilterField[]
  actionSpan?: number
}>(), {
  fields: () => [],
  actionSpan: 3,
})
</script>

<template>
  <el-card class="filter-card">
    <el-row :gutter="12">
      <el-col
        v-for="(field, i) in fields"
        :key="i"
        :xs="24"
        :sm="12"
        :md="field.span || 6"
      >
        <slot :name="field.slot" />
      </el-col>

      <el-col :xs="24" :sm="12" :md="actionSpan" class="filter-actions">
        <slot name="actions" />
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
.filter-card {
  margin-bottom: 8px;
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .filter-actions {
    justify-content: stretch;
  }

  .filter-actions :deep(.el-button) {
    width: 100%;
  }
}
</style>
