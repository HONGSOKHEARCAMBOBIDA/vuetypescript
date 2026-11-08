<script setup lang="ts">
import type { CascaderProps } from 'element-plus'

type CascaderValue = string | number | (string | number)[] | null

interface Props extends Partial<CascaderProps> {
  modelValue?: CascaderValue
  label?: string
  prop?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  prop: '',
  placeholder: 'Select',
})

const emit = defineEmits<{
  'update:modelValue': [value: CascaderValue]
  change: [value: CascaderValue]
}>()
</script>

<template>
  <el-form-item
    :label="props.label"
    :prop="props.prop"
    class="mb-3"
  >
    <el-cascader
      v-bind="props"
      :model-value="props.modelValue"
      :placeholder="props.placeholder"
      class="w-full"
      @update:model-value="emit('update:modelValue', $event)"
      @change="emit('change', $event)"
    />
  </el-form-item>
</template>