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


//  const handleAuthentication = async () => {
//     if (!handleValidation()) return;

//     setIsLoading(true); // Show loading spinner
//     const payload = {
//       LoginID: email,
//       LoginPassword: password,
//     };
//     console.log('Loginpayload', payload);
//     try {
//       const response = await dispatch(
//         LoginThunk({navigation, payload}),
//       ).unwrap();
//       console.log('LoginScreen Response:', response);
//       const {CompanyID, CompanyName} = response.data;

//       if (response.success) {
//         // Fetch company data
//         const companyData = [
//           {
//             label: CompanyName,
//             value: CompanyID,
//           },
//         ];

//         setDropdownData(companyData);
//         setIsDropdownEnabled(true);
//         if (companyData.length === 1) {
//           setSelectedCompany(companyData[0].value);
//           Alert.alert('Authentication Successful');
//           // setTimeout(() => {
//           navigation.navigate('dashboard');
//           // }, 2000);
//         } else {
//           Alert.alert('Authentication Successful', 'Please select a company.');
//         }
//       } else {
//         Alert.alert('Login Failed', response.message || 'Invalid credentials.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       // Alert.alert('Error', 'Something went wrong. Please try again.');
//       Alert.alert('Login Failed', 'Invalid credentials.');
//     } finally {
//       setIsLoading(false); // Hide loading spinner
//     }
//   };