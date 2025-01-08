// current screen design
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

const DashBoardScreen = ({route, navigation}) => {
  const {userName} = route.params || {userName: ''}; // Retrieve userName from route params

  const dispatch = useDispatch();
  const {taskStatusData, isLoading} = useSelector(state => state.getTaskStatus);
  // console.log('taskStatusData', taskStatusData);
  const {tasksData} = useSelector(state => state.getTasks);
  const {getClaimsData} = useSelector(state => state.getClaims);
  const totalClaims = getClaimsData?.length || 0;

  const [dashboardData, setDashboardData] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});
  const [userNameState, setUserNameState] = useState(userName);

  useEffect(() => {
    if (taskStatusData) {
      setDashboardData(taskStatusData); // Sync local state with Redux
    }
  }, [taskStatusData]);

  // Calculate Task Counts
  useEffect(() => {
    if (tasksData && taskStatusData) {
      const counts = taskStatusData.reduce((acc, status) => {
        // Skip counting for Claims
        if (status.TaskStatusID === 7) {
          acc[status.TaskStatusID] = null; // Do not show count for Claims
          return acc;
        }

        const count = tasksData.filter(
          task =>
            task.TaskStatusID === status.TaskStatusID &&
            task.TaskStatusName === status.TaskStatusName,
        ).length;

        acc[status.TaskStatusID] = count;
        return acc;
      }, {});

      setTaskCounts(counts);
    }
  }, [tasksData, taskStatusData]);

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

    return () => backHandler.remove(); // Clean up listener on unmount
  }, []);

  useEffect(() => {
    getTaskStatusList();
    getCatogeroies();
    // getTasksList();
    // fetchClaims();
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

  const iconMapping = {
    1: {icon: 'edit', color: '#FFA500'},
    2: {icon: 'hourglass-empty', color: '#1E90FF'},
    3: {icon: 'folder', color: '#FF8C00'},
    4: {icon: 'check-circle', color: '#32CD32'},
    5: {icon: 'search', color: '#6A5ACD'},
    6: {icon: 'priority-high', color: '#6A5ACD'},
  };

  const updatedTaskStatusData = [
    ...(dashboardData || []),
    {
      TaskStatusID: 7,
      TaskStatusName: 'Claims',
      icon: 'attach-money',
      color: '#FF4500',
    },
    // {
    //   TaskStatusID: 8,
    //   TaskStatusName: 'Overdew Items',
    //   icon: 'warning',
    //   color: '#FF4500',
    // },
  ];

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

  const handleCardPress = (id, title) => {
    if (id === 7) {
      navigation.navigate('claims');
    } else {
      navigation.navigate('tasklistscreen', {id, title});
      // navigation.navigate('catoscreen', {id, title,});
    }
  };

  const handleLogout = async () => {
    console.log('logout method');
    await clearData();
    navigation.navigate('login');
  };

  const filteredTaskStatusData = updatedTaskStatusData.filter(
    item =>
      !(item.TaskStatusID === 7 && taskCounts[item.TaskStatusID] === null),
  );
  console.log('Filtered Data:', filteredTaskStatusData);

  return (
    <SafeAreaView style={{flex:1}}>
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
              data={filteredTaskStatusData}
              renderItem={({item}) => {
                const {icon, color} = iconMapping[item.TaskStatusID] || {
                  icon: item.icon,
                  color: item.color,
                };
                const count = taskCounts[item.TaskStatusID];

                return (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                      handleCardPress(item.TaskStatusID, item.TaskStatusName)
                    }
                    activeOpacity={0.9}>
                    {/* Count Badge */}
                    {count !== null && (
                      <View style={styles.countBadge}>
                        {item.TaskStatusID === 7 ? (
                          // Show totalClaims for Claims card
                          // <Text style={styles.countText}>{totalClaims}</Text>
                          <Text style={styles.countText}>{1}</Text>
                        ) : (
                          // Show count for other cards
                          // <Text style={styles.countText}>{count}</Text>
                          <Text style={styles.countText}>{1}</Text>
                        )}
                      </View>
                    )}

                    {/* Task Name */}

                    <Text
                      style={styles.cardText}
                      numberOfLines={2}
                      ellipsizeMode="tail">
                      {item.TaskStatusName}
                    </Text>

                    {/* Icon */}
                    <View
                      style={[styles.iconContainer, {backgroundColor: color}]}>
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
  );
};

export default DashBoardScreen;

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
