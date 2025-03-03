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
