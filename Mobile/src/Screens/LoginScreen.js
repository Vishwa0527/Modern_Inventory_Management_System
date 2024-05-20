import { Dimensions, Image, ScrollView, Text, ToastAndroid, View } from 'react-native'
import React, { Component } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import { BASE_URL } from '../Constant'
import { connect } from 'react-redux'
import { userLogin } from '../redux/action/userAction'

class LoginScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: ""

        }
    }

    onLogin = async () => {

        if (this.state.password.length === 0 || this.state.username.length === 0) {
            ToastAndroid.show("Username and Password is required", ToastAndroid.SHORT)
            return
        }

        const newLogin = {
            username: this.state.username,
            password: this.state.password
        }

        if (this.state.username === "audit" && this.state.password === "12345") {
            this.props.userLogin(newLogin, true)
            return
        }
        else {
            ToastAndroid.show("Incorrect Username or Password", ToastAndroid.SHORT);
            return
        }

        // const newLogin = {
        //     username: this.state.username,
        //     password: this.state.password
        // }
        // let url = BASE_URL + 'User/Login'

        // try {
        //     const response = await axios.post(url, newLogin);
        //     if(response.status === 200 && response.data > 0){
        //         this.props.userLogin(response.data, true)
        //     }
        //     else{
        //         ToastAndroid.show("Incorrect Username or Password", ToastAndroid.SHORT);
        //     }
        //     console.log(response.data, "------------------------------------------------")

        // } catch (error) {
        //     console.log('Error fetching data:', error, url);
        // }
    }


    render() {
        return (
            <View style={{ flex: 1, width: "100%", height: "100%", backgroundColor: "#fff" }}>
                <ScrollView>
                    <View style={{ backgroundColor: 'rgba(41, 121, 255, 0.7)', width: '100%', height: (Dimensions.get("window").height / 2) - 100, borderBottomStartRadius: 50, borderBottomEndRadius: 50, alignItems: 'center', marginTop: 25 }}>
                        <Image style={{ width: '100%', height: (Dimensions.get("window").height / 2) - 40 }} source={require("../Assests/mims.jpg")} />
                    </View>
                    <View style={{ width: '100%', alignItems: "center", justifyContent: "center", marginTop: -25 }}>
                        <View style={{ width: '85%', padding: 20, backgroundColor: "rgba(236, 239, 241, 0.7)", borderRadius: 16 }}>
                            <Text style={{ color: "#183351", fontSize: 25, textAlign: 'center', fontWeight: "800" }}>WELCOME</Text>
                            <Text style={{ color: "#183351", fontSize: 25, textAlign: 'center', fontWeight: "800" }}>TO</Text>
                            <Text style={{ color: "#183351", fontSize: 35, textAlign: 'center', fontWeight: "800", marginBottom: 20 }}>AUDIT</Text>
                            <TextInput
                                label="User Name"
                                value={this.state.username}
                                onChangeText={text => this.setState({ username: text })}
                                style={{ marginBottom: 15, backgroundColor: '#fff', color: "#000" }}
                                mode='outlined'
                                outlineColor="rgb(187, 222, 251)"
                                activeOutlineColor="rgb(25, 118, 210)"
                                textColor='#000'
                            />
                            <TextInput
                                label="Password"
                                value={this.state.password}
                                onChangeText={text => this.setState({ password: text })}
                                style={{ marginBottom: 30, backgroundColor: '#fff', color: "#000" }}
                                mode='outlined'
                                outlineColor="rgb(187, 222, 251)"
                                activeOutlineColor="rgb(25, 118, 210)"
                                textColor='#000'
                                secureTextEntry
                            />
                            <Button icon="key" style={{ marginBottom: 10 }} mode="contained" buttonColor='#183351' textColor='#fff' onPress={() => this.onLogin()}>
                                Login
                            </Button>
                        </View>
                    </View>
                    

                </ScrollView>

            </View>
        )
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
        user: state.userReducer
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);