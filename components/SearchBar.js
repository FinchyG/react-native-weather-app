import React from "react";
import { StyleSheet, TextInput } from "react-native-web";
function SearchBar(props) {

  const styles = StyleSheet.create({
    searchBarStyle: {
      width: '90%',
      boxSizing: 'border-box',
      border: '2 solid #CCCCCC',
      borderRadius: 16,
      fontSize: 16,
      backgroundColor: '#E5EEF0',
      padding: 16,
    }
  });

  return (
    <TextInput
      style={styles.searchBarStyle}
      type={props.type}
      placeholder={props.placeholder}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

export default SearchBar;