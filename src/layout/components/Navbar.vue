<template>
  <div class="navbar">
    <!-- 菜单伸缩按钮 -->
    <Hamburger class="hamburger-container"></Hamburger>
    <!-- 面包屑 -->
    <Breadcrumb id="guide-breadcrumb" class="breadcrumb-container"></Breadcrumb>
    <!-- 右侧 -->

    <div class="right-menu">
      <!-- guide -->
      <Guide class="right-menu-item hover-effect"></Guide>
      <!-- 搜索 -->
      <HeaderSearch class="right-menu-item hover-effect"></HeaderSearch>
      <!-- 全屏切换 -->
      <Screenfull class="right-menu-item hover-effect"></Screenfull>
      <!-- 主题切换 -->
      <ThemeSelect class="right-menu-item hover-effect"></ThemeSelect>
      <!-- 语言切换 -->
      <LangSelect class="right-menu-item hover-effect"></LangSelect>

      <!-- 头像 -->
      <el-dropdown class="avatar-container">
        <el-avatar class="avatar-wrapper">
          <svg-icon icon="avatar"></svg-icon>
        </el-avatar>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout">{{
              $t('msg.navBar.logout')
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- name -->
      <div class="right-menu-item hover-effect name-container">
        <h4 class="name" v-if="$store.getters.sidebarOpened">
          {{ $store.getters.userInfo.title }}
        </h4>
        <!-- 箭头图标 -->
        <el-dropdown class="">
          <svg-icon icon="down" class="down-icon"></svg-icon>
          <template #dropdown>
            <el-dropdown-menu class="">
              <router-link to="/">
                <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
              </router-link>
              <el-dropdown-item divided @click="logout">{{
                $t('msg.navBar.logout')
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import Hamburger from '@/components/hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import LangSelect from '@/components/LangSelect'
import { useStore } from 'vuex'
import ThemeSelect from '@/components/ThemeSelect'
import Screenfull from '@/components/Screenfull'
import HeaderSearch from '@/components/HeaderSearch'
import Guide from '@/components/Guide'

const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 40px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;
    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
    ::v-deep .avatar-container {
      cursor: pointer;
      padding-left: 10px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        font-size: 40px;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
    .name-container {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .name {
      font-size: 12px;
      font-weight: 400;
      color: black;
      line-height: 50px;
      padding: 0 10px;
    }
  }
}
</style>
