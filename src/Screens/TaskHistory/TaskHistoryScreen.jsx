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

const TaskHistoryScreen = ({route, navigation}) => {
  const {taskId} = route.params;
  const dispatch = useDispatch();

  const [historyData, setHistoryData] = useState([]);
  // Select the task history data from Redux
  const {getTaskHistroyData} = useSelector(state => state.getTaskStatusHistory);
  console.log('Redux Data:', getTaskHistroyData);

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
    const getUserData = await getData('user');
    const LoginUserID = getUserData?.LoginUserID;

    const payload = {
      TaskStatusHistoryID: 0,
      TaskID: taskId,
      AppUserID: LoginUserID,
    };

    // console.log('Dispatching History Payload:', payload);
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
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  gradientHeader: {
    width: '100%',
    // paddingVertical: 10,
    height: Platform.OS === 'ios' ? responsiveHeight(6) : responsiveHeight(6),
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
  historyRow: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
  },
  textContainer: {
    flexDirection: 'column',
  },
  taskName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
  },
  divider: {
    height: 1.3,
    // backgroundColor: '#E0E0E0',
    backgroundColor: colors.btncolor2,
    marginHorizontal: 12,
  },
});
