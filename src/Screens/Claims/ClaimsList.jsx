import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  BackHandler,
  SafeAreaView,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native'; // Import this
import {styles} from './ClaimsListStyles';
import {colors} from '../../Assets/colors';
import {GetClaimsThunk} from '../../Services/GetClaimsService/GetClaimsSlice';
import {useSelector, useDispatch} from 'react-redux';
import {getData} from '../../Utils/localHelper';
import {DownloadClaimDocumentThunk} from '../../Services/DocumentUploadService/UploadClaimDocumentsSlice';
import RNFS from 'react-native-fs';
import {requestStoragePermission} from '../../Utils/permissions';
import {blobToBase64} from '../../Utils/blobToBase64';
import RNFetchBlob from 'rn-fetch-blob';

const ClaimsList = ({route, navigation}) => {
  const {id, title} = route.params || {id: null, title: 'Unknown Project'};
  const dispatch = useDispatch();
  const {getClaimsData} = useSelector(state => state.getClaims);
  const {downloadData} = useSelector(state => state.UploadClaimDocuments);

  console.log('getClaimsData', getClaimsData);
  console.log('downloadData', downloadData);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );

    return () => {
      backHandler.remove();
    };
  }, [navigation]);

  // Fetch claims when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchGetClaims();
    }, []),
  );

  const fetchGetClaims = async () => {
    const getUserData = await getData('userData');
    const LoginUserID = getUserData?.LoginUserID;
    const CompanyID = getUserData?.CompanyID;

    console.log('CompanyID:', CompanyID);
    const payload = {
      ClaimID: 0,
      CompanyID: CompanyID,
      ClaimUserID: LoginUserID,
      ClaimDate: '',
      AppUserID: LoginUserID,
    };
    console.log('claimpayload', payload);
    await dispatch(GetClaimsThunk({payload}));
  };

  const handleDownloadFile = async claimId => {
    try {
      const hasPermission = await requestStoragePermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Storage permission is required.');
        return;
      }

      const getUserData = await getData('userData');
      const LoginUserID = getUserData?.LoginUserID;

      const payload = {
        ClaimID: claimId,
        ClaimDocumentID: 0,
        LoginUserID: LoginUserID,
      };

      const response = await dispatch(DownloadClaimDocumentThunk({payload}));

      if (response.payload) {
        const blob = response.payload;
        let fileName = `TamsClaim_${Date.now()}.png`; // Dynamic name
        // Define Save Path in Downloads Directory
        const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;

        console.log(`Saving file as: ${fileName}`);

        //Convert Blob to Base64
        const base64Data = await blobToBase64(blob);

        // Write File to Downloads Folder
        await RNFS.writeFile(path, base64Data, 'base64');

        Alert.alert('Download Complete', `File saved at: ${path}`);
        console.log('File saved at:', path);
      } else {
        console.error('No file received');
      }
    } catch (error) {
      console.error('File download error:', error);
      Alert.alert('Error', 'File download failed.');
    }
  };

  const statusColors = {
    NEW: '#4CAF50',
    OPEN: '#4CAF50',
    PENDING: '#FFC107',
    COMPLETED: '#2196F3',
    REJECTED: '#FF4C4C',
  };

  const handleViewDetails = item => {
    setSelectedClaim(item);
    setModalVisible(true);
  };

  const renderItem = ({item}) => (
    <View
      colors={['#ffffff', '#f4f4f4']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradientCard}>
      {/* Left Section - Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <FeatherIcon name="user" size={20} color="#FF6A00" />
          <Text style={styles.infoText}>{item.ClaimUserName}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="numbers" size={20} color="#FF6A00" />
          <Text style={styles.infoText2}>{item.ClaimNumber}</Text>
          <View style={styles.datePadding}>
            <FeatherIcon name="calendar" size={20} color="#FF6A00" />
            <Text style={styles.infoText}>{item.ClaimDate.split('T')[0]}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.columnItem}>
            <FeatherIcon name="dollar-sign" size={20} color="#FF6A00" />
            <Text style={[styles.infoText, {width: 70}]}>
              {item.ClaimAmount}
            </Text>
          </View>
          <View style={styles.columnItem}>
            <FeatherIcon name="briefcase" size={20} color="#FF6A00" />
            <Text style={styles.infoText}>{item.ClaimTypeName}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <FeatherIcon name="message-square" size={20} color="#FF6A00" />
          <Text style={styles.infoText} numberOfLines={1}>
            {item.ClaimRemarks}
          </Text>
        </View>
        {/* Status Badge */}
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: statusColors[item?.ClaimStatus] || '#58d68d'},
          ]}>
          <Text style={styles.badgeText}>{item.ClaimStatus}</Text>
        </View>
      </View>

      {/* Right Section - Actions and Status */}
      <View style={styles.actionSection}>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[
              styles.iconButton,
              item.ClaimStatus === 'Approved' && styles.disabledButton,
            ]}
            disabled={item.ClaimStatus === 'Approved'}
            onPress={() => navigation.navigate('addclaims', {claimData: item})}>
            <FeatherIcon
              name="edit-2"
              size={20}
              color={item.ClaimStatus === 'Approved' ? '#CCC' : '#FFF'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleViewDetails(item)}>
            <Icon name="visibility" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
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
              <Text style={styles.headerText}>{'Claims'}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.addclaimContainer}>
          <TouchableOpacity
            style={styles.addClaimButton}
            onPress={() => navigation.navigate('addclaims')}>
            <LinearGradient
              colors={['#FF6A00', '#FF9500']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.addClaimGradient}>
              <Icon name="add-circle-outline" size={20} color="#FFF" />
              <Text style={styles.addText}>Add Claim</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <FlatList
          data={getClaimsData}
          renderItem={renderItem}
          keyExtractor={item => item.ClaimID.toString()}
          contentContainerStyle={styles.taskList}
          removeClippedSubviews={false}
        />

        {/* Modal for Viewing Details */}
        {modalVisible && selectedClaim && (
          <Modal
            transparent={true}
            visible={modalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalOverlay}></View>
              <View style={styles.modalContent}>
                <LinearGradient
                  colors={['#FF6A00', '#FF9500']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Claim Details</Text>
                </LinearGradient>
                <View style={styles.modalBody}>
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>User Name:</Text>
                    <Text style={styles.value}>
                      {selectedClaim.ClaimUserName}
                    </Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Claim Id:</Text>
                    <Text style={styles.value}>
                      <Text style={styles.value}>
                        {selectedClaim.ClaimNumber}
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.value}>
                      {selectedClaim.ClaimDate.split('T')[0]}
                    </Text>
                  </View>

                  <View style={styles.divider} />
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Amount:</Text>
                    <Text style={styles.value}>
                      ${selectedClaim.ClaimAmount}
                    </Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Type:</Text>
                    <Text style={styles.value}>
                      {selectedClaim.ClaimTypeName}
                    </Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Remarks:</Text>
                    <Text style={styles.remarksText}>
                      {selectedClaim.ClaimRemarks || 'No remarks'}
                    </Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Status:</Text>
                    <View
                      style={[
                        styles.modalStatusBadge,
                        {
                          backgroundColor:
                            statusColors[selectedClaim?.ClaimStatus] ||
                            '#58d68d', // Fallback color
                        },
                      ]}>
                      <Text style={styles.badgeText}>
                        {selectedClaim.ClaimStatus}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Download File:</Text>
                    <View style={[styles.modalStatusBadge]}>
                      <TouchableOpacity
                        style={styles.dlodButton}
                        onPress={() =>
                          handleDownloadFile(selectedClaim.ClaimID)
                        }>
                        <FeatherIcon name="download" size={20} color="#FFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ClaimsList;
