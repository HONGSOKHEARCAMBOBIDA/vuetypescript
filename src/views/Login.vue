<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import axios from "axios";

import { useAuthStore } from "../store/auth";
import { login } from "../api/services";
import AppButton from "../components/AppButton.vue";
import AppInput from "../components/AppInput.vue";
import type { LoginRequest } from "../types/auth";
import AppCard from "../components/AppCard.vue";
import { Eleme } from "@element-plus/icons-vue";

const router = useRouter();
const auth = useAuthStore();


// Loading state
const loading = ref<boolean>(false);

// Form reference
const formRef = ref<FormInstance>();

// Form data
const form = reactive<LoginRequest>({
  code: "",
  password: "",
});

// Form validation rules
const rules: FormRules<LoginRequest> = {
  code: [
    {
      required: true,
      message: "សូមបញ្ចូលអត្តលេខ",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "សូមបញ្ចូលពាក្យសម្ងាត់",
      trigger: "blur",
    },
  ],
};

// Login function
const handleLogin = async (): Promise<void> => {
  if (!formRef.value) return;

  try {
    await formRef.value.validate();

    loading.value = true;

    const res = await login({
      code: form.code,
      password: form.password,
    });
    auth.setAuth(res.data.data)

    await router.push("/Dashboard");

    ElMessage.success("ចូលប្រព័ន្ធបានជោគជ័យ");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      ElMessage.error(error.response?.data?.message || "ការចូលប្រព័ន្ធបរាជ័យ");
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <AppCard title="" shadow="never" :padding="24">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      @submit.prevent="handleLogin"
    >
      <AppInput v-model="form.code" label="អត្តលេខ" prop="code" />

      <AppInput
        v-model="form.password"
        label="ពាក្យសម្ងាត់"
        prop="password"
        type="password"
      />

      <AppButton  :loading-icon="Eleme" :loading="loading" native-type="submit" block>
        ចូលប្រព័ន្ធ
      </AppButton>
    </el-form>
  </AppCard>
</template>
