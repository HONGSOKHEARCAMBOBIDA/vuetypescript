<script setup lang="ts">
import type { InputProps } from "element-plus";

interface Props extends Partial<InputProps> {
  label?: string;
  prop?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
  enter: [];
}>();

const handleInput = (value: string | number) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <el-form-item label-position="top" :label="props.label" :prop="props.prop">
    <el-input
      :model-value="props.modelValue"
      @update:model-value="handleInput"
      @keydown.enter="emit('enter')"
      :type="props.type"
      :placeholder="props.placeholder"
      :prefix-icon="props.prefixIcon"
      :show-password="props.type === 'password'"
      size="small"
      :disabled="props.disabled"
      :clearable="props.clearable"
      :autofocus="props.autofocus"
      :readonly="props.readonly"
    >
      <template v-if="props.suffixIcon" #suffix>
        {{ props.suffixIcon }}
      </template>
    </el-input>
  </el-form-item>
</template>
