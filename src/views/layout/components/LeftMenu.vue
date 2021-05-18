<template>
  <a-menu
    :default-selected-keys="[$route.matched[1] ? $route.matched[1].name : '']"
    :default-open-keys="[$route.matched[0].name]"
    mode="inline"
    theme="dark"
    :inline-collapsed="$store.state.collapsed"
  >
  <template v-for="item in $store.state.menuRoutes">
    <a-sub-menu  :key="item.name" v-if="!item.meta.hidden">
      <span slot="title"
        ><a-icon :type="item.meta.icon" /><span>{{ item.meta.title }}</span>
      </span>
      <template v-for="child in item.children">
        <a-menu-item  :key="child.name" v-if="!child.meta.hidden">
        <router-link :to="{ name: child.name }"
          ><a-icon :type="child.meta.icon" />
          {{ child.meta.title }}</router-link
        >
      </a-menu-item>
      </template>

    </a-sub-menu>
  </template>

  </a-menu>
</template>
