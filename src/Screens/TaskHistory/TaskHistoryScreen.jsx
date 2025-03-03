import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GetTaskStatusHistoryThunk} from '../../Services/TaskHistoryService/TaskHistorySlice';
import {colors} from '../../Assets/colors';
import {getData} from '../../Utils/localHelper';
import { styles } from './TaskHistroyStyles';

const TaskHistoryScreen = ({route, navigation}) => {
  const {taskId} = route.params;
  const dispatch = useDispatch();

  const [historyData, setHistoryData] = useState([]);
  // Select the task history data from Redux
  const {getTaskHistroyData} = useSelector(state => state.getTaskStatusHistory);
  // console.log('Redux Data:', getTaskHistroyData);

  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => {
  //       navigation.goBack();
  //       return true;
  //     },
  //   );

  //   return () => {
  //     backHandler.remove();
  //   };
  // }, [navigation]);

  useEffect(() => {
    getTaskStatusHistroy();
  }, []);

  const getTaskStatusHistroy = async () => {
    const getUserData = await getData('userData');
    const LoginUserID = getUserData?.LoginUserID;

    const payload = {
      TaskStatusHistoryID: 0,
      TaskID: taskId,
      AppUserID: LoginUserID,
    };

    console.log('Dispatching History Payload:', payload);
    const response = await dispatch(
      GetTaskStatusHistoryThunk({navigation, payload}),
    );
    // console.log('Thunk Response:', response.payload);

    if (response.payload) {
      setHistoryData(response.payload);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.historyRow}>
      <View style={styles.textContainer}>
        <Text style={styles.taskName}>{item.TaskName}</Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Date: </Text>
          {/* {dayjs(item.StatusDate).format('YYYY-MM-DD')} */}
          {item.StatusDate.split('T')[0]}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Status: </Text>
          {item.TaskStatusName}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Remarks: </Text>
          {item.Remarks}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
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
              <Text style={styles.headerText}>Task History</Text>
            </View>
          </View>
        </LinearGradient>

        <FlatList
          data={historyData}
          renderItem={renderItem}
          keyExtractor={item => item.TaskStatusHistoryID.toString()}
          ItemSeparatorComponent={() => <View style={styles.divider} />} // Divider between items
          contentContainerStyle={styles.listContainer}
          removeClippedSubviews={false}

        />
      </View>
    </SafeAreaView>
  );
};

export default TaskHistoryScreen;
