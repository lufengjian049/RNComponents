import React, { PropTypes } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PageControl = (props) => {
  const { count, selectedIndex, style } = props
  const styles = StyleSheet.create({
    circle: {
      margin: 2,
      width: props.circlewidth,
      height: props.circlewidth,
      borderRadius: props.circlewidth / 2,
    },
    full: {
      backgroundColor: props.activeColor,
    },
    empty: {
      backgroundColor: props.color,
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    innerContainer: {
      flexDirection: 'row',
    },
  })
  const Circle = cprops => (
    <View style={[styles.circle, cprops.isSelected ? styles.full : styles.empty]} />
    )
  const images = []
  for (let i = 0; i < count; i++) {
    images.push(<Circle key={`circleitem${i}`} isSelected={i === selectedIndex && true || false} />)
  }
  return (
    <View style={[styles.container, style]}>
      <View style={styles.innerContainer}>
        {images}
      </View>
    </View>
  )
}
PageControl.propTypes = {
  count: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  style: View.propTypes.style,
  circlewidth: PropTypes.number,
  activeColor: PropTypes.string,
  color: PropTypes.string,
}
PageControl.defaultProps = {
  style: null,
  circlewidth: 8,
  activeColor: '#fff',
  color: '#fff5',
}
export default PageControl
