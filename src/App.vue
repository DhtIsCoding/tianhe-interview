<script setup lang="ts">
import { ConfigProvider } from '@arco-design/web-vue';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-CN';
import Header from "./pages/Header/Header.vue"
import Daly from './pages/Daly/Daly.vue';
import Summarizer from "./pages/Summarizer/Summarizer.vue"
import Result from "./pages/Result/Result.vue"
import type { TextSimpleDisplay } from './model/text-store';

const dalyRef = $ref<InstanceType<typeof Daly> | null>(null);
const resultRef = $ref<InstanceType<typeof Result> | null>(null);

let lang = $ref(zhCN);
let loginUser = $ref(localStorage.getItem("loginUser") || "Username");

function onChangeUser(userName:string) {
  console.log("userName", userName);

  loginUser = userName;

  localStorage.setItem("loginUser", userName);
}

function onSubmit() {
  dalyRef?.init(loginUser)
}

function handleDaleSeleted(data:TextSimpleDisplay) {
  resultRef?.init(data.date, data.question)
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

          <Result ref="resultRef" :loginUser="loginUser"/>
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
