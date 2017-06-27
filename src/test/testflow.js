/**
 * test flow
 * @flow
 */

// 默认类型注解
function multi10(num) {
  return num * 10
}
multi10('10')
// error:string. The operand of an arithmetic operation must be a number

// 类型注解 : 类型
function getLength(str: string) {
  return str.length
}
getLength('strss')
getLength([1, 2, 3])
// array literal. This type is incompatible with the expected param type of
