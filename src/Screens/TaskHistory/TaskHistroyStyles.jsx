import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from 'react-native-responsive-dimensions';
import { colors } from '../../Assets/colors'

export const styles = StyleSheet.create({
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
  