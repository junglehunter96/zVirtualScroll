### 极简vue3 虚拟滚动

## install

```shell
npm install vue3-virtual-scroll-component
```

```html
<template>
 <VirtualScroll :showNumber="20" :itemHeight="20" :list="list">
   <template v-slot="{item}">
       {{item}}
    </template>
  </VirtualScroll>
</template>

<script setup>
 const list =  Object.keys(new Array(10000).fill(''))
</script>
```

作用域插槽返回了1个字段：
`item` 原始数据

#### `Props` 完整参数

| 参数名              | 类型    | 默认值     | 描述                                                                               |
| ----------------- | ------- | ----------- | ----------------------------------------------------------------------------------------- |
| `list`            | `Array`   | `[]`          | 列表数据 |
| `itemHeight`          | `Number`  | `10`           | 每一行的高度，该字段为必填 |
| `showNumber`     | `Number`  | `10`     | 一屏展示的数量 |
| `key`          | `String`  | `raw`          | 每一行的唯一key，不传默认为原始类型 直接取值 |
