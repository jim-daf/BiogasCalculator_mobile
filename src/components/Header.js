import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { create } from 'react-test-renderer'

const Header = ({text}) => {
  return (
    <View>
      <Text>{text}</Text>
    </View>
  )
}

const styles= StyleSheet.create({
    header:{
        
    },
    text:{

    }
})

export default Header