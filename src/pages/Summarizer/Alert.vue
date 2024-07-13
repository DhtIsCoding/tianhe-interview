<script setup lang="ts">
import { IconInfoCircleFill, IconClose } from '@arco-design/web-vue/es/icon';

const size = 24;

let show = $ref(true);

function handleClose() {
    show = false
}

</script>

<template>
    <div v-if="show" class="alert box p-15 df">
        <IconInfoCircleFill :size="size" class="info"/>
        <span class="ml-10 text">
            {{ $t("summarizer.alert.alertText") }}
        </span>

        <IconClose class="close" :size="size" @click="handleClose"/>
    </div>
</template>

<style lang="less" scoped>
.alert {
    box-sizing: border-box;
    width: 100%;
    box-shadow: 0px 8px 24px -4px #5B6F971F;

    .info {
        color: rgb(32, 128, 240)
    }

    .text {
        margin-right: auto
    }

    .close:hover {
        cursor: pointer
    }
}
</style>