import React from 'react'
import {View} from 'react-native'

// import Icon from './Components/Icon'

class Example extends React.Component{
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
export default class Index extends React.Component{
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
  render(){
    return (
      <View style={{flex:1,backgroundColor:'#efefef'}}>
        {this.state.content}
      </View>
    )
  }
}