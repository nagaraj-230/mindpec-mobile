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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#f5f5f5',
  },

  gradientHeader: {
    width: '100%',
    // paddingVertical: 10,
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
  contentContainer: {
    padding: 20,
  },
  infoContainer: {
    marginBottom: 15,
  },
  rowView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'cyan'
  },
  taskName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  titleName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    // marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: colors.black,
    fontWeight: '600',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  dateValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
  },
  editButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: colors.cancelbtn,

    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButton: {
    flex: 1,
    marginLeft: 10,
    // backgroundColor: '#4CAF50',
    // backgroundColor: '#FF5722',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // date picekr
  datePickerLabel: {
    fontSize: 16,
    color: colors.txtcolor,
    fontWeight: '600',
    // textAlign: 'left',
    // marginVertical: 10,
  },
  // for remarks
  inputContainer: {
    marginBottom: 20,
  },

  // error text
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },

  // task
});
