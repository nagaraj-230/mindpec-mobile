import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';
import {images} from '../../Assets/images';
import {colors} from '../../Assets/colors';
import {LoginThunk} from '../../Services/LoginService/LoginSlice';
import {useDispatch} from 'react-redux';
import {styles} from './LoginStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getData, storeData} from '../../Utils/localHelper';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility
  const [dropdownData, setDropdownData] = useState([]); // Company dropdown data
  const [selectedCompany, setSelectedCompany] = useState(null); // Selected company
  const [isLoading, setIsLoading] = useState(false); // Loading indicator for login
  const [isDropdownEnabled, setIsDropdownEnabled] = useState(false); // Enable dropdown and button after fetching

  // Dropdown state
  const [value, setValue] = useState('1');
  const [isFocus, setIsFocus] = useState(false);

  const dispatch = useDispatch();

  const data = [{label: 'TaMS Solutions', value: '1'}];

  // Basic validation function
  const handleValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation
    if (!email) {
      Alert.alert('Error', 'Email field cannot be empty.');
      return false;
    } else if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return false;
    }

    if (!password) {
      Alert.alert('Error', 'Password field cannot be empty.');
      return false;
    }

    return true;
  };

  const handleAuthentication = async () => {
    if (!handleValidation()) return;

    setIsLoading(true);
    const payload = {
      LoginID: email,
      LoginPassword: password,
    };

    try {
      const response = await dispatch(
        LoginThunk({navigation, payload}),
      ).unwrap();
      console.log('LoginScreen Response:', response);

      const {data} = response;

      if (data.length > 1) {
        // Multiple companies: Show dropdown for selection
        const companyData = data.map(item => ({
          label: item.CompanyName,
          value: item.CompanyID,
        }));

        setDropdownData(companyData);
        setIsDropdownEnabled(true);
      } else {
        // Single company: Auto-select and navigate to dashboard
        const singleCompany = data[0];

        await storeData('userData', singleCompany);
        navigation.navigate('dashboard', {selectedCompany: singleCompany});
      }
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!selectedCompany) {
      Alert.alert('Error', 'Please select a company.');
      return;
    }

    // Retrieve stored user data from AsyncStorage
    const getUserData = await getData('user'); // This is an array of users
    console.log('getUserData:', getUserData);

    if (!Array.isArray(getUserData)) {
      Alert.alert('Error', 'Invalid user data format.');
      return;
    }

    // Find the selected company's user details
    const selectedUserData = getUserData.find(
      user => user.CompanyID === selectedCompany,
    );

    if (!selectedUserData) {
      Alert.alert('Error', 'Selected company user data not found.');
      return;
    }

    // Store selected company details and selected user details
    await storeData('selectedCompany', {
      CompanyID: selectedUserData.CompanyID,
      CompanyName: selectedUserData.CompanyName,
    });

    await storeData('userData', selectedUserData);

    // Log stored data
    const storedCompany = await getData('selectedCompany');
    const storedUserData = await getData('userData');

    console.log('Stored Selected Company:', storedCompany);
    console.log('Stored User Data:', storedUserData);

    navigation.navigate('dashboard', {selectedCompany: storedCompany});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image source={images.logo} style={styles.logo} />
        </View>

        {/* Text Input Section */}
        <View style={styles.inputContainer}>
          <Text style={{paddingBottom: 10, fontSize: 14, fontWeight: 'bold'}}>
            Email Address
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor={colors.txtcolor}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            maxLength={40}
          />
          <Text style={{paddingBottom: 10, fontSize: 14, fontWeight: 'bold'}}>
            Password
          </Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.textInput2}
              placeholder="Password"
              placeholderTextColor={colors.txtcolor}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
              maxLength={10}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setIsPasswordVisible(prev => !prev)} // Toggle the visibility
            >
              <Icon
                name={isPasswordVisible ? 'visibility-off' : 'visibility'}
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {/* Company Name Dropdown */}
          {dropdownData.length > 1 && (
            <>
              <Text
                style={{
                  paddingBottom: 10,
                  paddingTop: 5,
                  fontSize: 14,
                  fontWeight: 'bold',
                }}>
                Company
              </Text>
              <Dropdown
                data={dropdownData}
                labelField="label"
                valueField="value"
                value={selectedCompany}
                onChange={item => setSelectedCompany(item.value)}
                placeholder="Select Company"
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                disabled={!isDropdownEnabled}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
              />
            </>
          )}
        </View>

        {/* Button Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              !isDropdownEnabled && {backgroundColor: '#ff902f'},
            ]} // Disable color for button
            onPress={isDropdownEnabled ? handleLogin : handleAuthentication}>
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>
                {isDropdownEnabled ? 'Submit' : 'Submit'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

//last latest
// const handleAuthentication = async () => {
//   if (!handleValidation()) return;

//   setIsLoading(true);
//   const payload = {
//     LoginID: email,
//     LoginPassword: password,
//   };

//   try {
//     const response = await dispatch(
//       LoginThunk({navigation, payload}),
//     ).unwrap();
//     console.log('LoginScreen Response:', response);

//     const {data} = response;
//     if (data.length > 1) {
//       // Multiple companies: Populate dropdown for selection
//       const companyData = data.map(item => ({
//         label: item.CompanyName,
//         value: item.CompanyID,
//       }));

//       setDropdownData(companyData);
//       setIsDropdownEnabled(true);
//     }
//   } catch (error) {
//     Alert.alert('Login Failed', 'Invalid credentials.');
//   } finally {
//     setIsLoading(false);
//   }
// };

// const handleLogin = () => {
//   if (!selectedCompany) {
//     Alert.alert('Error', 'Please select a company.');
//     return;
//   }

//   const selectedCompanyData = dropdownData.find(
//     item => item.value === selectedCompany,
//   );
//   if (selectedCompanyData) {
//     storeData('selectedCompany', selectedCompanyData);

//   }

//   navigation.navigate('dashboard', {selectedCompany: selectedCompanyData});
// };

// first working
// const handleAuthentication = async () => {
//   if (!handleValidation()) return;

//   setIsLoading(true); // Show loading spinner
//   const payload = {
//     LoginID: email,
//     LoginPassword: password,
//   };
//   console.log('Loginpayload', payload);
//   try {
//     const response = await dispatch(
//       LoginThunk({navigation, payload}),
//     ).unwrap();
//     console.log('LoginScreen Response:', response);
//     const {CompanyID, CompanyName} = response.data;

//     if (response.success) {
//       // Fetch company data
//       const companyData = [
//         {
//           label: CompanyName,
//           value: CompanyID,
//         },
//       ];

//       setDropdownData(companyData);
//       setIsDropdownEnabled(true);
//       if (companyData.length === 1) {
//         setSelectedCompany(companyData[0].value);
//         Alert.alert('Authentication Successful');
//         // setTimeout(() => {
//         navigation.navigate('dashboard');
//         // }, 2000);
//       } else {
//         Alert.alert('Authentication Successful', 'Please select a company.');
//       }
//     } else {
//       Alert.alert('Login Failed', response.message || 'Invalid credentials.');
//     }
//   } catch (error) {
//     console.error('Login error:', error);
//     // Alert.alert('Error', 'Something went wrong. Please try again.');
//     Alert.alert('Login Failed', 'Invalid credentials.');
//   } finally {
//     setIsLoading(false); // Hide loading spinner
//   }
// };

// const handleLogin = () => {
//   if (!selectedCompany) {
//     Alert.alert('Error', 'Please select a company.');
//     return;
//   }

//   navigation.navigate('dashboard');
// };

// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import {Dropdown} from 'react-native-element-dropdown';
// import {useDispatch} from 'react-redux';
// import {LoginThunk} from '../../Services/LoginService/LoginSlice';
// import {styles} from './LoginStyles';

// const LoginScreen = ({navigation}) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [companies, setCompanies] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState(null);
//   const [isDropdownEnabled, setIsDropdownEnabled] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const dispatch = useDispatch();

//   const handleValidation = () => {
//     if (!email) {
//       Alert.alert('Error', 'Email field cannot be empty.');
//       return false;
//     }

//     if (!password) {
//       Alert.alert('Error', 'Password field cannot be empty.');
//       return false;
//     }

//     return true;
//   };

//   const handleAuthentication = async () => {
//     if (!handleValidation()) return;

//     setIsLoading(true);

//     const payload = {
//       LoginID: email,
//       LoginPassword: password,
//     };

//     try {
//       const response = await dispatch(
//         LoginThunk({navigation, payload}),
//       ).unwrap();
//       console.log('LoginScreen Response:', response);

//       if (response.companies.length > 1) {
//         setCompanies(
//           response.companies.map(company => ({
//             label: company.companyName,
//             value: company.companyID,
//           })),
//         );
//         setIsDropdownEnabled(true);
//       } else {
//         const company = response.companies[0];
//         setSelectedCompany(company.companyID);
//         Alert.alert('Authentication Successful');
//         navigation.navigate('dashboard', {selectedCompany: company});
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert('Login Failed', 'Invalid credentials.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleLogin = () => {
//     if (!selectedCompany) {
//       Alert.alert('Error', 'Please select a company.');
//       return;
//     }

//     const company = companies.find(c => c.value === selectedCompany);
//     navigation.navigate('dashboard', {selectedCompany: company});
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.innerContainer}>
//         <View style={styles.inputContainer}>
//           <Text>Email Address</Text>
//           <TextInput
//             style={styles.textInput}
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />

//           <Text>Password</Text>
//           <TextInput
//             style={styles.textInput}
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//             autoCapitalize="none"
//           />

//           {/* Company Dropdown */}
//           {companies.length > 1 && (
//             <>
//               <Text>Company</Text>
//               <Dropdown
//                 data={companies}
//                 labelField="label"
//                 valueField="value"
//                 value={selectedCompany}
//                 onChange={item => setSelectedCompany(item.value)}
//                 placeholder="Select Company"
//                 style={styles.dropdown}
//                 disabled={!isDropdownEnabled}
//               />
//             </>
//           )}
//         </View>

//         {/* Login Button */}
//         <TouchableOpacity
//           style={styles.button}
//           onPress={isDropdownEnabled ? handleLogin : handleAuthentication}>
//           {isLoading ? <ActivityIndicator color="#FFF" /> : <Text>Submit</Text>}
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default LoginScreen;
