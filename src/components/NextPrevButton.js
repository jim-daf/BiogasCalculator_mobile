import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const NextPrevButton = ({title,handleFunction}) => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePressIn = () => {
    setIsPressed(true);
  };
  
  const handlePressOut = () => {
    setIsPressed(false);
  };
  
  const buttonStyle = isPressed
    ? [styles.button, styles.buttonPressed]
    : styles.button;
  return (
    <Pressable 
    style={buttonStyle} 
    onPress={handleFunction}
    onPressIn={handlePressIn}
    onPressOut={handlePressOut}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}


const styles = StyleSheet.create({
    button: {
      
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 4,
      elevation: 3,
      backgroundColor:"#f2f2f2",
      margin:7,
      marginHorizontal:45
      
    },
    buttonPressed: {
      backgroundColor: '#1565C0',
    },
    text: {
      
      lineHeight: 21,
      fontSize: 13,
      letterSpacing: 0.25,
      fontWeight:'bold',
      color:"#434a54"
    },
  });

export default NextPrevButton