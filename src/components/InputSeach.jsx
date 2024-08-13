import React, { useState } from "react";
import PropTypes from "prop-types";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "@ui-kitten/components";

const SearchIcon = (props) => <Icon {...props} name="search" />;

const CloseIcon = (props) => <Icon {...props} name="close" />;

const InputSearch = ({ style = {} }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const clearInput = () => {
    setSearchQuery("");
  };

  return (
    <View style={[styles.container, style]}>
      <SearchIcon fill="gray" style={{ width: 20, height: 20 }} />
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {searchQuery ? (
        <TouchableOpacity onPress={clearInput}>
          <CloseIcon fill="gray" style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

InputSearch.defeaultProps = {
  style: {},
};

InputSearch.propTypes = {
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 5,
  },
  input: {
    flex: 1,
    marginLeft: 5,
  },
});

export default InputSearch;
