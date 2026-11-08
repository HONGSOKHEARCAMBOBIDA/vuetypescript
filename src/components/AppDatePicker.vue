
<script setup lang="ts">
import type { DatePickerProps } from 'element-plus'

interface Props extends Partial<DatePickerProps> {
  label?: string
  prop?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  prop: '',
  type: 'date',
  placeholder: 'Select date',
  format: 'YYYY-MM-DD',
  valueFormat: 'YYYY-MM-DD',
  clearable: true,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | string | number | null | (Date | string | number)[]]
  change: [value: Date | string | number | null | (Date | string | number)[]]
}>()
</script>

<template>
  <el-form-item
    :prop="props.prop"
    :label="props.label"
    class="app-date-picker mb-4"
  >
    <el-date-picker
      v-bind="props"
      :model-value="props.modelValue"
      :start-placeholder="String(props.type).includes('range') ? 'Start date' : undefined"
      :end-placeholder="String(props.type).includes('range') ? 'End date' : undefined"
      class="app-date-picker-input"
      @update:model-value="emit('update:modelValue', $event)"
      @change="emit('change', $event)"
    />
  </el-form-item>
</template>

<style scoped>
.app-date-picker {
  width: 100%;
}

.app-date-picker :deep(.el-form-item__content) {
  width: 100%;
}

.app-date-picker-input {
  width: 100% !important;
}
</style>
