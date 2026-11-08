<script setup lang="ts">
import type { ButtonProps } from "element-plus";
import * as Icons from "@element-plus/icons-vue";

interface Props extends Partial<ButtonProps> {
  icon?: keyof typeof Icons;
  block?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <el-button
    v-bind="$attrs"
    :size="props.size || 'small'"
    :loading="props.loading"
    :disabled="props.disabled || props.loading"
    :circle="props.circle"
    :native-type="props.nativeType"
    :type="props.type || 'default'"
    :class="{
      'app-button': true,
      'app-button--block': props.block,
      'app-button--circle': props.circle,
    }"
  >
    <el-icon v-if="props.icon">
      <component :is="Icons[props.icon]" />
    </el-icon>

    <slot v-if="!props.circle" />
  </el-button>
</template>

<style scoped>
.app-button--block {
  width: 100%;
}
</style>