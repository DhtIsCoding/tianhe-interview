<script setup lang="ts">
import { computed, watchEffect } from "vue";
import type { TextStoreModel, TextSimpleDisplay } from "@/model/text-store";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
import { Empty, Button } from "@arco-design/web-vue";
import { IconDelete, IconClose } from "@arco-design/web-vue/es/icon";

const props = defineProps<{
  loginUser: string;
}>();

const emits = defineEmits(["onSelected"]);

const { t } = useI18n();

const today = dayjs().format("YYYY-MM-DD");

let displayTexts = $ref<Map<string, TextSimpleDisplay[]>>(new Map());
const isEmpty = computed(() => !![...displayTexts.keys()].length);

function init(loginUser: string) {
  displayTexts = new Map();

  const textStr = localStorage.getItem(loginUser);

  if (!textStr) {
    return;
  }

  const textArr = JSON.parse(textStr) as TextStoreModel[];

  for (const iterator of textArr) {
    const temp = displayTexts.get(transData(iterator.date));
    const question = iterator.question.slice(0, 10);
    if (temp) {
      temp.push({
        date: iterator.date,
        question:
          question.length === 10
            ? iterator.question.slice(0, 10) + "..."
            : question,
      });
    } else {
      displayTexts.set(transData(iterator.date), [
        {
          date: iterator.date,
          question:
            question.length === 10
              ? iterator.question.slice(0, 10) + "..."
              : question,
        },
      ]);
    }
  }
}

watchEffect(() => {
  init(props.loginUser);
});

function transData(params: string) {
  const temp = dayjs(+params).format("YYYY-MM-DD");

  return today === temp ? t("daly.today") : temp;
}

function onDateSelected(item: TextSimpleDisplay) {
  emits("onSelected", item);
}

function handleDelByDate(date: string) {
  displayTexts.delete(date);

  const textStr = localStorage.getItem(props.loginUser)!;

  const textArr = JSON.parse(textStr) as TextStoreModel[];

  localStorage.setItem(
    props.loginUser,
    JSON.stringify(
      textArr.filter((item: TextStoreModel) => transData(item.date) !== date)
    )
  );
}

function handleDelByQuestion(date: string, question: string) {
  const temp = displayTexts.get(date);

  displayTexts.set(
    date,
    temp!.filter(
      (item) => !item.question.startsWith(question.replace("...", ""))
    )
  );

  const textStr = localStorage.getItem(props.loginUser)!;

  const textArr = JSON.parse(textStr) as TextStoreModel[];

  localStorage.setItem(
    props.loginUser,
    JSON.stringify(
      textArr.filter(
        (item: TextStoreModel) =>
          item.date !== date &&
          item.question.startsWith(question.replace("...", ""))
      )
    )
  );
}

defineExpose({ init });
</script>

<template>
  <div v-if="isEmpty" class="daly">
    <section
      v-for="[date, texts] in displayTexts.entries()"
      :key="date"
      class="mb-10"
    >
      <div class="df date">
        <span>
          {{ date }}
        </span>

        <Button type="text" @click="handleDelByDate(date)" style="color: black">
          <template #icon>
            <IconDelete />
          </template>
        </Button>
      </div>
      <div
        v-for="item in texts"
        :key="item.date"
        class="item p-5-10 m-10-0 df"
        @click="onDateSelected(item)"
      >
        <span>
          {{ item.question }}
        </span>
        <Button
          type="text"
          @click.stop="handleDelByQuestion(item.date, item.question)"
        >
          <template #icon>
            <IconClose />
          </template>
        </Button>
      </div>
    </section>
  </div>
  <div v-else class="daly" >
    <section
      class="mb-10"
    >
      <div class="df date">
        <span>
          {{ $t('daly.today') }}
        </span>
      </div>
      <div
        class="empty p-5-10 m-10-0 df"
      >
        <span>
          {{ $t('daly.empty') }}
        </span>
      </div>
    </section>
    </div>
</template>

<style lang="less" scoped>
.daly {
  height: 100%;

  .date {
    justify-content: space-between;
  }

  .item {
    justify-content: space-between;
    box-sizing: border-box;
    background-color: rgb(235, 237, 240);

    &:hover {
      background-color: rgb(162, 169, 189);
      cursor: pointer;
    }
  }

  .empty {
      justify-content: space-between;
    box-sizing: border-box;
    background-color: rgb(235, 237, 240);
  }
}
</style>
