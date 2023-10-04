import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const SubmitButton = ({title,handleFunction}) => {
  return (
    <Pressable style={styles.button} onPress={handleFunction}>
      <Text >{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal:2,
      borderRadius: 4,
      elevation: 3,
      display:'flex',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });

export default SubmitButton