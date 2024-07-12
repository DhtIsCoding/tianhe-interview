<script setup lang="ts">
import { ConfigProvider } from '@arco-design/web-vue';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-CN';
import Header from "./pages/Header/Header.vue"

let lang = $ref(zhCN);
let loginUser = $ref("Username");

function onChangeUser(userName:string) {
  console.log("userName",userName);
  
}

</script>

<template>
  <ConfigProvider :locale="lang">
    <Suspense>
      <main class="main">
        <Header :loginUser="loginUser" @changeUser="onChangeUser" />

        <div class="m-30-30 df">
          13213
        </div>
      </main>
    </Suspense>
  </ConfigProvider>
</template>

<style scoped>
.main {
  height: 100vh;
  background-color: rgb(243,245,250);
  padding: 10px;
}
</style>
