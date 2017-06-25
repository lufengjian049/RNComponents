import {Component} from 'react'
import {View,Text} from 'react-native'

// import Icon from './Components/Icon'

class Example extends Component{
  state = {
    inner: null
  }
  render(){
    const inner = this.props.render(this.state.inner,(inner) => this.setState({inner}));
    return (
      <View>
        {inner}
      </View>
    )
  }
}
//测试主面板 
export default class Index extends Component{
  constructor(){
    super();
    const content = [];
    const define = (name, render) => {
      content.push(<Example key={name} render={render}/>);
    }
    //引入需要测试的UI组件
    // Icon.__cards__(define);
    this.state = {content};
  }

  @autoBind
  reload(){
    alert('reload btn and current  state cotent length='+ this.state.content.length);
  }

  render(){
    return (
      <View style={{flex:1,backgroundColor:'#efefef'}}>
      <Text onPress={this.reload}>reload button</Text>
        {this.state.content}
      </View>
    )
  }
}

function autoBind(target, name, {value:fn,configurable,enumerable}){
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