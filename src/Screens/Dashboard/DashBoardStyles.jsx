// last used
import {StyleSheet, Dimensions} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors} from '../../Assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgcolor,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    width: responsiveWidth(100), 
    height: responsiveHeight(100),
  },

  // header
  gradientHeader: {
    width: '100%',
    height: Platform.OS === 'ios' ? responsiveHeight(8) : responsiveHeight(6),
    // paddingVertical: 10,
    paddingVertical: responsiveHeight(1),
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
