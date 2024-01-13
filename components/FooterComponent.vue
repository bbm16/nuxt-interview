<template>
  <footer class="bg-white">
    <div class="m-auto max-w-screen-xl px-6 pt-4">
      <div class="block md:grid md:grid-cols-2">
        <div>
          <div class="mb-4 text-2xl font-bold text-primary">DM</div>
          <div class="text-xs text-gray-700 md:max-w-72 md:text-base">
            Our vision is to provide convenience and help increase your sales
            business.
          </div>
        </div>
        <div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          <div v-for="(menu, key) in footerMenus" :key="`menu-${key}`">
            <h3 class="mb-3 text-xl font-bold">{{ menu.title }}</h3>
            <a
              class="mb-2 block text-gray-700"
              v-for="item in menu.children"
              :href="item.link"
              >{{ item.title }}</a
            >
          </div>
        </div>
      </div>
      <div
        class="mt-12 grid grid-cols-2 py-8 text-xs font-semibold md:grid-cols-7 md:border-t md:text-base"
      >
        <a href="#" class="block md:order-2 md:col-span-1">Privacy Policy</a>
        <a href="#" class="block md:order-3 md:col-span-1">Terms & Condition</a>
        <div
          class="col-span-2 mt-8 md:order-1 md:col-span-5 md:mt-0 md:text-left"
        >
          ©{{ year }} DM. All rights reserved
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { footerMenus } from '@/constants/content'
// Not need to be reactive
const year = new Date().getFullYear()
</script>
