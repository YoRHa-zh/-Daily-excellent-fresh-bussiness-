<template>
  <div class="header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="$store.dispatch('changeCollapsed')"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>{{
          $route.matched[0].meta.title
        }}</a-breadcrumb-item>
        <a-breadcrumb-item v-if="$route.matched[1]"
          ><a href=""> {{ $route.matched[1].meta.title }}</a></a-breadcrumb-item
        >
      </a-breadcrumb>
    </div>
    <ul class="userInfo">
      <li>{{ $store.state.user.username }}<a-icon type="down" /></li>
      <li
        @click="$router.push({name:'changeUserInfo'})
        "
      >
       修改信息
      </li>
      <li
        @click="
          $store.dispatch('loginOut');
          $router.push('/login');
        "
      >
        退出
      </li>
    </ul>
  </div>
</template>
