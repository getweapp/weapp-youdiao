function a(){
  console.log('I am function a')
}

function b(){
  console.log('I am function b')
}


function c(){
  console.log('I am function c and i am a default export 2')
}

// 导出number型
export var num = 1
export let numberObject = new Number(num)

// 导出string型
export var str = 'liyanfeng'
export let stringObject = new String(str)

// 导出boolean型
export let bool = true;
export const booleanObject = new Boolean(bool);

// 导出null型
export var Null = null

// 导出undefined型
export let Undefined = void 0

// 导出Symbol
export let symbol = Symbol('liyanfeng')

export const object = {
  name: '李彦峰',
  age: 26
}

var obj = {
  0:0,
  1:1,
  length:2
}

export var sayName = function(){
  console.log('我是李彦峰')
}

export const arr = [1,2,3,obj]


function copy(obj){
  if(typeof obj === 'object'){
    return JSON.parse(JSON.stringify(obj))
  }
}
export { copy }




console.log('I am file utils.js')

export const PI = Math.PI;


export { a, b }
export default c

export function handleTitle(title = []){
  if(Array.isArray(title)){
    return title.join('')
  }
  return ''
}
