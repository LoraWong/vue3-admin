<template>
  <div>111</div>
  <!-- <el-form>
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col>
            <el-form-item :label="item.label">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input :placeholder="item.placeholder" :show-password="item.type === 'password'"/>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form> -->
</template>

<script setup>
import {} from 'vue'

defineProps({
  formItems: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss" scoped></style>
