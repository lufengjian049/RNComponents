/**
 * @providesModule Carousel
 */
import React,{PropTypes} from 'react'
import {StyleSheet,Platform} from 'react-native'
import ViewPager from './ViewPager'

const Carousel = props => {
    let cards = [];
    const {count,renderCard,selectedIndex,onSelectedIndexChange} = props;
    for(let i=0;i<count;i++){
        let content = null;
        //部分渲染时，只处理selectedIndex附近的两个
        if((Math.abs(i-selectedIndex) < 2 && onSelectedIndexChange) || !onSelectedIndexChange){
            content = renderCard(i);
        }
        cards.push(content);
    }
    return (
        <ViewPager style={styles.carousel} {...props} bounces={true}>
            {cards}
        </ViewPager>
    )
}

export default Carousel;

var styles = StyleSheet.create({
  carousel: {
    ...Platform.select({
        ios: {
            margin: 10,
            overflow: 'visible',
            backgroundColor: 'black',
        },
    })
  }
});
//分全渲染/部分渲染(必须要传onSelectedIndexChange参数)
Carousel.propTypes = {
    count:PropTypes.number,
    renderCard:PropTypes.func,
    selectedIndex:PropTypes.number,
    onSelectedIndexChange:PropTypes.func,
    style:PropTypes.any,
    wrapperHeight:PropTypes.number,
}