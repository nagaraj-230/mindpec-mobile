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
  const {userName} = route.params || {userName: ''}; // Retrieve userName from route params

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
  const [userNameState, setUserNameState] = useState(userName);

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

  useEffect(() => {
    const fetchUserData = async () => {
      const getUserData = await getData('user');
      // console.log('getUserData:', getUserData);
      if (getUserData) {
        setUserNameState(getUserData.UserName); // Set userName from stored data
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
    const getUserData = await getData('user');
    // console.log('getUserData:', getUserData);
    const LoginUserID = getUserData?.LoginUserID;
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
    const getUserData = await getData('user');
    // console.log('getUserData:', getUserData);
    const LoginUserID = getUserData?.LoginUserID;
    const payload = {AppUserID: LoginUserID, CategoryID: 1, TaskStatusID: 0};

    // console.log('paylodcount', payload);
    const response = await dispatch(DashboardCountThunk({payload}));
    // console.log('responseCount', response);
  };

  const getTasksList = async () => {
    setIsLoading(true);
    const getUserData = await getData('user');
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
    const userData = await getData('user');
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
    1: {icon: 'edit', color: '#FFA500'},
    2: {icon: 'hourglass-empty', color: '#1E90FF'},
    3: {icon: 'folder', color: '#FF8C00'},
    4: {icon: 'check-circle', color: '#32CD32'},
    5: {icon: 'search', color: '#6A5ACD'},
    6: {icon: 'priority-high', color: '#6A5ACD'},
  };

  const updatedTaskStatusData = [
    // ...(dashboardData || []),
    ...(dashboardData || []).filter(
      item => item.TaskStatusName !== 'Hold' && item.TaskStatusName !== 'To Review for Mgmt'
    ),
    {
      TaskStatusID: 7,
      TaskStatusName: 'Claims',
      icon: 'attach-money',
      color: '#FF4500',
    },
  ];

  const handleCardPress = (id, title) => {
    if (id === 7) {
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
                     
                        <View style={styles.countBadge}>
                          <Text style={styles.countText}>
                            {item.TaskStatusID === 7
                              ? totalClaims
                              : taskCount[`ID${item.TaskStatusID}`] || 0}
                          </Text>
                        </View>
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
                          <Icon name={icon} size={24} color={colors.white} />
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={item => item.TaskStatusID.toString()}
                  numColumns={2}
                  columnWrapperStyle={styles.row}
                  showsVerticalScrollIndicator={false}
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

   {/* {count !== null && (
                          <View style={styles.countBadge}>
                            {item.TaskStatusID === 7 ? (
                              // Show totalClaims for Claims card
                              <Text style={styles.countText}>
                                {totalClaims}
                              </Text>
                            ) : (
                              // <Text style={styles.countText}>{1}</Text>
                              // Show count for other cards
                              <Text style={styles.countText}>{count}</Text>
                              // <Text style={styles.countText}>{1}</Text>
                            )}
                          </View>
                        )} */}
// renderItem={({item}) => {
//   const count = taskCounts[item.TaskStatusID];

//   return (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() =>
//         handleCardPress(item.TaskStatusID, item.TaskStatusName)
//       }
//       activeOpacity={0.9}>
//       {/* Task Name */}
//       <Text style={styles.taskText}>{item.TaskStatusName}</Text>

//       {/* Task Count with Counter Box */}
//       {count !== null && (
//         <View style={styles.countContainer}>
//           <View style={styles.countBox}>
//             <Text style={styles.countNumber}>
//               {item.TaskStatusID === 7 ? totalClaims : count}
//               {/* {count} */}
//             </Text>
//           </View>
//         </View>
//       )}
//     </TouchableOpacity>
//   );
// }}

// renderItem={({item}) => {
//   // const {icon, color} = iconMapping[item.TaskStatusID] || {
//   //   icon: item.icon,
//   //   color: item.color,
//   // };
//   const count = taskCounts[item.TaskStatusID]; // Get count for each status

//   return (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() =>
//         handleCardPress(item.TaskStatusID, item.TaskStatusName)
//       }
//       activeOpacity={0.9}>
//       {/* Count Badge */}
//       {count !== null && (
//         <View style={styles.countBadge}>
// {item.TaskStatusID === 7 ? (
//   // Show totalClaims for Claims card
//   <Text style={styles.countText}>{totalClaims}</Text>
// ) : (
//   // Show count for other cards
//   <Text style={styles.countText}>{count}</Text>
// )}
//         </View>
//       )}

//       {/* Task Name */}
//       <Text style={styles.cardText}>{item.TaskStatusName}</Text>

//       {/* Icon */}
//       {/* <View
//         style={[styles.iconContainer, {backgroundColor: color}]}>
//         <Icon name={icon} size={24} color={colors.white} />
//       </View>  */}
//     </TouchableOpacity>
//   );
// }}
