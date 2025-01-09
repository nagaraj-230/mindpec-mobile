import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../Assets/colors';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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

  cardContainer: {
    // marginBottom: 12,
    marginBottom: responsiveHeight(1.5),
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },

  gradientCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 10,
    padding: responsiveHeight(1),
    borderRadius: 10,
  },

  infoSection: {
    flex: 3,
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 8,
    marginBottom: responsiveHeight(0.8),
    flexWrap: 'wrap',
  },
  columnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 12,
    marginRight: responsiveWidth(3),
  },

  // iconSpacing: {
  //   marginLeft: 16,
  // },
  actionSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusBadge: {
    alignSelf: 'flex-start',
    // marginTop: 4,
    // paddingVertical: 4,
    // paddingHorizontal: 10,

    marginTop: responsiveHeight(0.5),
    paddingVertical: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(2.5),

    borderRadius: 5,
  },

  badgeText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
  },

  actionButtons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },

  iconButton: {
    backgroundColor: '#FF6A00',
    borderRadius: 20,
    // padding: 8,
    padding: responsiveWidth(2),
    elevation: 4,
  },

  disabledButton: {
    backgroundColor: '#E0E0E0',
  },

  // ---------
  addclaimContainer: {
    width: '100%',
    paddingHorizontal: 15,
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  addClaimButton: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  addClaimGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 8,
    // paddingHorizontal: 10,

    paddingVertical: responsiveHeight(0.8),
    paddingHorizontal: responsiveWidth(2),

    borderRadius: 10,
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  addText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
    // marginLeft: 8,
    marginLeft: responsiveWidth(2),
    letterSpacing: 0.5,
  },
  taskList: {
    // padding: 15,
    padding: responsiveHeight(1.5),
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 3,
    marginLeft: 8,
  },

  // modal style props
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalHeader: {
    // paddingVertical: 20,
    // paddingHorizontal: 15,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(1.5),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1,
  },
  modalBody: {
    flex: 1,
    // padding: 20,
    padding: responsiveWidth(4.5),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 15,
    marginBottom: responsiveHeight(1),
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    // marginVertical: 10,
    marginVertical: responsiveHeight(1.3),
  },
  closeButton: {
    backgroundColor: '#FF6A00',
    borderRadius: 50,
    // paddingVertical: 12,
    paddingVertical: responsiveHeight(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 20,
    // marginBottom: 20,
    marginHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 1,
  },

  // Status Badge Styling
  modalStatusBadge: {
    // paddingVertical: 5,
    // paddingHorizontal: 10,
    paddingVertical: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(2.5),

    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBadgeText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
  },

  // Multiline Remarks Styling
  remarksText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    // marginTop: 5,
    // marginTop: responsiveHeight(0.5),
    lineHeight: 22,
    maxHeight: 100,
    overflow: 'hidden',
    textAlignVertical: 'top',
  },
});
