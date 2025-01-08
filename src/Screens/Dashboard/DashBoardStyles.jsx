
// import {StyleSheet} from 'react-native';
// import {responsiveHeight, responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions';
// import {colors} from '../../Assets/colors';

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.bgcolor,
//     width: responsiveWidth(100), // Full width of the screen
//     height: responsiveHeight(100), // Full height of the screen
//   },

//   // header
//   gradientHeader: {
//     width: '100%',
//     paddingVertical: responsiveHeight(2), // Adjust padding based on screen height
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     elevation: 5,
//   },

//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: responsiveWidth(5), // Adjust padding based on screen width
//     position: 'relative',
//   },

//   backButton: {
//     position: 'absolute',
//     right: 0,
//     padding: responsiveWidth(2),
//   },

//   centerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   logo: {
//     width: responsiveWidth(25), // Adjust logo width for responsiveness
//     height: responsiveHeight(7), // Adjust logo height for responsiveness
//     resizeMode: 'contain',
//   },

//   // Welcome Section Styling
//   usernameSection: {
//     padding: responsiveWidth(5), // Responsive padding
//     paddingTop: responsiveHeight(2),
//     paddingBottom: responsiveHeight(2),
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },

//   username: {
//     fontSize: responsiveFontSize(2.5), // Responsive font size for username
//     fontWeight: '500',
//     color: '#333',
//     textAlign: 'center',
//     letterSpacing: 0.8,
//   },

//   // Card styles
//   innerContainer: {
//     width: '100%',
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//     marginTop: 0,
//     paddingHorizontal: responsiveWidth(5), // Adjust horizontal padding for responsiveness
//   },

//   row: {
//     justifyContent: 'space-between',
//     marginBottom: responsiveHeight(1.5), // Adjust bottom margin for responsiveness
//     paddingHorizontal: responsiveWidth(2), // Adjust padding for responsiveness
//     gap: 5,
//   },

//   card: {
//     width: '45%',
//     height: responsiveHeight(16), // Responsive card height
//     marginVertical: responsiveHeight(0.2), // Responsive vertical margin
//     borderRadius: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: colors.white,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     padding: responsiveWidth(3), // Responsive padding for cards
//     borderWidth: 1,
//     borderColor: 'rgba(0,0,0,0.05)',
//   },

//   cardText: {
//     fontSize: responsiveFontSize(1.8), // Responsive font size for card text
//     fontWeight: '500',
//     color: '#333',
//     textAlign: 'center',
//     marginTop: responsiveHeight(1),
//     flexWrap: 'wrap',
//     width: '65%',
//     lineHeight: responsiveHeight(2),
//   },

//   iconContainer: {
//     width: responsiveWidth(12), // Responsive icon container size
//     height: responsiveWidth(12), // Responsive icon container size
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'linear-gradient(45deg, #FFA500, #FF4500)', // Gradient
//     marginTop: responsiveHeight(1),
//   },

//   countBadge: {
//     position: 'absolute',
//     top: responsiveHeight(1),
//     right: responsiveWidth(1),
//     backgroundColor: '#FF4500',
//     width: responsiveWidth(5), // Responsive badge size
//     height: responsiveWidth(5), // Responsive badge size
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 2,
//   },

//   countText: {
//     fontSize: responsiveFontSize(1.5), // Responsive font size for count
//     fontWeight: 'bold',
//     color: colors.white,
//     textAlign: 'center',
//   },
// });


import {StyleSheet, Dimensions} from 'react-native';
import {responsiveHeight, responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions';
import {colors} from '../../Assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgcolor,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    width: responsiveWidth(100), // Full width of the screen
    height: responsiveHeight(100), 
  },

  // header
  gradientHeader: {
    width: '100%',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },

  backButton: {
    position: 'absolute',
    right: 0,
    padding: 10,
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    textAlign: 'center',
  },

  logo: {
    width: 100,
    height: 35,
    resizeMode: 'contain',
  },

  // Welcome Section Styling
  usernameSection: {
    padding: 25,
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  welcomeText: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.primary,
    textAlign: 'center',
    letterSpacing: 1.2,
    marginBottom: 5,
  },

  username: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    letterSpacing: 0.8,
  },

  // Card styles
  innerContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 0,
    paddingHorizontal: 20,
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 10,
    gap: 5,
  },

  card: {
    width: '45%', // Slightly increased to balance space
    height: 130,
    marginVertical: 5,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 10, // Reduced padding for compactness
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },

  cardText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
    width: '65%',
    lineHeight: 18,
  },

  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(45deg, #FFA500, #FF4500)', // Gradient
    marginTop: 8,
  },

  countBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF4500',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  countText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
});


// card: {
  //   width: '45%',
  //   height: 130, // Adjusted height for balance
  //   marginVertical: 15, // Slightly increased margin for spacious feel
  //   borderRadius: 15, // Softer rounded corners
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: colors.white, // Clean white background
  //   elevation: 2, // Subtle elevation for depth
  //   shadowColor: '#000',
  //   shadowOffset: {width: 0, height: 4},
  //   shadowOpacity: 0.1,
  //   shadowRadius: 8,
  //   padding: 20, // Generous padding for a clean and spacious layout
  //   borderWidth: 1,
  //   borderColor: 'rgba(0,0,0,0.05)', // Soft border for structure
  // },

  // taskText: {
  //   fontSize: 16, // Larger font size for better readability
  //   fontWeight: 'bold', // Bold task name for emphasis
  //   color: '#333', // Dark text for contrast
  //   textAlign: 'center',
  //   marginBottom: 10, // Space between task name and count
  // },

  // countContainer: {
  //   alignItems: 'center',
  //   marginTop: 10, // Balanced spacing
  // },

  // countBox: {
  //   backgroundColor: '#FF4500', // Counter box background (dynamic color)
  //   height: 30,
  //   width: 30,
  //   // paddingHorizontal: 12, // Padding for the counter box
  //   // paddingVertical: 6, // Padding for the counter box
  //   borderRadius: 20, // Rounded corners for the box
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  // countNumber: {
  //   fontSize: 18, // Slightly larger count number
  //   fontWeight: '700', // Heavy font for the count number
  //   color: '#fff', // White color for contrast against the orange box
  //   textAlign: 'center',
  // },

  // row: {
  //   justifyContent: 'space-between',
  // },