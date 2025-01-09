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
    backgroundColor: '#F5F5F5',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  gradientHeader: {
    width: '100%',
    // paddingVertical: 10,
    // height:60,
    height: Platform.OS === 'ios' ? responsiveHeight(6) : responsiveHeight(6),
    justifyContent: 'center',
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
    left: 0,
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

  taskList: {
    // padding: 15,
    padding: responsiveHeight(1.5),
    // backgroundColor: 'cyan',
  },

  // render items
  taskContainer: {
    flex: 1,
    backgroundColor: 'red',
    // marginBottom: 15,
    marginBottom: responsiveHeight(1.5),
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
  },

  gradientCard: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: '#fff', // Fallback for gradient
  },

  leftSection: {
    flex: 3,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 5,
  },

  rightSection: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  // taskName: {
  //   fontSize: 18,
  //   fontWeight: '700',
  //   color: '#333',
  //   marginBottom: 5,
  // },
  taskName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 5,
    flexWrap: 'wrap',
    overflow: 'hidden',
  },

  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },

  label: {
    fontWeight: 'bold',
    color: '#333',
  },

  row: {
    flexDirection: 'row',
    marginTop: 10,
  },

  priorityBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
  },

  iconButton: {
    backgroundColor: '#FF6A00',
    borderRadius: 50,
    padding: 10,
    elevation: 5,
  },

  // no data
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'cyan',
  },
  noDataText: {
    color: '#FF902F',
    fontWeight: 'bold',
    fontSize: 24,
  },
});
