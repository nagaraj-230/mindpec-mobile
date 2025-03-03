import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../Assets/colors';

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: colors.white,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  innerContainer: {
    width: '80%', 
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    marginTop: -80, 
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%', 
    marginBottom: 30, 
  },
  textInput: {
    width: '100%',
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.borderColor,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: colors.lightbg,
    color: '#000',
  },
  textInput2: {
    // width: '100%',
    // height: 45,
    // borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#4D5154',
    // paddingHorizontal: 15,
    // marginBottom: 10,
    // backgroundColor: colors.lightbg,
    color: '#000',
  },
  dropdown: {
    width: '100%',
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4D5154',
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: colors.white,
    color: '#000',
  },
  placeholderStyle: {
    color: colors.txtcolor,
  },
  selectedTextStyle: {
    color: '#000',
  },
  infolineText: {
    color: '#777',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center', 
  },
  button: {
    width: '100%',
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff902f',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // passowrd hide and show
  passwordInputContainer: {
    width: '100%',
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#4D5154',
    paddingLeft: 15,
    marginBottom: 10,
    backgroundColor: colors.lightbg,
    color: '#000',
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
});

