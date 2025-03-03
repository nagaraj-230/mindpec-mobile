import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../Assets/colors';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  // header
  gradientHeader: {
    width: '100%',
    // paddingVertical: 10,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    height: Platform.OS === 'ios' ? responsiveHeight(6) : responsiveHeight(6),
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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

  cardContainer: {
    // marginBottom: 12,
    marginBottom: responsiveHeight(1.5),
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },

  gradientCard: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    backgroundColor: '#fff', // Fallback for gradient
  },

  infoSection: {
    flex: 3,
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 8,
    marginBottom: responsiveHeight(0.8),
    flexWrap: 'wrap',
  },
  datePadding: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: 'cyan',
    // marginLeft: 70,
    marginLeft: responsiveWidth(16),
  },
  columnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 12,
    marginRight: responsiveWidth(3),
  },

  // iconSpacing: {
  //   marginLeft: 16,
  // },
  actionSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusBadge: {
    alignSelf: 'flex-start',
    // marginTop: 4,
    // paddingVertical: 4,
    // paddingHorizontal: 10,

    marginTop: responsiveHeight(0.5),
    paddingVertical: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(2.5),

    borderRadius: 5,
  },

  badgeText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
  },

  actionButtons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },

  iconButton: {
    backgroundColor: '#FF6A00',
    borderRadius: 20,
    // padding: 8,
    padding: responsiveWidth(2),
    elevation: 4,
  },

  disabledButton: {
    backgroundColor: '#E0E0E0',
  },
  dlodButton: {
    backgroundColor: '#4d5154',
    borderRadius: 10,
    // padding: 8,
    padding: responsiveWidth(2),
    elevation: 4,
  },
  // ---------
  addclaimContainer: {
    width: '100%',
    paddingHorizontal: 15,
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  addClaimButton: {
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  addClaimGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 8,
    // paddingHorizontal: 10,
    height: 40,
    width: 130,

    borderRadius: 10,
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  addText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
    // marginLeft: 8,
    marginLeft: responsiveWidth(2),
    letterSpacing: 0.5,
  },
  taskList: {
    // padding: 15,
    padding: responsiveHeight(1.5),
  },
  infoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 3,
    marginLeft: 8,
  },
  infoText2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 3,
    // marginLeft: 8,
  },
  // modal style props
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalHeader: {
    // paddingVertical: 20,
    // paddingHorizontal: 15,
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(1.5),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    letterSpacing: 1,
  },
  modalBody: {
    flex: 1,
    // padding: 20,
    padding: responsiveWidth(4.5),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 15,
    marginBottom: responsiveHeight(1),
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    // marginVertical: 10,
    marginVertical: responsiveHeight(1.3),
  },
  closeButton: {
    backgroundColor: '#FF6A00',
    borderRadius: 50,
    // paddingVertical: 12,
    paddingVertical: responsiveHeight(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 20,
    // marginBottom: 20,
    marginHorizontal: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    letterSpacing: 1,
  },

  // Status Badge Styling
  modalStatusBadge: {
    // paddingVertical: 5,
    // paddingHorizontal: 10,
    paddingVertical: responsiveHeight(0.5),
    paddingHorizontal: responsiveWidth(2.5),

    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBadgeText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
  },

  // Multiline Remarks Styling
  remarksText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    // marginTop: 5,
    // marginTop: responsiveHeight(0.5),
    lineHeight: 22,
    maxHeight: 100,
    overflow: 'hidden',
    textAlignVertical: 'top',
  },
});


  // const requestStoragePermission = async () => {
  //   if (Platform.OS === 'android' && Platform.Version < 30) {
  //     // Only needed for Android 9 or lower
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'Storage Permission Required',
  //           message: 'This app needs access to your storage to download files.',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err) {
  //       console.warn(err);
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  // // const downloadDocument = async () => {
  // //   if (!selectedClaim) {
  // //     Alert.alert('Error', 'No claim selected for download.');
  // //     return;
  // //   }

  // //   try {
  // //     const hasPermission = await requestStoragePermission();
  // //     if (!hasPermission) {
  // //       Alert.alert(
  // //         'Permission Denied',
  // //         'Storage permission is required to download files.',
  // //       );
  // //       return;
  // //     }

  // //     const getUserData = await getData('userData');
  // //     const LoginUserID = getUserData?.LoginUserID;

  // //     const payload = {
  // //       ClaimID: 89,
  // //       ClaimDocumentID: 0,
  // //       LoginUserID: LoginUserID,
  // //     };

  // //     console.log('Download Payload:', payload);

  // //     // Dispatching the action to download file
  // //     const response = await dispatch(DownloadClaimDocumentThunk({payload}));

  // //     if (response?.payload?.fileUrl) {
  // //       const fileUrl = response.payload.fileUrl; // Ensure API returns a valid file URL
  // //       const fileName = `claim_${selectedClaim.ClaimID}.pdf`; // Adjust based on file type

  // //       const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;
  // //       console.log('Downloading to:', downloadDest);

  // //       const downloadOptions = {
  // //         fromUrl: fileUrl,
  // //         toFile: downloadDest,
  // //         background: true,
  // //         progress: res => {
  // //           const progressPercent =
  // //             (res.bytesWritten / res.contentLength) * 100;
  // //           console.log(`Download Progress: ${progressPercent.toFixed(2)}%`);
  // //         },
  // //       };

  // //       const downloadResult = await RNFS.downloadFile(downloadOptions).promise;

  // //       if (downloadResult.statusCode === 200) {
  // //         Alert.alert('Success', `File downloaded to ${downloadDest}`);
  // //       } else {
  // //         Alert.alert('Error', 'File download failed.');
  // //       }
  // //     } else {
  // //       Alert.alert('Error', 'Invalid file URL received.');
  // //     }
  // //   } catch (error) {
  // //     console.error('Download Error:', error);
  // //     Alert.alert('Error', 'Failed to download document.');
  // //   }
  // // };

  // const downloadDocument = async () => {
  //   if (!selectedClaim) {
  //     Alert.alert('Error', 'No claim selected for download.');
  //     return;
  //   }

  //   try {
  //     const hasPermission = await requestStoragePermission();
  //     if (!hasPermission) {
  //       Alert.alert(
  //         'Permission Denied',
  //         'Storage permission is required to download files.',
  //       );
  //       return;
  //     }

  //     const getUserData = await getData('userData');
  //     const LoginUserID = getUserData?.LoginUserID;

  //     const payload = {
  //       ClaimID: 89, // Possible typo: should it be "ClaimID"?
  //       ClaimDocumentID: 0,
  //       LoginUserID: LoginUserID,
  //     };

  //     console.log('Download Payload:', payload);

  //     const response = await dispatch(DownloadClaimDocumentThunk({payload}));

  //     if (response?.payload) {
  //       // Convert blob to base64
  //       const reader = new FileReader();
  //       reader.onloadend = async () => {
  //         const base64data = reader.result.split(',')[1];

  //         // Define the file path
  //         const downloadDir =
  //           Platform.OS === 'android'
  //             ? RNFS.DownloadDirectoryPath
  //             : RNFS.DocumentDirectoryPath;
  //         const filePath = `${downloadDir}/downloaded_file.png`;

  //         await RNFS.writeFile(filePath, base64data, 'base64');

  //         Alert.alert('Success', `File downloaded to: ${filePath}`);
  //       };

  //       reader.readAsDataURL(response.payload);
  //     } else {
  //       Alert.alert('Error', 'File download failed.');
  //     }
  //   } catch (error) {
  //     console.error('Download Error:', error);
  //     Alert.alert('Error', 'Failed to download document.');
  //   }
  // };


  // const handleDownloadFile = async () => {
  
    //   try {
    //     // Request permission for Android devices
    //     if (Platform.OS === 'android') {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //       );
    //       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
    //         Alert.alert(
    //           'Permission Denied',
    //           'Storage permission is required to download files.',
    //         );
    //         return;
    //       }
    //     }
  
    //     const getUserData = await getData('userData');
    //     const LoginUserID = getUserData?.LoginUserID;
  
    //     const payload = {
    //       ClaimID: 89, // Possible typo: should it be "ClaimID"?
    //       ClaimDocumentID: 0,
    //       LoginUserID: LoginUserID,
    //     };
    //     const filePath = await dispatch(
    //       DownloadClaimDocumentThunk({payload}),
    //     ).unwrap();
  
    //     Alert.alert('Download Complete', `File saved to: ${filePath}`);
    //   } catch (error) {
    //     Alert.alert('Download Failed', error.message);
    //   }
    // };


      // const handleDownloadFile = async () => {
      //   try {
      //     const hasPermission = await requestStoragePermission();
      //         if (!hasPermission) {
      //           Alert.alert('Permission Denied', 'Storage permission is required.');
      //           return;
      //         }
    
      //     const getUserData = await getData('userData');
      //     const LoginUserID = getUserData?.LoginUserID;
    
      //     const payload = {
      //       ClaimID: 89,
      //       ClaimDocumentID: 0,
      //       LoginUserID: LoginUserID,
      //     };
    
      //     const response = await dispatch(DownloadClaimDocumentThunk({payload}));
    
      //     if (response.payload) {
      //       const blob = response.payload;
    
      //       // Convert blob to base64
      //       const reader = new FileReader();
      //       reader.readAsDataURL(blob);
      //       reader.onloadend = async () => {
      //         const base64Data = reader.result.split(',')[1];
    
      //         // Define file path
      //         const path = `${RNFS.DocumentDirectoryPath}/downloaded_document.png`;
    
      //         // Write file
      //         await RNFS.writeFile(path, base64Data, 'base64');
    
      //         Alert.alert('Success', 'File downloaded successfully.');
    
      //         console.log('File saved at:', path);
      //       };
      //     } else {
      //       console.error('No file received');
      //     }
      //   } catch (error) {
      //     console.error('File download error:', error);
      //     Alert.alert('Error', 'File download failed.');
      //   }
      // };
    
      // const handleDownloadFile = async () => {
      //   try {
      //     const hasPermission = await requestStoragePermission();
      //     if (!hasPermission) {
      //       Alert.alert('Permission Denied', 'Storage permission is required.');
      //       return;
      //     }
    
      //     const getUserData = await getData('userData');
      //     const LoginUserID = getUserData?.LoginUserID;
    
      //     const payload = {
      //       ClaimID: 89,
      //       ClaimDocumentID: 0,
      //       LoginUserID: LoginUserID,
      //     };
    
      //     const response = await dispatch(DownloadClaimDocumentThunk({ payload }));
    
      //     if (response.payload) {
      //       const blob = response.payload;
      //       const base64Data = await blobToBase64(blob); // Convert Blob to Base64
    
      //       const fileType = blob.type || 'application/pdf';
      //       const extension = fileType.split('/')[1] || 'pdf';
    
      //       const fileName = `downloaded_document.${extension}`;
      //       const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    
      //       await RNFS.writeFile(path, base64Data, 'base64');
      //       Alert.alert('Download Complete', `File saved at: ${path}`);
      //       console.log(`FileSavedLocation:${path}`)
      //     } else {
      //       console.error('No file received');
      //     }
      //   } catch (error) {
      //     console.error('File download error:', error);
      //     Alert.alert('Error', 'File download failed.');
      //   }
      // };
    
      // const handleDownloadFile = async () => {
      //   try {
      //     const hasPermission = await requestStoragePermission();
      //     if (!hasPermission) {
      //       Alert.alert('Permission Denied', 'Storage permission is required.');
      //       return;
      //     }
    
      //     const getUserData = await getData('userData');
      //     const LoginUserID = getUserData?.LoginUserID;
    
      //     const payload = {
      //       ClaimID: 89,
      //       ClaimDocumentID: 0,
      //       LoginUserID: LoginUserID,
      //     };
    
      //     const response = await dispatch(DownloadClaimDocumentThunk({ payload }));
    
      //     if (response.payload) {
      //       const blob = response.payload;
    
      //       // Convert Blob to Base64
      //       const base64Data = await blobToBase64(blob);
    
      //       // Detect File Type and Extension
      //       const fileType = blob.type || 'application/pdf'; // Default to PDF if unknown
      //       const extension = fileType.split('/')[1] || 'pdf'; // Extract extension
    
      //       // Define File Name
      //       const fileName = `downloaded_document.${extension}`;
      //       const savePath = Platform.OS === 'ios'
      //         ? `${RNFS.DocumentDirectoryPath}/${fileName}` // iOS storage
      //         : `${RNFS.DownloadDirectoryPath}/${fileName}`; // Android storage
    
      //       // Save File to Storage
      //       await RNFS.writeFile(savePath, base64Data, 'base64');
    
      //       Alert.alert('Download Complete', `File saved at: ${savePath}`);
      //       console.log('File saved at:', savePath);
      //     } else {
      //       console.error('No file received');
      //     }
      //   } catch (error) {
      //     console.error('File download error:', error);
      //     Alert.alert('Error', 'File download failed.');
      //   }
      // };
    
      // const handleDownloadFile = async () => {
      //   try {
      //     //  Request Storage Permission (Android 13+)
      //     const hasPermission = await requestStoragePermission();
      //     if (!hasPermission) {
      //       Alert.alert('Permission Denied', 'Storage permission is required.');
      //       return;
      //     }
    
      //     //  Fetch User Data
      //     const getUserData = await getData('userData');
      //     const LoginUserID = getUserData?.LoginUserID;
    
      //     const payload = {
      //       ClaimID: 89,
      //       ClaimDocumentID: 0,
      //       LoginUserID: LoginUserID,
      //     };
    
      //     //  Call API to Download File
      //     const response = await dispatch(DownloadClaimDocumentThunk({ payload }));
    
      //     if (response.payload) {
      //       const blob = response.payload;
    
      //       //  Extract File Name & Extension
      //       let fileName = 'downloaded_file';
      //       let extension = '';
    
      //       //  Check Content-Disposition Header (Best method)
      //       const contentDisposition = response.meta?.headers?.['content-disposition'];
      //       if (contentDisposition) {
      //         const match = contentDisposition.match(/filename="(.+?)"/);
      //         if (match) {
      //           fileName = match[1]; // Use actual filename from API
      //           extension = fileName.split('.').pop(); // Get file extension
      //         }
      //       }
    
      //       //  Fallback: Use MIME Type if No Filename
      //       if (!extension) {
      //         const fileType = blob.type || 'application/pdf'; // Default to PDF
      //         extension = fileType.split('/')[1] || 'pdf';
      //         fileName = `downloaded_file.${extension}`;
      //       }
    
      //       //  Define Save Path (Android & iOS)
      //       const path = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    
      //       //  Convert Blob to Base64
      //       const base64Data = await blobToBase64(blob);
    
      //       //  Write File
      //       await RNFS.writeFile(path, base64Data, 'base64');
    
      //       Alert.alert('Download Complete', `File saved at: ${path}`);
      //       console.log('File saved at:', path);
      //     } else {
      //       console.error('No file received');
      //     }
      //   } catch (error) {
      //     console.error('File download error:', error);
      //     Alert.alert('Error', 'File download failed.');
      //   }
      // };