/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { DefaultTheme } from 'react-native-paper';
import ViewProfileScreen from './src/Screens/ViewProfileScreen';
import QRScannerScreen from './src/Screens/QRScannerScreen';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store/store';
import { PersistGate } from 'redux-persist/es/integration/react'
import InitialNavigation from './src/navigation/InitialNavigation';

DefaultTheme.mode = 'light';
DefaultTheme.colors.primary = '#008080';
DefaultTheme.colors.accent = '#FFC107';
DefaultTheme.colors.background = '#F5F5F5';


const Stack = createStackNavigator()

const App = () => {

  useEffect(() => {
    requestCameraPermission().then(result => {
      if (result) {
        console.log("Permission Granted")
      }

    }).catch(e => {

    })
  }, [])

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.CAMERA
        ]

      );
      console.log(granted)
      if (granted["android.permission.CAMERA"] === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      } else {
        return false
      }
    } catch (err) {
      return false
    }
  };

  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <PaperProvider>
          <InitialNavigation/>
        </PaperProvider>
      </PersistGate>
    </Provider>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
