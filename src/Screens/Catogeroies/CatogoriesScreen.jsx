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
import {GetCatogeroiesThnuk} from '../../Services/CategeoriesService/GetCategoriesSlice';

import {styles} from './CatogoriesStyles';
import {colors} from '../../Assets/colors';
import {images} from '../../Assets/images';
import {clearData} from '../../Utils/localHelper';

const CatogriesScreen = ({route, navigation}) => {
  const {userName} = route.params || {userName: ''};

  const dispatch = useDispatch();
  const {catogriesData} = useSelector(state => state.getCatogeroies);
  const [cateData, setCateData] = useState([]);
  const [userNameState, setUserNameState] = useState(userName);

  useEffect(() => {
    const fetchUserData = async () => {
      const getUserData = await getData('userData');
      if (getUserData) {
        setUserNameState(getUserData.UserName);
      }
    };

    fetchUserData();
    fetchCategories();

    const backAction = () => true;
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const fetchCategories = async () => {
    const payload = {CategoryID: 0};
    const response = await dispatch(GetCatogeroiesThnuk({payload}));
    if (response?.payload) {
      setCateData(response.payload);
    }
  };

  const handleCardPress = (id, title) => {
    navigation.navigate('categoryDetails', {id, title});
  };

  const iconMapping = {
    1: {icon: 'task', color: '#FFA500'},
    2: {icon: 'trending-up', color: '#1E90FF'},
    3: {icon: 'folder-special', color: '#FF8C00'},
    4: {icon: 'group', color: '#32CD32'},
  };

  return (
    <View style={styles.container}>
      {/* Custom Header */}
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
            <Text style={styles.headerText}>{'Catogries'}</Text>
          </View>
        </View>
      </LinearGradient>
    
      {/* Categories Cards */}
      <View style={styles.innerContainer}>
        <FlatList
          data={cateData}
          renderItem={({item}) => {
            const {icon, color} = iconMapping[item.CategoryID] || {
              icon: 'category',
              color: '#6A5ACD',
            };
            return (
              <TouchableOpacity
                style={[styles.card, {backgroundColor: '#F5F5F5'}]}
                onPress={() =>
                  handleCardPress(item.CategoryID, item.CategoryName)
                }
                activeOpacity={0.8}>
                <View style={[styles.iconContainer, {backgroundColor: color}]}>
                  <Icon name={icon} size={30} color={colors.white} />
                </View>
                <Text style={styles.cardText}>{item.CategoryName}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.CategoryID.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          removeClippedSubviews={false}
        />
      </View>
    </View>
  );
};

export default CatogriesScreen;
