import React from "react";
import { StyleSheet, View, Button } from 'react-native';

function SearchButton(props) {

  const styles = StyleSheet.create({
    searchButtonStyle: {
      marginTop: 10,
      borderRadius: 10,
      padding: 2
    }
  });

  return (
    <View style={styles.searchButtonStyle}>
      <Button
        title="search"
        onPress={props.onPress}
      />
    </View>
  )
}

export default SearchButton;