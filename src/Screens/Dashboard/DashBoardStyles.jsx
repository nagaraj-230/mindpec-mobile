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
  // card: {
  //   width: '45%',
  //   height: 150,
  //   marginVertical: 10,
  //   borderRadius: 15,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: colors.white,
  //   shadowColor: '#000',
  //   shadowOffset: {width: 0, height: 2},
  //   shadowOpacity: 0.2,
  //   shadowRadius: 10,
  //   elevation: 3,
  //   transform: [{scale: 1}],
  //   transition: 'transform 0.3s ease',
  // },
  // iconContainer: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.1)',
  //   // marginBottom: 15,
  // },
  // cardText: {
  //   fontSize: 16,
  //   fontWeight: '600',
  //   color: colors.darkText,
  //   textAlign: 'center',
  //   marginBottom: 15,
  // },
  // countText: {
  //   position: 'absolute',
  //   fontSize: 14,
  //   fontWeight: '600',
  //   color: colors.white,
  //   textAlign: 'center',
  // },

  card: {
    width: '42%', // Adjusted for compact layout
    height: 140, // Reduced height for a smaller look
    marginVertical: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    padding: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
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
});
