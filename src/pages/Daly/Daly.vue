<script setup lang="ts">
import { watchEffect } from "vue"
import type { TextStore ,TextSimpleDisplay} from "@/model/text-store";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  loginUser: string;
}>()

const today = dayjs().format('YYYY-MM-DD');

let displayTexts = $ref<Map<string, TextSimpleDisplay[]>>(new Map());
const {t} = useI18n();

watchEffect(() => { 
  const textStr = localStorage.getItem(props.loginUser);

  if (!textStr) {
      return;
  }

  const textArr = JSON.parse(textStr) as TextStore[];

  for (const iterator of textArr) {
    const temp = displayTexts.get(iterator.date);

    if (temp) {
      temp.push({
        date: iterator.date,
        question: iterator.question.slice(0, 10) + '...'
      });
    } else {
      displayTexts.set(iterator.date, [{
        date: iterator.date,
        question: iterator.question.slice(0, 10) + '...'
      }]);
    }
  }
})

function transData(params: string) {

  const temp = dayjs(params).format('YYYY-MM-DD');
  
  return today === temp ? t('daly.today') : temp;
}

</script>

<template>
  <div>
    <section v-for="[date, texts] in displayTexts.entries()" :key="date">
        <div>
          {{ transData(date)  }}
        </div>
        <div v-for="item in texts" :key="item.date">
            {{ item.question }}
        </div>
    </section>
  </div>
</template>
