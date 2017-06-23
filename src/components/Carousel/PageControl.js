import React,{PropTypes} from 'react'
import {View,Text,StyleSheet} from 'react-native'

const PageControl = props => {
    const {count,selectedIndex,style} = props;
    const styles = StyleSheet.create({
        circle:{
            margin:2,
            width:props.circlewidth,
            height:props.circlewidth,
            borderRadius: props.circlewidth / 2,
        },
        full:{
            backgroundColor:props.activeColor
        },
        empty:{
            backgroundColor:props.color
        },
        container:{
            justifyContent:'center',
            alignItems:'center',
        },
        innerContainer:{
            flexDirection:'row'
        }
    })
    const Circle = props => (
        <View style={[styles.circle,props.isSelected ? styles.full : styles.empty]}/>
    )
    let images = [];
    for(let i=0;i<count;i++){
        images.push(<Circle key={`circleitem${i}`} isSelected={i == selectedIndex && true || false}/>)
    }
    return (
        <View style={[styles.container,style]}>
            <View style={styles.innerContainer}>
                {images}
            </View>
        </View>
    )
}
PageControl.propTypes = {
    count:PropTypes.number,
    selectedIndex:PropTypes.number,
    style:PropTypes.any,
    circlewidth:PropTypes.number,
    activeColor:PropTypes.any,
    color:PropTypes.any,
}
PageControl.defaultProps = {
    circlewidth:8,
    activeColor:'#fff',
    color:'#fff5',
}
export default PageControl;
