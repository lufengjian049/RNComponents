//组件中 方法 绑定当前的对象
//TODO:autobind 方法带参数 还未考虑，还有其他异常情况也未考虑
//NOTE:hahaha
function autobind(target, name, {value:fn,configurable,enumerable}){
  if(typeof fn !== 'function'){
    throw new SyntaxError(`@autobind only can be used on functions,not ${fn}`);
  }
  return {
    configurable,
    enumerable,
    get() {
      //访问器中this就指向当前的对象，而非target(当前对象的原型对象)
      const boundFn = fn.bind(this);
      return boundFn;
    }
  }
}