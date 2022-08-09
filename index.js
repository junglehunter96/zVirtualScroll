import VirtualScroll  from "./components/zVirtualScroll.vue";


// 放置到数组中
const components = [VirtualScroll];
export default {
  // 传入两个参数，app是实例，options是app.use(bao,options)的时候，传入的第二个值
  install: (app, options) => {
    components.forEach(item => {
      // 循环一个个导入组件
      app.component(item.name, item)
    });
  }
}
