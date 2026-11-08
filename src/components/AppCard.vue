
<script setup lang="ts">
import { computed } from 'vue'
import type { CardProps } from 'element-plus'
import { useScreenSize } from '../composables/useScreenSize'

interface Props {
  title?: string
  description?: string
  shadow?: CardProps['shadow']
  padding?: string | number
  header?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  shadow: 'hover',
  padding: '40px',
  header: true,
})

const { isMobile } = useScreenSize()

const cardStyle = computed(() => ({
  width: '100%',
  maxWidth: isMobile.value ? '100%' : '480px',
}))

const bodyStyle = computed(() => ({
  padding: typeof props.padding === 'number'
    ? `${props.padding}px`
    : props.padding,
}))
</script>

<template>
  <div class="center">
    <el-card
      :shadow="props.shadow"
      :style="cardStyle"
      :body-style="bodyStyle"
    >
      <template
        v-if="props.header && (props.title || props.description || $slots.header)"
        #header
      >
        <slot name="header">
          <div class="flex flex-col gap-1">
            <span class="font-semibold">{{ props.title }}</span>

            <span v-if="props.description" class="text-sm text-gray-500">
              {{ props.description }}
            </span>
          </div>
        </slot>
      </template>

      <slot />

      <template v-if="$slots.footer" #footer>
        <slot name="footer" />
      </template>
    </el-card>
  </div>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
}
</style>
