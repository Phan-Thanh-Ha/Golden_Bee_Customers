import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import { PropTypes } from "prop-types";

const IconWithAnimatedBadge = ({ badgeCount }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔔</Text>
      {badgeCount > 0 && (
        <Animatable.View
          animation="bounceIn"
          iterationCount="infinite"
          duration={1500}
          style={styles.badgeContainer}
        >
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        </Animatable.View>
      )}
    </View>
  );
};

IconWithAnimatedBadge.defaultProps = {
  badgeCount: 0,
};
IconWithAnimatedBadge.propTypes = {
  name: PropTypes.string,
  badgeCount: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 32,
    height: 32,
  },
  badge: {
    position: "absolute",
    right: 0,
    top: -35,
    backgroundColor: "red",
    borderRadius: 6,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
  },
});

export default IconWithAnimatedBadge;
