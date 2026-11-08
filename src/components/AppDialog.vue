<script setup lang="ts">
import type { DialogProps } from "element-plus";
import AppButton from "./AppButton.vue";
interface Props extends Partial<DialogProps> {
  title?: string;
  width?: string | number;
  showFooter?: boolean;
  confirmText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Dialog",
  width: "500px",
  showFooter: true,
  confirmText: "យល់ព្រម",
  cancelText: "ចាកចេញ",
  confirmLoading: false,
  closeOnClickModal: false,
  destroyOnClose: true,
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  confirm: [];
  cancel: [];
  close: [];
  open: [];
}>();
</script>

<template>
  <el-dialog
    v-bind="props"
    :model-value="props.modelValue"
    :title="props.title"
    :width="props.width"
    @update:model-value="emit('update:modelValue', $event)"
    @close="emit('close')"
    @open="emit('open')"
  >
    <!-- Dialog Content -->
    <slot />

    <!-- Dialog Footer -->
    <template v-if="props.showFooter" #footer>
      <slot name="footer">
        <div class="flex justify-end gap-2">
          <app-button type="default" @click="emit('cancel')">{{
            props.cancelText
          }}</app-button>

          <app-button :loading="props.confirmLoading" @click="emit('confirm')">
            {{ props.confirmText }}</app-button
          >
        </div>
      </slot>
    </template>
  </el-dialog>
</template>
