import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import {UpdatedTaskStatusHistoryThunk} from '../../Services/TaskHistoryService/TaskHistorySlice';
import {GetTaskAssignmentThunk} from '../../Services/GetTaskAssignments/GetTaskAssignmentSlice';

import {styles} from './TaskListInfoStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../../Assets/colors';
import {getData} from '../../Utils/localHelper';

const TaskListInfoScreen = ({route, navigation}) => {
  const {tasklistinfo, id, title} = route.params;
  const {getTaskAssignmentData} = useSelector(state => state.getTaskAssignment);
  // console.log('getTaskAssignmentData', getTaskAssignmentData);

  const dispatch = useDispatch();
  // console.log('Task Info:', tasklistinfo, 'ID:', id, 'Title:', title);

  // console.log('tasklistinfo', tasklistinfo);
  // State variables
  const [taskName] = useState(tasklistinfo?.TaskName);
  const [description, setDescription] = useState(tasklistinfo?.TaskDescription);

  // State variables
  const [creationDate] = useState(tasklistinfo?.TaskCreationDate);
  const [startDate] = useState(tasklistinfo?.TaskStartDate);
  const [endDate] = useState(tasklistinfo?.TaskEndDate);
  const [priority] = useState(tasklistinfo?.PriorityName);
  const [targetValue] = useState(tasklistinfo?.TargetValue?.toString() || '');
  const [achievedValue] = useState(
    tasklistinfo?.AchievedValue?.toString() || '',
  );
  const [status, setStatus] = useState(tasklistinfo?.StatusName || '');
  const [date, setDate] = useState('Select Date');
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  // remarks
  const [remarks, setRemarks] = useState('');
  const [errors, setErrors] = useState({remarks: '', date: ''}); // Track validation errors

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );

    return () => {
      unsubscribe(); // Cleanup navigation listener
      backHandler.remove(); // Cleanup back button listener
    };
  }, [navigation]);

  console.log('remarks', remarks);
  const toggleEdit = () => {
    if (isEditable) {
      // Close the date picker when clicking "Cancel"
      setIsPickerOpen(false);
      setRemarks('');
      setErrors('');
      setDate(null);
    }
    setIsEditable(!isEditable);
  };

  const validateRemarks = () => {
    if (remarks.trim().length < 5) {
      setErrors(prev => ({
        ...prev,
        remarks: 'Remarks should be at least 5 characters long.',
      }));
      return false;
    }
    // Clear remarks error if it's valid
    setErrors(prev => ({...prev, remarks: ''}));
    return true;
  };

  const handleRemarksChange = text => {
    setRemarks(text);
    if (text.trim().length >= 5) {
      // Clear error message once 5 characters are entered
      setErrors(prev => ({...prev, remarks: ''}));
    }
  };

  const validateDate = () => {
    const selectedDate = dayjs(date); // Get the selected date
    const currentDate = dayjs(); // Get the current date

    // Check if the selected date is valid
    if (!selectedDate.isValid()) {
      setErrors(prev => ({
        ...prev,
        date: 'Please select a valid date.',
      }));
      return false;
    }

    // Check if the selected date is in the future
    if (selectedDate.isAfter(currentDate, 'day')) {
      setErrors(prev => ({
        ...prev,
        date: 'Date cannot be in the future.',
      }));
      return false;
    }

    // If the selected date passes all checks, clear the error message
    setErrors(prev => ({...prev, date: ''}));
    return true;
  };

  // useEffect(() => {
  //   fetchGetTaskAssignment();
  // }, []);

  //getTaskAssignmetThunk call
  const fetchGetTaskAssignment = async () => {
    const payload = {TaskAssignmentID: 0, TaskID: tasklistinfo?.TaskID};

    console.log('getTaskAssignment payload', payload);
    const response = await dispatch(
      GetTaskAssignmentThunk({navigation, payload}),
    );
    // console.log('GetTaskAssignmentThunk response', response);
  };
  const handleDateChange = selectedDate => {
    // Extract the date property
    if (selectedDate && selectedDate.date) {
      const parsedDate = new Date(selectedDate.date); // Convert to a Date object
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate); // Update the state with a valid Date object
        if (validateDate()) {
          console.log(dayjs(parsedDate).format('YYYY-MM-DD')); // Log formatted date
        }
      } else {
        console.error('Invalid date:', selectedDate.date);
      }
    } else {
      console.error('Invalid selectedDate structure:', selectedDate);
    }
    setIsPickerOpen(false); // Close the picker
  };

  const currentDate = dayjs();
  const previousDate = currentDate.subtract(1, 'day');

  const handleCancel = () => {
    setIsPickerOpen(false); // Close the picker
    setDate('Select Date'); // Reset the date back to 'Select Date'
  };

  const handleUpdate = async () => {
    try {
      console.log('Submit button clicked'); // Confirm the function is called
      // Validate remarks and date independently
      const isRemarksValid = validateRemarks();
      const isDateValid = validateDate();

      // Only proceed if both validations are successful
      if (!isRemarksValid || !isDateValid) {
        console.log('Validation failed. Exiting function.');
        return; // Stop execution if validations fail
      }

      const getUserData = await getData('user');
      const LoginUserID = getUserData?.LoginUserID;
      // Prepare the payload
      const payload = {
        TaskStatusHistoryID: 0,
        TaskID: tasklistinfo?.TaskID,
        TaskAssignmentID: getTaskAssignmentData[0]?.TaskAssignmentID,
        TaskAssignmentUserID: LoginUserID,
        // TaskAssignmentID:24,
        // TaskAssignmentUserID: 6,

        StatusDate: dayjs(date).format('YYYY-MM-DD'),
        Remarks: remarks,
        // Remarks: 'Task Status History Update',
        // StatusID: tasklistinfo?.StatusID || 1,
        StatusID: 1,
        AppUserID: LoginUserID,
      };

      console.log('update task Payload:', payload);

      // Dispatch the action
      const response = await dispatch(
        UpdatedTaskStatusHistoryThunk({navigation, payload}),
      );
      // console.log('Response update task:', response);

      // Handle the response
      if (response?.meta?.requestStatus === 'fulfilled') {
        // Show success alert
        Alert.alert('Success', `Task status updated successfully!`);
      } else {
        // Handle error case
        Alert.alert(
          'Error',
          `Failed to update task status. Please try again.\n\nError: ${
            response?.error?.message || 'Unknown error'
          }`,
        );
      }

      setIsEditable(false); // Disable editing after update
    } catch (error) {
      // Handle unexpected errors
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      console.error('Error in handleUpdate:', error);
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
              <Text style={styles.headerText}>Task Details</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Main Content */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {isEditable ? (
            <>
              {/* Task Name */}
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'cyan',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  height: '20%',
                }}>
                <View>
                  <Text style={[styles.taskName, {width: '100%'}]}>
                    {taskName}
                  </Text>
                </View>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: colors.btncolor,
                    borderRadius: 8,
                    justifyContent: 'center',
                    width: 'auto',
                  }}>
                  <Text style={[styles.titleName, {width: '100%'}]}>
                    {title}
                  </Text>
                </View>
              </View>

              {/* Description */}
              <View style={[styles.infoContainer, {marginTop: '3%'}]}>
                <Text style={styles.label}>Description:</Text>
                <TextInput
                  style={styles.input}
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Enter description"
                  editable={false}
                />
              </View>

              {/* Remarks Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Remarks</Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                    errors.remarks ? {borderColor: 'red'} : {},
                  ]}
                  placeholder="Enter Remarks"
                  placeholderTextColor={colors.txtcolor}
                  value={remarks}
                  onChangeText={handleRemarksChange}
                  multiline
                  onBlur={validateRemarks}
                />
                {errors.remarks ? (
                  <Text style={{color: 'red', fontSize: 12}}>
                    {errors.remarks}
                  </Text>
                ) : null}
              </View>

              {/* Date Picker */}
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}>
                  <Text style={styles.datePickerLabel}>Update Date:</Text>
                  <TouchableOpacity onPress={() => setIsPickerOpen(true)}>
                    <Text style={[styles.datePickerLabel, {marginRight: 0}]}>
                      {' '}
                      {/* {dayjs(date).format('YYYY-MM-DD')} */}
                      {date === 'Select Date'
                        ? 'Select Date'
                        : dayjs(date).format('YYYY-MM-DD')}
                    </Text>
                  </TouchableOpacity>
                </View>

                {isPickerOpen && (
                  <DateTimePicker
                    mode="single"
                    // date={date || new Date()}
                    date={date instanceof Date ? date : new Date()}
                    onChange={handleDateChange}
                    onCancel={handleCancel}
                    selectedItemColor="#4C17A9"
                    minDate={new Date('2023-12-11')} // Allow selection of the previous day and today
                    maxDate={new Date()} // Don't allow future dates
                  />
                )}
                {/* {errors.date && (
                <Text style={styles.errorText}>{errors.date}</Text>
              )} */}
              </View>
            </>
          ) : (
            <>
              {/* Normal View */}
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor: 'cyan',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  height: '15%',
                }}>
                <View>
                  <Text style={[styles.taskName, {width: '100%'}]}>
                    {taskName}
                  </Text>
                </View>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: colors.btncolor,
                    borderRadius: 8,
                    // shadowColor: '#000',
                    // shadowOffset: {width: 0, height: 2},
                    // shadowOpacity: 0.1,
                    // shadowRadius: 4,
                    // elevation: 3,
                    justifyContent: 'center',
                    width: 'auto',
                  }}>
                  <Text style={[styles.titleName, {width: '100%'}]}>
                    {title}
                  </Text>
                </View>
              </View>

              <View style={[styles.rowView, {marginTop: 10}]}>
                <Text style={styles.label}>
                  Client:{' '}
                  <Text style={styles.value}>{tasklistinfo?.ClientName}</Text>
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <Text style={styles.label}>Description:</Text>
                <Text style={styles.value}>{description}</Text>
              </View>
              <View>
                <Text style={styles.label}>
                  Assigned Date:{' '}
                  <Text style={styles.value}>
                    {dayjs(tasklistinfo?.TaskCreationDate).format('YYYY-MM-DD')}
                  </Text>
                </Text>
              </View>

              {/* Start and End Dates */}
              <View style={styles.rowView}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.label}>Start: </Text>
                  <Text style={styles.dateValue}>
                    {dayjs(startDate).format('YYYY-MM-DD')}
                  </Text>

                  {/* Dash */}
                  <ComIcon
                    name="minus"
                    size={16}
                    color={colors.txtcolor}
                    style={{marginHorizontal: 8}}
                  />
                  {/* <Text style={styles.label}>End: </Text> */}
                  <Text style={styles.dateValue}>
                    {dayjs(endDate).format('YYYY-MM-DD')}
                  </Text>
                </View>
              </View>

              {/* Priority */}
              <View style={styles.rowView}>
                <Text style={styles.label}>
                  Priority: <Text style={styles.value}>{priority}</Text>
                </Text>
              </View>

              {/* Target Value */}
              <View>
                <Text style={styles.label}>
                  Target {tasklistinfo?.UOM_Name}:{' '}
                  <Text style={styles.value}>{targetValue}</Text>
                </Text>
              </View>

              {/* Achieved Value */}
              <View>
                <Text style={styles.label}>
                  Achieved {tasklistinfo?.UOM_Name}:{' '}
                  <Text style={styles.value}>{achievedValue}</Text>
                </Text>
              </View>

              {/* Status */}
              <View>
                <Text style={styles.label}>
                  Status: <Text style={styles.value}>{status}</Text>
                </Text>
              </View>
            </>
          )}
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton} onPress={toggleEdit}>
            <Text style={styles.buttonText}>
              {isEditable ? 'Cancel' : 'Status Update'}
            </Text>
          </TouchableOpacity>
          {isEditable && (
            <TouchableOpacity
              style={[
                styles.updateButton,
                // {backgroundColor: !date ? '#FF5722' : '#4CAF50'},
                {backgroundColor: !date ? '#d3d3d3' : '#FF5722'},
              ]}
              onPress={handleUpdate}
              disabled={!date}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TaskListInfoScreen;
