<template>
	<div ref="container" class="scroll-box container"
		:style="`height: ${showNumber * itemHeight}px;width:${boxWidth > 0 ? boxWidth+'px':'100%'}`">
		<div class="scroll-blank" :style="`height: ${list.length * itemHeight}px;`"></div>
		<div class="scroll-data" :style="`top: ${positionTop}px;`">
			<div v-for="(item) in activeList" :key="key === 'raw' ? item : item[key]" :style="`height: ${itemHeight}px;`">
				 <slot :item="item"></slot>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'zVirtualScroll',
}
</script>
<script setup>
import { computed, onMounted, onUnmounted, ref, defineProps } from 'vue'
const props = defineProps({
	list: {
		type: Array,
		required: true,
		default: () => []
	},
	itemHeight: {
		type: Number,
		default: 10,
		required: true,
	},
	showNumber: {
		type: Number,
		default: 10,
		required: true,
	},
	boxWidth: {
		type: Number,
		default: -1
	},
	key: {
		type: String,
		default: 'raw'
	}
})

const container = ref(null) // 外框盒子
let startNum = ref(0) // 当前视窗范围内第一个元素下标
let positionTop = ref(0) // 当前视窗范围内第一个元素偏移量
// 计算当前视窗内实际要渲染的内容
const activeList = computed(() => {
	const start = startNum.value
	return props.list.slice(start, start + props.showNumber)
})
// 滚动的时候计算当前视窗范围内第一个元素下标
const scrollEvent = (event) => {
	const { scrollTop } = event.target
	startNum.value = parseInt(scrollTop / props.itemHeight)
	positionTop.value = scrollTop
}
onMounted(() => {
	container.value.addEventListener('scroll', scrollEvent)
})
onUnmounted(() => {
	if (!container.value) return
	container.value.removeEventListener('scroll', scrollEvent)
	container.value = null
})
</script>
<style scoped>
.scroll-box {
	position: relative;
	overflow: auto;
	width: 100%;
	border: 1px solid rgb(0, 0, 0);
}

.scroll-data {
	position: absolute;
	width: 100%;
}

.scroll-item:hover {
	background: #fafafa;
	color: #fff;
}
</style>