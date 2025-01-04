// import React from 'react';
// import { View, StyleSheet, Text, Animated } from 'react-native';

// const LoadingComponent = () => {
//   const spinValue = new Animated.Value(0);

//   // Rotate the spinner animation
//   Animated.loop(
//     Animated.timing(spinValue, {
//       toValue: 1,
//       duration: 1500,
//       useNativeDriver: true,
//     })
//   ).start();

//   const spin = spinValue.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '360deg'],
//   });

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
//       <Text style={styles.text}>Loading...</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   spinner: {
//     width: 50,
//     height: 50,
//     borderWidth: 5,
//     borderColor: '#00f',
//     borderTopColor: 'transparent',
//     borderRadius: 25,
//   },
//   text: {
//     marginTop: 10,
//     fontSize: 18,
//     color: '#333',
//   },
// });

// export default LoadingComponent;

import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00f" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: '#333',
  },
});

export default LoadingComponent;
