
import React, { PropTypes } from 'react'
import { StyleSheet, ScrollView,
    ViewPagerAndroid, Platform,
    View, Text } from 'react-native'
import PageControl from './PageControl'

export default class ViewPager extends React.Component {
  static defaultProps = {
    renderPageControl: (count, selectedIndex) => (
      <PageControl count={count} selectedIndex={selectedIndex} style={styles.pagecontrolstyle} />
        ),
    showdots: true,
  }
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      selectedIndex: this.props.selectedIndex,
            // initialSelectedIndex:this.props.selectedIndex,
            // scrollingTo:null
    }
    this.handleHorizontalScroll = this.handleHorizontalScroll.bind(this)
    this.adjustCardSize = this.adjustCardSize.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      if (Platform.OS === 'ios') {
        this.viewpager.scrollTo({
          x: nextProps.selectedIndex * this.state.width,
          animated: true,
        })
                // this.setState({scrollingTo: nextProps.selectedIndex});
      } else {
        this.viewpager.setPage(nextProps.selectedIndex)
                // this.setState({selectedIndex: nextProps.selectedIndex});
      }
      this.setState({ selectedIndex: nextProps.selectedIndex })
    }
  }
  adjustCardSize(e) {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    })
  }
  handleHorizontalScroll(e) {
    let selectedIndex = e.nativeEvent.position
    if (selectedIndex === undefined) {
      selectedIndex = Math.round(
                e.nativeEvent.contentOffset.x / this.state.width,
            )
    }
        // console.log(`this.props.index${this.props.selectedIndex}`)
        // console.log(`selectedIndex${selectedIndex}`)
    if (selectedIndex < 0 || selectedIndex >= this.props.count) {
      return
    }
    if (this.state.selectedIndex === selectedIndex) {
      return
    }
        // if (this.props.selectedIndex !== selectedIndex || this.state.scrollingTo !== null) {
    this.setState({ selectedIndex, scrollingTo: null })
    const { onSelectedIndexChange } = this.props
    if (onSelectedIndexChange) { onSelectedIndexChange(selectedIndex) }
    // onSelectedIndexChange && onSelectedIndexChange(selectedIndex)
        // }
  }
  renderIos() {
    return (
      <ScrollView
        ref={ref1 => (this.viewpager = ref1)}
        contentOffset={{
          x: this.state.width * this.state.selectedIndex,
          y: 0,
        }}
        style={[styles.scrollview, this.props.style]}
        horizontal
        pagingEnabled
        bounces={!!this.props.bounces}
        scrollsToTop={false}
        onScroll={this.handleHorizontalScroll}
        scrollEventThrottle={100}
        removeClippedSubviews
        automaticallyAdjustContentInsets={false}
        directionalLockEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onLayout={this.adjustCardSize}>
        {this.renderContent()}
      </ScrollView>
    )
  }
  renderAndroid() {
    return (
      <ViewPagerAndroid
        initialPage={this.state.selectedIndex}
        onPageSelected={this.handleHorizontalScroll}  /** 页面切换完成后调用 */
        style={[styles.container, this.props.style]}
        ref={ref => (this.viewpager = ref)}>
        {this.renderContent()}
      </ViewPagerAndroid>
    )
  }
  renderContent() {
        // ViewPagerAndroid 子元素必须是View
    const { width, height } = this.state
    const style = Platform.OS === 'ios' && styles.card
    return React.Children.map(this.props.children, (child, index) =>
            /** width,height 在ViewPagerAndroid是没有效果的，设置是为了ios的scrollview */
             (
               <View key={`viewpager${index}`} style={[style, { height, width }]}>
                 {child}
               </View>
            ))
  }
  render() {
    return (
      <View style={{ flex: 1, height: this.props.wrapperHeight }}>
        {
                    Platform.OS === 'ios' ? this.renderIos() : this.renderAndroid()
                }
        {this.props.showdots && this.props.renderPageControl(this.props.count, this.state.selectedIndex)}
      </View>
    )
  }
}

ViewPager.propTypes = {
  renderPageControl: PropTypes.func, // 参数为count，selectedIndex
  selectedIndex: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  showdots: PropTypes.bool,
  wrapperHeight: PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: 'transparent',
  },
  scrollview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  pagecontrolstyle: {
    position: 'relative',
    bottom: 20,
  },
})
