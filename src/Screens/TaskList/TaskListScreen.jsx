import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {GetTasksThunk} from '../../Services/GetTasksService/GetTasksSlice';
import dayjs from 'dayjs';
import {styles} from './TaskListStyles';
import {getData} from '../../Utils/localHelper';
import LoadingComponent from '../../Components/LoadingComponent';

const TaskListScreen = ({route, navigation}) => {
  const {id, title} = route.params || {id: null, title: ''};

  const dispatch = useDispatch();
  const {tasksData} = useSelector(state => state.getTasks);
  const isLoader = useSelector(state => state.login.isLoader);
  const [localTasks, setLocalTasks] = useState([]);
  // console.log('localTasks', localTasks);

  const [isLoading, setIsLoading] = useState(true); // Local loading state

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTasksList();
    });

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

  // useEffect(() => {
  //   if (tasksData) {
  //     setLocalTasks(tasksData);
  //     setIsLoading(false);
  //   }
  // }, [tasksData]);

  useEffect(() => {
    if (tasksData) {
      // Filter tasks based on TaskStatusID and TaskStatusName
      const filteredTasks = tasksData.filter(
        task => task.TaskStatusID === id && task.TaskStatusName === title,
      );

      setLocalTasks(filteredTasks);
      setIsLoading(false);
    }
  }, [tasksData, id, title]);

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

    console.log('GetTasksPayload', payload);
    const response = await dispatch(GetTasksThunk({payload}));
    console.log('GetTasksThunk Response:', response.payload);
    // const fetchedTasks = response.payload || [];
    // setLocalTasks(fetchedTasks);
    // setIsLoading(false); // Stop loading
  };

  const priorityColors = {
    Review: '#FF4C4C',
    High: '#FF4C4C',
    Medium: '#FFB347',
    Low: '#4CAF50',
  };

  const statusColors = {
    Active: '#4CAF50',
    Completed: '#2196F3',
    Pending: '#FFC107',
  };

  const renderItem = ({item}) => (
   
      <View
        colors={['#f9f9f9', '#e6e6e6']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradientCard}>
        <View style={styles.leftSection}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <Text style={styles.taskName}>{item.TaskName}</Text>
            <Text style={[styles.taskName, {marginLeft: 10}]}>
              {`[ ${item.CategoryName} ]`}
            </Text>
          </View>

          <Text style={styles.infoText}>
            <Text style={styles.label}>Date: </Text>
            {dayjs(item.TaskCreationDate).format('YYYY-MM-DD')}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Client Name: </Text>
            {item.ClientName}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Start Date: </Text>
            {dayjs(item.TaskStartDate).format('YYYY-MM-DD')}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>End Date: </Text>
            {dayjs(item.TaskEndDate).format('YYYY-MM-DD')}
          </Text>

          <View style={styles.row}>
            <View
              style={[
                styles.priorityBadge,
                {
                  backgroundColor:
                    priorityColors[item.PriorityName] || '#58d68d',
                },
              ]}>
              <Text style={styles.badgeText}>
                {item.PriorityName || 'Unknown'}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: statusColors[item.StatusName] || '#58d68d',
                },
              ]}>
              <Text style={styles.badgeText}>
                {item.StatusName || 'Unknown'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.rightSection}>
          {/* History Icon */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              navigation.navigate('taskhistoryscreen', {taskId: item.TaskID})
            }>
            <Icon name="event-note" size={24} color="#FFF" />
          </TouchableOpacity>

          {/* Task Info Icon */}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() =>
              navigation.navigate('tasklistsinfoscreen', {
                tasklistinfo: item,
                id,
                title,
              })
            }>
            <Icon name="visibility" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

  );

  const noRenderData = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'cyan',
        }}>
        <Text style={{color: '#FF902F', fontWeight: 'bold', fontSize: 24}}>
          {/* {'No Data List'} */}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <>
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
                  <Text style={styles.headerText}>{title}</Text>
                </View>
              </View>
            </LinearGradient>
   
            <FlatList
              data={localTasks}
              renderItem={renderItem}
              keyExtractor={item => item.TaskID.toString()}
              contentContainerStyle={styles.taskList}
              ListEmptyComponent={noRenderData}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TaskListScreen;
