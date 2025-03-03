import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {GetTaskStatusThunk} from '../../Services/GetTaskStatusService/GetTaskStatusSlice';
import {GetTasksThunk} from '../../Services/GetTasksService/GetTasksSlice';

import {styles} from './DashBoardStyles';
import {colors} from '../../Assets/colors';
import {images} from '../../Assets/images';
import {clearData, getData} from '../../Utils/localHelper';
import {useFocusEffect} from '@react-navigation/native';
import LoadingComponent from '../../Components/LoadingComponent';
import {setIsLoading} from '../../Services/LoginService/LoginSlice';
import {GetCatogeroiesThnuk} from '../../Services/CategeoriesService/GetCategoriesSlice';
import {GetClaimsThunk} from '../../Services/GetClaimsService/GetClaimsSlice';
import {DashboardCountThunk} from '../../Services/DashBoardTaskCount/DashBoardCountSlice';

const DashBoardScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {taskStatusData, isLoading} = useSelector(state => state.getTaskStatus);
  console.log('taskStatusData', taskStatusData);
  const {tasksData} = useSelector(state => state.getTasks);
  console.log('tasksData', tasksData);
  const {catogriesData} = useSelector(state => state.getCatogeroies);
  console.log('catogriesData', catogriesData);
  const {getClaimsData} = useSelector(state => state.getClaims);
  const totalClaims = getClaimsData?.length || 0;

  const {countData} = useSelector(state => state.dashboardcount);
  console.log('countData', countData);
  const [dashboardData, setDashboardData] = useState([]);
  // const [taskCounts, setTaskCounts] = useState({});
  // username and company name display
  const [userNameState, setUserNameState] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');

  const [taskCount, setTotalCount] = useState({});
  console.log('taskCount', taskCount);

  useEffect(() => {
    if (taskStatusData) {
      setDashboardData(taskStatusData); // Sync local state with Redux
    }
  }, [taskStatusData]);

  useEffect(() => {
    if (countData) {
      const calculatedCounts = countData.reduce((acc, item) => {
        Object.keys(item).forEach(key => {
          if (key.startsWith('ID')) {
            acc[key] = (acc[key] || 0) + item[key];
          }
        });
        return acc;
      }, {});
      setTotalCount(calculatedCounts);
    }
  }, [countData]);

  // getUserName from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      const getUserData = await getData('userData');
      console.log('getUserData:', getUserData.CompanyName);
      if (getUserData) {
        setUserNameState(getUserData.UserName); // Set userName from stored data
        setSelectedCompany(getUserData.CompanyName); // Store Company Name
      }
    };

    fetchUserData(); // Call the function to fetch user data on mount
  }, []);

  useEffect(() => {
    const backAction = () => {
      return true; // Prevent back button navigation to the login screen
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    getTaskStatusList();
    // getCatogeroies();
    // getTasksList();
    fetchClaims();
    fetchDashboardCount();
  }, []);

  const getTaskStatusList = async () => {
    const getUserData = await getData('userData');
    console.log('getUserData:', getUserData);
    const LoginUserID = getUserData?.LoginUserID;
    console.log('LoginUserID--->', getUserData?.LoginUserID);
    // const token = await getData('token');
    // console.log('Token:', token);

    const payload = {TaskStatusID: 0, AppUserID: LoginUserID};
    // console.log('dashpayLoad', payload);
    await dispatch(GetTaskStatusThunk({payload}));
  };

  const getCatogeroies = async () => {
    const payload = {CategoryID: 0};
    const response = await dispatch(GetCatogeroiesThnuk({payload}));
    // console.log('responseCato', response);
  };

  const fetchDashboardCount = async () => {
    const getUserData = await getData('userData');
    // console.log('getUserData:', getUserData);
    const LoginUserID = getUserData?.LoginUserID;
    const payload = {AppUserID: LoginUserID, CategoryID: 1, TaskStatusID: 0};

    // console.log('paylodcount', payload);
    const response = await dispatch(DashboardCountThunk({payload}));
    // console.log('responseCount', response);
  };

  const getTasksList = async () => {
    setIsLoading(true);
    const getUserData = await getData('userData');
    const LoginUserID = getUserData?.LoginUserID;
    const CompanyID = getUserData?.CompanyID;

    // const payload = {TaskID: 0, LoginUserID: LoginUserID};
    const payload = {
      TaskID: 0,
      CompanyID: CompanyID,
      ClientID: 1,
      AppUserID: LoginUserID,
    };

    // console.log('GetTasksPayload', payload);
    const response = await dispatch(GetTasksThunk({payload}));
    // console.log('GetTasksThunk Response:', response.payload);
  };

  const fetchClaims = async () => {
    const userData = await getData('userData');
    const payload = {
      ClaimID: 0,
      CompanyID: userData?.CompanyID,
      ClaimUserID: userData?.LoginUserID,
      ClaimDate: '',
      AppUserID: userData?.LoginUserID,
    };

    // Dispatch the GetClaimsThunk action
    const response = await dispatch(GetClaimsThunk({payload}));
    // console.log('GetClaimsThunkResponse',response)
  };
  const iconMapping = {
    1: { color: '#FF5733' },
    2: { color: '#33FF57' },
    3: { color: '#5733FF' },
    4: { color: '#FF33A1' },
    5: { color: '#33A1FF' },
    6: { color: '#A133FF' },
    7: { color: '#D2691E' },
    8: { color: '#FF4500' },
    9: { color: '#32CD32' },
    10: { color: '#8A2BE2' },
    11: { color: '#DC143C' },
    12: { color: '#00CED1' },
    13: { color: '#20B2AA' },
    14: { color: '#FF8C00' },
    15: { color: '#B22222' },
    16: { color: '#2E8B57' },
    17: { color: '#6A5ACD' },
    18: { color: '#FF6347' },
    19: { color: '#4682B4' },
    20: { color: '#D2691E' },
  };
  
  const updatedTaskStatusData = [
    // ...(dashboardData || []),
    ...(dashboardData || []).filter(
      item =>
        item.TaskStatusName !== 'Hold' &&
        item.TaskStatusName !== 'To Review for Mgmt',
    ),
    {
      TaskStatusID: 100,
      TaskStatusName: 'Claims',
      icon: 'attach-money',
      color: '#FF4500',
    },
  ];

  const handleCardPress = (id, title) => {
    if (id === 100) {
      navigation.navigate('claims');
    } else {
      navigation.navigate('tasklistscreen', {
        id,
        title,
        // DashTaskStatusID: id,
        // DashTaskStatusName: title,
      });
      // console.log('id and status name',id,title)
      // navigation.navigate('catoscreen', {id, title,});
    }
  };

  const handleLogout = async () => {
    console.log('logout method');
    await clearData();
    navigation.navigate('login');
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <>
              {/* Custom Header */}

              <LinearGradient
                colors={['#FF6A00', '#FF9500']}
                style={styles.gradientHeader}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <View style={styles.headerContainer}>
                  {/* Left Logo */}
                  <View style={styles.logoContainer}>
                    <Image source={images.logo} style={styles.logo} />
                  </View>

                  {/* Company Name (Centered) */}
                  <View style={styles.companyNameContainer}>
                    <Text
                      style={styles.compName}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {selectedCompany}
                    </Text>
                  </View>

                  {/* Logout Button (Right) */}
                  <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.backButton}>
                    <Icon name="logout" size={24} color={colors.white} />
                  </TouchableOpacity>
                </View>
              </LinearGradient>

              {/* Username Section */}
              <View style={styles.usernameSection}>
                <Text style={styles.username}>Welcome, {userNameState}</Text>
              </View>

              {/* Task Status Cards */}
              <View style={styles.innerContainer}>
                <FlatList
                  data={updatedTaskStatusData}
                  renderItem={({item}) => {
                    const {icon, color} = iconMapping[item.TaskStatusID] || {
                      icon: item.icon,
                      color: item.color,
                    };
                    // const count = taskCounts[item.TaskStatusID];
                    const count = taskCount[item.TaskStatusID];

                    return (
                      <TouchableOpacity
                        style={styles.card}
                        onPress={() =>
                          handleCardPress(
                            item.TaskStatusID,
                            item.TaskStatusName,
                          )
                        }
                        activeOpacity={0.9}>
                      
                        {/* Count Badge */}
                        {/* <View style={styles.countBadge}>
                          <Text style={styles.countText}>
                            {item.TaskStatusID === 100
                              ? totalClaims
                              : taskCount[`ID${item.TaskStatusID}`] || 0}
                          </Text>
                        </View> */}
                       
                        {/* Task Name */}
                        <Text
                          style={styles.cardText}
                          numberOfLines={2}
                          ellipsizeMode="tail">
                          {item.TaskStatusName}
                        </Text>

                        {/* Icon */}
                        <View
                          style={[
                            styles.iconContainer,
                            {backgroundColor: color},
                          ]}>
                             <Text style={styles.countTextBox}>
                            {item.TaskStatusID === 100
                              ? totalClaims
                              : taskCount[`ID${item.TaskStatusID}`] || 0}
                          </Text>
                          {/* <Icon name={icon} size={24} color={colors.white} /> */}
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={item => item.TaskStatusID.toString()}
                  numColumns={2}
                  columnWrapperStyle={styles.row}
                  showsVerticalScrollIndicator={false}
                  removeClippedSubviews={false}
                />
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default DashBoardScreen;
