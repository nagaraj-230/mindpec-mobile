import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import DocumentPicker from 'react-native-document-picker';
import {styles} from './AddClaimStyles';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import {GetClaimTypeThunk} from '../../Services/GetClaimTypeService/GetClaimTypeSlice';
import {UpdateClaimsThunk} from '../../Services/GetClaimsService/GetClaimsSlice';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getData} from '../../Utils/localHelper';
import {GetClaimStatusThunk} from '../../Services/GetClaimStatusService/GetClaimStatusSlice';
import {GetCompanyUsersThunk} from '../../Services/CompanyUserService/GetCompanyUserSlice';

const AddClaimScreen = ({route, navigation}) => {
  const {claimData} = route.params || {};
  const dispatch = useDispatch();
  const {claimsType} = useSelector(state => state.getClaimType);
  const {getClaimStatusData} = useSelector(state => state.getClaimStatus);
  const {getCompanyUserData} = useSelector(state => state.getCompanyUsers);

  // // console.log('claimStatus', claimStatus);
  // console.log('getCompanyUserData', getCompanyUserData);
  // console.log('getClaimStatusData', getClaimStatusData);

  const [claimStatusData, setClaimStatusData] = useState([]);
  const [companyUsersData, setCompanyUsersData] = useState([]);

  const [date, setDate] = useState(
    claimData ? new Date(claimData.ClaimDate) : new Date(),
  );
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [amount, setAmount] = useState(
    claimData ? claimData.ClaimAmount.toString() : '',
  );
  const [error, setError] = useState('');
  const [expenseType, setExpenseType] = useState(
    claimData ? claimData.ClaimTypeID : null,
  );
  const [remarks, setRemarks] = useState(
    claimData ? claimData.ClaimRemarks : '',
  );
  const [file, setFile] = useState(null);

  // testing
  const [claimStatusId, setClaimStatusId] = useState(
    claimData ? claimData.ClaimStatusID : null,
  );
  const [companyUserId, setCompanyUserId] = useState(
    claimData ? claimData.ClaimUserID : null,
  );

  // get current login user
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userData = await getData('user');
      setCurrentUserId(userData?.LoginUserID);
    };
    fetchCurrentUser();
  }, []);
  // ---------------------------

  useEffect(() => {
    fetchGetClaimType();
    fetchClaimStatus();
    fetchCompanyUsers();
  }, []);
  useEffect(() => {
    // Update local state when Redux state changes
    if (getClaimStatusData) {
      setClaimStatusData(getClaimStatusData);
    }
  }, [getClaimStatusData]);

  useEffect(() => {
    if (getCompanyUserData) {
      setCompanyUsersData(getCompanyUserData);
    }
  }, [getCompanyUserData]);

  const fetchGetClaimType = async () => {
    const getUserData = await getData('user');
    const CompanyID = getUserData?.CompanyID;
    const LoginUserID = getUserData?.LoginUserID;

    const payload = {CompanyID: CompanyID, AppUserID: LoginUserID};
    await dispatch(GetClaimTypeThunk({payload}));
  };

  const fetchClaimStatus = async () => {
    const getUserData = await getData('user');
    const payload = {
      ClaimStatusID: 0,
      AppUserID: getUserData?.LoginUserID,
    };
    // console.log('StatusPayload',payload)
    const response = await dispatch(GetClaimStatusThunk({payload}));
    // console.log('fetchClaimStatus', response);
  };
  const fetchCompanyUsers = async () => {
    const getUserData = await getData('user');
    const payload = {
      CompanyUserID: 0,
      CompanyID: getUserData?.CompanyID,
      AppUserID: 0,
    };
    const response = await dispatch(GetCompanyUsersThunk({payload}));
    // console.log('fetchCompanyUsers', response);
  };

  const validateAmount = text => {
    const numericRegex = /^[0-9]*\.?[0-9]*$/;
    if (!numericRegex.test(text)) {
      setError('Invalid amount. Please enter a valid number.');
      return;
    }
    const parsedAmount = parseFloat(text);
    if (parsedAmount <= 0) {
      setError('Amount must be greater than zero.');
    } else {
      setError('');
    }
    setAmount(text);
  };

  const handleSubmit = async () => {
    if (
      !amount ||
      !expenseType ||
      (!claimStatusId && claimData) ||
      !companyUserId ||
      remarks.length < 5
    ) {
      console.log({
        amount,
        expenseType,
        claimStatusId,
        companyUserId,
        remarks,
      });

      if (!remarks || remarks.length < 5) {
        Alert.alert('Error', 'Remarks must be at least 5 characters long.');
      } else {
        Alert.alert('Error', 'Please fill out all fields correctly.');
      }
      return;
    }
    const getUserData = await getData('user');
    const payload = {
      ClaimID: claimData?.ClaimID || 0,
      CompanyID: getUserData?.CompanyID,
      ClaimUserID: getUserData?.LoginUserID,
      // ClaimUserID: companyUserId,
      SubmittedToID: companyUserId,
      ClaimDate: dayjs(date).format('YYYY-MM-DD'),
      ClaimTypeID: expenseType,
      ClaimAmount: parseFloat(amount),
      ClaimRemarks: remarks,
      ClaimStatusID: claimStatusId || 1,
      AppUserID: getUserData?.LoginUserID,
    };
    console.log('UpdateClaimspayload', payload);
    const response = await dispatch(UpdateClaimsThunk({payload}));
    console.log('UpdateClaimsRes', response);
    if (response?.meta?.requestStatus === 'fulfilled') {
      if (payload.ClaimID === 0) {
        // New claim added
        Alert.alert('Success', 'Claim saved successfully.');
      } else {
        // Claim updated
        Alert.alert('Success', 'Claim updated successfully.');
      }
      resetForm();
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to save claim.');
    }
  };

  const resetForm = () => {
    setDate(new Date());
    setAmount('');
    setExpenseType(null);
    setRemarks('');
    setFile(null);
    setError('');
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(result);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error('File picker error:', err);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={['#FF6A00', '#FF9500']}
          style={styles.gradientHeader}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <Icon name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.centerContainer}>
              <Text style={styles.headerText}>
                {claimData ? 'Edit Claim' : 'Add New Claim'}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Form */}
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            keyboardShouldPersistTaps="handled">
            <View style={styles.formContainer}>
              {/* Date Picker */}
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                onPress={() => setIsPickerOpen(true)}
                style={styles.inputContainer}>
                <Text style={styles.inputText}>
                  {dayjs(date).format('YYYY-MM-DD')}
                </Text>
              </TouchableOpacity>
              {isPickerOpen && (
                <DateTimePicker
                  mode="single"
                  date={date}
                  onChange={selectedDate => {
                    setDate(selectedDate.date);
                    setIsPickerOpen(false);
                  }}
                  onCancel={() => setIsPickerOpen(false)}
                  selectedItemColor="#4C17A9"
                  minDate={new Date('2023-12-11')}
                  maxDate={new Date()}
                />
              )}

              {/* Amount */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                  style={[styles.input, error && styles.inputError]}
                  placeholder="Enter Amount"
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={validateAmount}
                  maxLength={7}
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
              </View>

              {/* Expense Type Dropdown */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Expense Type</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={claimsType.map(type => ({
                    label: type.ClaimTypeName,
                    value: type.ClaimTypeID,
                  }))}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Expense Type"
                  value={expenseType}
                  onChange={item => {
                    setExpenseType(item.value),
                      console.log('setExpenseType', item.value);
                  }}
                />
              </View>
              {/* Company User Name Dropdown */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Submitted To</Text>
                <Dropdown
                  style={styles.dropdown}
                  // data={comapyData}
                  data={companyUsersData
                    .filter(user => user.UserID !== currentUserId) // Exclude current user
                    .map(user => ({
                      label: user.UserName,
                      value: user.UserID,
                    }))}
                  labelField="label"
                  valueField="value"
                  placeholder="Select User"
                  value={companyUserId}
                  onChange={item => {
                    setCompanyUserId(item.value),
                      console.log('setCompanyUserId', item.value);
                  }}
                />
              </View>
              {/* Remarks */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Remarks</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter Remarks"
                  value={remarks}
                  onChangeText={setRemarks}
                  maxLength={250}
                  multiline
                />
                {remarks && remarks.length < 5 && (
                  <Text style={{color: 'red', fontSize: 12}}>
                    Remarks must be at least 5 characters.
                  </Text>
                )}
              </View>

              {/* Claim Status Dropdown */}
              {claimData && (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Claim Status</Text>
                  <Dropdown
                    style={styles.dropdown}
                    // data={comapyData}
                    data={claimStatusData.map(status => ({
                      label: status.ClaimStatusName,
                      value: status.ClaimStatusID,
                    }))}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Status"
                    value={claimStatusId}
                    onChange={item => {
                      setClaimStatusId(item.value),
                        console.log('setClaimStatusId', item.value);
                    }}
                  />
                </View>
              )}

              {/* File Upload */}
              <TouchableOpacity
                onPress={pickFile}
                style={styles.inputContainer}>
                <Text style={styles.label}>File Upload</Text>
                <Text style={styles.inputText}>
                  {file ? file.name : 'Select a file (image or document)'}
                </Text>
              </TouchableOpacity>

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => navigation.goBack()}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.submitButton]}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default AddClaimScreen;
