<script setup lang="ts">
import type { TextStoreModel } from "@/model/text-store";
import dayjs from "dayjs";
import { Empty, Message } from "@arco-design/web-vue";
import { useI18n } from "vue-i18n";
import { watch } from "vue";

const props = defineProps<{
  loginUser: string;
}>();

const { t } = useI18n();
let entity = $ref<TextStoreModel>();

watch(
  () => props.loginUser,
  () => {
    init();
  }
);

function init(date?: string, question?: string) {
  entity = undefined;

  const textStr = localStorage.getItem(props.loginUser);

  if (!textStr) {
    return;
  }

  const textArr = JSON.parse(textStr) as TextStoreModel[];

  textArr.reverse();

  const targetDate = date ?? dayjs().format("YYYY-MM-DD");

  entity = textArr.find((item) =>
    date
      ? item.date === targetDate
      : dayjs(+item.date).format("YYYY-MM-DD") === targetDate &&
        (question
          ? item.question.startsWith(question.replace("...", ""))
          : true)
  );

  console.log("entity", entity);
}

init();

async function copyContent(content: string) {
  try {
    // 获取article元素的文本内容
    // 使用Clipboard API复制文本到剪贴板
    await navigator.clipboard.writeText(content);
    Message.success(t("result.copySuccess"));
  } catch (err) {
    Message.error(t("result.copyError"));
  }
}

defineExpose({
  init,
});
</script>

<template>
  <Empty v-if="!entity" />
  <div v-else class="result box p-10">
    <section>
      <div class="mb-10 df">
        <article class="box question" @click="copyContent(entity.question)">
          {{ entity.question }}
        </article>
      </div>

      <div
        v-for="answer in entity.answer"
        :key="answer.date"
        class="mb-10 df answer-container"
      >
        <article class="box answer" @click="copyContent(answer.content)">
          {{ answer.content }}
        </article>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
.result {
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  height: 100%;
  overflow-y: auto;

  .question {
    border: 1px solid #45454e;
  }

  .answer-container {
    justify-content: flex-end;

    .answer {
      background-color: #2d65f7;
      color: white;
    }
  }

  article {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 10px 16px;
    border-radius: 12px;
    min-height: 46px;

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
