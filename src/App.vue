<script setup lang="ts">
import { ConfigProvider } from '@arco-design/web-vue';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-CN';
import Header from "./pages/Header/Header.vue"
import Daly from './pages/Daly/Daly.vue';
import Summarizer from "./pages/Summarizer/Summarizer.vue"
import Result from "./pages/Result/Result.vue"
import type { TextSimpleDisplay } from './model/text-store';


let lang = $ref(zhCN);
const dalyRef = $ref<InstanceType<typeof Daly> | null>(null);
let loginUser = $ref(localStorage.getItem("loginUser") || "Username");
let selectedDateQueston = $ref("");

function onChangeUser(userName:string) {
  console.log("userName", userName);

  loginUser = userName;

  localStorage.setItem("loginUser", userName);
}

function onSubmit() {
  console.log("onSubmit");
  
  dalyRef?.init(loginUser)
}

function handleDaleSeleted(data:TextSimpleDisplay) {
  console.log("handleDaleSeleted",data);
}
</script>

<template>
  <ConfigProvider :locale="lang">
    <Suspense>
      <main class="main">
        <Header :loginUser="loginUser" @changeUser="onChangeUser" />

        <div class="m-30-30 df infos">
          <Daly ref="dalyRef" :loginUser="loginUser" @onSelected="handleDaleSeleted" />

          <Summarizer :loginUser="loginUser" @onSubmit="onSubmit"/>

          <Result/>
        </div>
      </main>
    </Suspense>
  </ConfigProvider>
</template>

<style scoped>
.main {
  box-sizing: border-box;
  height: 100vh;
  background-color: rgb(243,245,250);
  padding: 10px;

  .infos {
    column-gap: 10px;
    height: calc(100vh - 140px);

    & > div {
     flex: 1; 
    }
  }
}
</style>
