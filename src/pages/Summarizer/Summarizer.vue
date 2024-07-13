<script lang="ts" setup>
import Alert from "./Alert.vue";
import { Textarea, Button, Message } from "@arco-design/web-vue";
import postSummarizer,  { type SummarizerResponse } from "@/api/summarizer";
import type { TextStoreModel } from "@/model/text-store";
import { computed } from "vue";
import dayjs from "dayjs";
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  loginUser: string;
}>()

const emit = defineEmits(["onSubmit"]);

const {t} = useI18n();

const inputArray = $ref<TextStoreModel[]>([]);
let inputText = $ref("");
let isloading = $ref(false);

let cancelLock = false;
let cancelRequest: ((reason?: any) => void) | null = null;

const isDisabled = computed(() => !inputText);

function wordLength(params: string) {
  let length = 0;
  for (let i = 0; i < params.length; i++) {
    const char = params[i];
    if (char.match(/[\u4e00-\u9fff\u3000-\u303f]/)) {
      length += 2;
    } else {
      length += 1;
    }
  }
  return length;
}

async function handleSummarizer() {
  let temp = inputArray[inputArray.length - 1];

  if (inputText !== temp?.question) {
    const newQuestion = {
      date : dayjs().valueOf().toString(),
      question: inputText,
      answer: [],
    }
    inputArray.push(newQuestion);
    temp = newQuestion;
  }

  isloading = true;
  cancelLock = true;

  const res = postSummarizer({
    messages: [
      {
        role: "user",
        content: inputText,
      },
    ],
    model: "model-6b/model-100b",
    stream: false,
  });

  cancelRequest = res.cancelRequest;

  try {
    const request = await res.request as SummarizerResponse;

    temp.answer.push({
      date: dayjs().valueOf().toString(),
      content: request.content
    });

    localStorage.setItem(props.loginUser, JSON.stringify(inputArray));

    emit("onSubmit");
  } catch (error) {
    console.error(error);

    if (error === "取消了") {
      isloading = false;
      return
    }

    Message.error(t('request.serverError'));
  } finally { 
    release();
  }
}

function checkClick() {

  if (cancelLock) {
    cancelLock = false;
    return
  }

  if (isloading) {
    cancelRequest?.();
    Message.info(t('summarizer.cancelSummarizer'))
  }
}

function release() {
     isloading = false;
    cancelLock = false;
}

</script>

<template>
  <div class="summarizer df">
    <Alert />

    <Textarea
      class="text-area box"
      v-model:model-value="inputText"
      :placeholder="$t('summarizer.textPlaceholder')"
      show-word-limit
      :max-length="16000"
      :word-length="wordLength"
    />

    <div class="sum" @click="checkClick">
      <Button
      type="primary"
      class="sum"
      :disabled="isDisabled"
      :loading="isloading"
      @click="handleSummarizer"
    >
      {{ $t("summarizer.beginSummarizer") }}
    </Button>
    </div>
  </div>
</template>

<style>
.summarizer {
  flex-direction: column;
  row-gap: 20px;
  height: 100%;

  .text-area {
    flex: 1;
    border: 1px solid #e5e5e5;
  }

  .sum {
    width: 100%;
  }
}
</style>
