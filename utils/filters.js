import Vue from 'vue'


/**
 *  金额初始化处理
 * @param value 调用过滤器时，输入的文本
 */
Vue.filter('priceValue', function (value) {
  // 如果文本不存在
   if(!value){
     return '0.00'
   }
  // 文本转化为float
  const result = parseFloat(value)
  // 如果文本为 integer 类型的文本，表示当前文本没有小数
  // if (Number.isInteger(result)) {
  //     return result
  // }
  // 文本中包函数小数
  return result.toFixed(2)
})
