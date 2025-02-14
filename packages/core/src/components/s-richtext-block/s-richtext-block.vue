<!-- 装修营销组件：营销文章 -->
<template>
  <view
    :style="[
      {
        marginLeft: styles.marginLeft + 'px',
        marginRight: styles.marginRight + 'px',
        marginBottom: styles.marginBottom + 'px',
        marginTop: styles.marginTop + 'px',
        padding: styles.padding + 'px',
      },
    ]"
  >
    <mp-html class="richtext" :content="state.content"></mp-html>
  </view>
</template>
<script setup>
  import { reactive, onMounted } from 'vue';
  import { $api } from '../../index';

  const props = defineProps({
    data: {
      type: Object,
      default: {},
    },
    styles: {
      type: Object,
      default() {},
    },
  });

  const state = reactive({
    content: '',
  });

  onMounted(async () => {
    const { data } = await $api?.promotion?.articleApi?.getArticle(props.data.id);
    state.content = data.content;
  });
</script>
