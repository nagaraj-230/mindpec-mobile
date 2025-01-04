import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from './src/Screens/Login/LoginScreen';
import DashBoardScreen from './src/Screens/Dashboard/DashBoardScreen';
import TaskListScreen from './src/Screens/TaskList/TaskListScreen';
import TaskListInfoScreen from './src/Screens/TaskListInfo/TaskListInfoScreen';
import ClaimsList from './src/Screens/Claims/ClaimsList';
import AddClaimScreen from './src/Screens/AddClaims/AddClaimScreen';
import {persistor, store} from './src/Store/Store';
import {getData} from './src/Utils/localHelper';
import TaskHistoryScreen from './src/Screens/TaskHistory/TaskHistoryScreen';
import {PersistGate} from 'redux-persist/integration/react';
import LoadingComponent from './src/Components/LoadingComponent';
import {setLoginData} from './src/Services/LoginService/LoginSlice';
import CatogriesScreen from './src/Screens/Catogeroies/CatogoriesScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator (RootDrawer)
const RootDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Task List" component={TaskListScreen} />
      {/* You can add more screens here, e.g. Profile */}
    </Drawer.Navigator>
  );
};

// Stack Navigator (RootStack)
const RootStack = ({isLoggedIn}) => {
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'dashboard' : 'login'}>
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="dashboard"
        component={DashBoardScreen}
        options={{headerShown: false}}
      />
       {/* <Stack.Screen
        name="catoscreen"
        component={CatogriesScreen}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="tasklistscreen"
        component={TaskListScreen} 
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="tasklistsinfoscreen"
        component={TaskListInfoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="claims"
        component={ClaimsList}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="addclaims"
        component={AddClaimScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="taskhistoryscreen"
        component={TaskHistoryScreen}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
        name="tasklistscreen"
        component={RootDrawer} // Use RootDrawer inside the stack for nested navigation
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="drawer"
        component={RootDrawer}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const token = await getData('token');
        const user = await getData('user');

        if (token && user) {
          // Dispatch data to Redux
          store.dispatch(setLoginData({token, user}));
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error during initialization:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootStack isLoggedIn={isLoggedIn} />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
