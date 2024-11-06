import React from "react";
import {StyleSheet, Text} from 'react-native';

function AppHeader(props) {

  const styles = StyleSheet.create({
    header1Style: { 
      fontSize: 30,
      fontWeight: 900,
      color: '#119000',
      marginBottom: 10
    }
  });
  
  return (
    <Text 
      style={styles.header1Style}
    >
      {props.textContent}    
    </Text>
  );
}

export default AppHeader;