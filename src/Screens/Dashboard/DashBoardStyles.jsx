import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../Assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgcolor,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
    paddingTop: 40,
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
    fontSize: 24,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    letterSpacing: 0.8,
  },

  innerContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 20,
    paddingHorizontal: 15,
  },

  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  cardWrapper: {
    width: '45%',
    marginVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#4d5154',
  },

  // skeleton
  skeletonIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    marginBottom: 10,
  },
  skeletonText: {
    width: 80,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },

  // card design
  card: {
    width: '43%',
    height: 130, // Adjusted height for balance
    marginVertical: 15, // Slightly increased margin for spacious feel
    borderRadius: 15, // Softer rounded corners
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white, // Clean white background
    elevation: 2, // Subtle elevation for depth
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    padding: 20, // Generous padding for a clean and spacious layout
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)', // Soft border for structure
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'linear-gradient(45deg, #FFA500, #FF4500)', // Gradient
    marginTop: 10,
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },

  countBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF4500',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  countText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
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
});
