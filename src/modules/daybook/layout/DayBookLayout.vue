<template>
  <NavbarDay />

  <div class="d-flex">
    <div class="col-4"><EntryList /></div>
    <div class="col">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    NavbarDay: defineAsyncComponent(() =>
      import("../components/NavbarDay.vue")
    ),
    EntryList: defineAsyncComponent(() =>
      import("../components/EntryList.vue")
    ),
  },
};
</script>

<style>
</style>