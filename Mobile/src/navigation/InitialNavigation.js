import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { userLogin } from '../redux/action/userAction';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import ViewProfileScreen from '../Screens/ViewProfileScreen';
import QRScannerScreen from '../Screens/QRScannerScreen';
import Dashboard from '../Screens/Dashboard';
const Stack = createStackNavigator()
// const Drawer = createDrawerNavigator();

class InitialNavigation extends Component {
    render() {
        if(this.props.userDetails.user !== null && this.props.userDetails.isLoginSuccess){
            return (
                <NavigationContainer>
                    <Stack.Navigator headerMode="none">
                        <Stack.Screen name='Dashboard' component={Dashboard} />
                        <Stack.Screen name='QRScannerScreen' component={QRScannerScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            )
        }
        else{
            return (
                <NavigationContainer>
                    <Stack.Navigator headerMode="none">
                        <Stack.Screen name='LoginScreen' component={LoginScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            )
        }

    }
}


// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
        userDetails: state.userReducer
    }
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        userLogin: (token, isLoginSuccess) => dispatch(userLogin(token, isLoginSuccess))
    };
};



// Exports
export default connect(mapStateToProps, mapDispatchToProps)(InitialNavigation);