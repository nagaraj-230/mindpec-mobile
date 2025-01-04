// current screen design
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  BackHandler,
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

const DashBoardScreen = ({route, navigation}) => {
  const {userName} = route.params || {userName: ''}; // Retrieve userName from route params

  const dispatch = useDispatch();
  const {taskStatusData, isLoading} = useSelector(state => state.getTaskStatus);
  console.log('taskStatusData', taskStatusData);
  const {catogriesData} = useSelector(state => state.getCatogeroies);
  // console.log('catogriesData', catogriesData);
  const [userNameState, setUserNameState] = useState(userName); // Initialize state to hold userName
  const [cateData, setCateData] = useState([]);

  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const getUserData = await getData('user');
      console.log('getUserData:', getUserData);
      if (getUserData) {
        setUserNameState(getUserData.UserName); // Set userName from stored data
      }
    };

    fetchUserData(); // Call the function to fetch user data on mount
  }, []);

  useEffect(() => {
    if (taskStatusData) {
      setDashboardData(taskStatusData); // Sync local state with Redux
    }
  }, [taskStatusData]);

  useEffect(() => {
    const backAction = () => {
      return true; // Prevent back button navigation to the login screen
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Clean up listener on unmount
  }, []);

  useEffect(() => {
    getTaskStatusList();
    getCatogeroies();
  }, []);

  const getTaskStatusList = async () => {
    const getUserData = await getData('user');
    console.log('getUserData:', getUserData);
    const LoginUserID = getUserData?.LoginUserID;
    // const token = await getData('token');
    // console.log('Token:', token);

    const payload = {TaskStatusID: 0, AppUserID: LoginUserID};
    console.log('dashpayLoad', payload);
    await dispatch(GetTaskStatusThunk({payload}));
  };

  const getCatogeroies = async () => {
    const payload = {CategoryID: 0};
    const response = await dispatch(GetCatogeroiesThnuk({payload}));
    console.log('responseCato', response);
  };
  const iconMapping = {
    1: {icon: 'edit', color: '#FFA500'},
    2: {icon: 'hourglass-empty', color: '#1E90FF'},
    3: {icon: 'folder', color: '#FF8C00'},
    4: {icon: 'check-circle', color: '#32CD32'},
    5: {icon: 'search', color: '#6A5ACD'},
  };

  const updatedTaskStatusData = [
    ...(dashboardData || []),
    {
      TaskStatusID: 6,
      TaskStatusName: 'Claims',
      icon: 'attach-money',
      color: '#FF4500',
    },
  ];

  const handleCardPress = (id, title) => {
    if (id === 6) {
      navigation.navigate('claims');
    } else {
      navigation.navigate('tasklistscreen', {id, title,});
      // navigation.navigate('catoscreen', {id, title,});

    }
  };

  const handleLogout = async () => {
    console.log('logout method');
    await clearData();
    navigation.navigate('login');
  };

  return (
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
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.backButton}>
                <Icon name={'logout'} size={24} color={colors.white} />
              </TouchableOpacity>
              <View style={styles.centerContainer}>
                <Image source={images.logo} style={styles.logo} />
              </View>
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
                return (
                  <TouchableOpacity
                    style={[styles.card, {backgroundColor: 'white'}]}
                    onPress={() =>
                      handleCardPress(item.TaskStatusID, item.TaskStatusName)
                    }
                    activeOpacity={0.8}>
                    {/* <View
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: '#FF6A00',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        borderRadius: 15,
                        top: 5,
                        right: 5,
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 1},
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
                        elevation: 2,
                      }}>
                      <Text style={styles.countText}>5</Text>
                    </View> */}
                    <View
                      style={[styles.iconContainer, {backgroundColor: color}]}>
                      <Icon name={icon} size={30} color={colors.white} />
                    </View>
                    <Text style={styles.cardText}>{item.TaskStatusName}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.TaskStatusID.toString()}
              numColumns={2}
              columnWrapperStyle={styles.row}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default DashBoardScreen;
