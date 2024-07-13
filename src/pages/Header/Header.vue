<script setup lang="ts">
import { Avatar,Dropdown,Modal,Input, Message} from "@arco-design/web-vue"
import {useI18n} from "vue-i18n"

defineProps<{
    loginUser: string;
}>()

const emit = defineEmits(['changeUser'])

let userLoginModalVis = $ref(false);
let userName = $ref<string>();

const { t } = useI18n();

function onChangeUser(params:any) {
    console.log('params', params);

    switch (params) {
        case '1':
            userLoginModalVis = true;
            break;
        default:
            throw new Error("未实现");
    }
}

function handleCancel() {
    userName = undefined;
    userLoginModalVis = false;
}

function handleOk() {
    if (!userName) {
        Message.error(t('header.nameUnknown'));
        return;
    }

    userLoginModalVis = false;
    emit('changeUser', userName);
}

</script>

<template>
    <div class="box m-10-30 p-0-20 df header">
        <h1>AI 工具箱</h1>

        <div>
            <Avatar class="mr-10"/>
            <Dropdown trigger="hover" @select="onChangeUser">
                <span>
                    {{ loginUser }}
                </span>
                <template #content>
                    <a-doption value="1">
                        {{ $t('header.changeUser') }}
                    </a-doption>
                </template>
            </Dropdown>
        </div>

        <Modal :title="$t('header.changeUser')" :visible="userLoginModalVis" @ok="handleOk" @cancel="handleCancel">
            <Input v-model:model-value="userName"/>
        </Modal>
    </div>
</template>

<style lang="less" scoped>
.header {
    justify-content: space-between
}
</style>
