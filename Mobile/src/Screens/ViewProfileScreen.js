import { Image, Modal, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { Avatar, Button } from 'react-native-paper'
import axios from 'axios'
import { connect } from 'react-redux'
import { userLogin, userLogout } from '../redux/action/userAction'

class ViewProfileScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isVerfied: true,
            visible: false,
            userDetails: null
        }
    }

    componentDidMount() {
        this.getUserDetails()
    }

    getUserDetails = async () => {
        let url = BASE_URL + 'Mobile/GetUserDetailsForProfile'

        const res = await axios
            .get(url)
            .then((res) => {
                if (res.data.statusCode === 'Success') {
                    this.setState({ userDetails: res.data.data })
                }
            })
            .catch(() => { });
    };

    renderAlert = () => {
        return (
            <Modal
                style={{
                    position: "absolute",
                    height: "100%",
                    width: "100%",
                    zIndex: 10,
                    flex: 1,
                }}
                animationType="fade"
                onRequestClose={() => this.setState({ visible: false })}
                visible={this.state.visible} transparent>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../Assests/success.gif')} style={{ elevation: 5, width: 150, height: 150 }} />
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }}>
                            <Text style={{ color: '#000', fontSize: 22, fontWeight: '900' }}>Successfully Verified</Text>
                        </View>
                        <View style={{ width: '100%', alignItems: "center", paddingTop: 20, paddingBottom: 20 }}>
                            <Button
                                onPress={() => {
                                    this.setState({ visible: false })
                                }} labelStyle={{ fontSize: 18 }} style={{ padding: 5 }} icon={"check"} buttonColor="rgb(13, 71, 161)" textColor="#fff">OK</Button>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }

    onVerifyQrCode = async () => {
        let url = BASE_URL + 'Mobile/UpdateVerifyStatus'
        let params = {
            "userID": Number(this.state.userDetails.userID),
            "userType": Number(this.props.user.userType)
        }

        const res = await axios
            .post(url, params)
            .then((res) => {
                if (res.data.statusCode === 'Success') {
                    this.getUserDetails()
                }
                else {
                    ToastAndroid.show("Error while verifing", ToastAndroid.SHORT)
                }
            })
            .catch(() => {
                ToastAndroid.show("Error while verifing", ToastAndroid.SHORT)

            });
    }



    render() {
        return (
            <ScrollView style={{
                flex: 1,
                width: "100%",
                height: "100%",
                backgroundColor: "rgb(236, 239, 241)",
            }}

            >
                <View style={{ width: '100%', alignItems: "flex-end", paddingTop: 20, paddingEnd: 20 }}>
                    <Button
                        onPress={() => {
                            this.props.userLogout()
                        }} labelStyle={{ fontSize: 18 }} style={{ padding: 5 }} icon={"logout"} buttonColor="rgb(255, 23, 68)" textColor="#fff">Logout</Button>
                </View>
                <View style={{ width: '100%', alignItems: 'center', paddingTop: 20, zIndex: 4000, elevation: 50 }}>
                    <Avatar.Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png' }} style={{ elevation: 5 }} size={120} />
                </View>
                <View style={{ backgroundColor: '#fff', alignItems: 'center', marginTop: -60, paddingTop: 80, marginHorizontal: 20, paddingBottom: 25, borderRadius: 20, elevation: 5, marginBottom: 10 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#000' }}>{this.state.userDetails?.name}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, color: 'rgb(230, 81, 0)' }}>{this.state.userDetails?.address}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, color: 'rgb(230, 81, 0)' }}>{this.state.userDetails?.email}</Text>
                    {/* <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 40 }}>
                        <TouchableOpacity onPress={() => this.onPressPhoneNumber(`tel:${this.props.route.params.number}`, "Phone")}>
                            <Image source={require('../assets/images/phone-call.png')} style={{ height: 45, width: 45 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onPressPhoneNumber(`sms:${this.props.route.params.number}?body=`, "Message")}>
                            <Image source={require('../assets/images/comments.png')} style={{ height: 45, width: 45 }} />

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.onPressPhoneNumber(`mailto:${this.props.route.params.email}`, "Mail")}>
                            <Image source={require('../assets/images/email.png')} style={{ height: 45, width: 45 }} />

                        </TouchableOpacity>

                    </View> */}
                </View>
                <View style={{ flexDirection: 'row', width: '100%', paddingTop: 30, justifyContent: 'space-around' }}>
                    <Button
                        onPress={() => {
                            if (this.state.userDetails?.verifyStatus === 1) {
                                this.props.navigation.navigate("QRScannerScreen", {
                                    onGoBack: (data) => {
                                        if (data === this.state.userDetails?.verifyCode) {
                                            this.setState({
                                                isVerfied: !this.state.isVerfied,
                                                visible: true
                                            })
                                            this.onVerifyQrCode()
                                        }
                                        else {
                                            ToastAndroid.show("Incorrect QR tag, please try again with valid qr", ToastAndroid.SHORT)

                                        }

                                    }
                                })
                            }

                        }}
                        labelStyle={{ fontSize: 20, fontWeight: '700' }} contentStyle={{ height: 60 }} style={{ width: '50%' }} icon={this.state.userDetails?.verifyStatus === 2 ? "sticker-check-outline" : "sticker-alert-outline"} buttonColor={this.state.userDetails?.verifyStatus === 2 ? "rgb(0, 230, 118)" : "rgb(251, 192, 45)"} textColor="#fff">{this.state.userDetails?.verifyStatus === 2 ? "Verified" : "Verify Me"}</Button>
                    {/* <Button === 1
                        onPress={() => {
                            this.props.navigation.navigate('EditUserInfoScreen', this.props.route.params)
                        }} labelStyle={{ fontSize: 18 }} style={{ padding: 5 }} icon={"circle-edit-outline"} buttonColor="rgb(13, 71, 161)" textColor="#fff">Edit</Button> */}
                </View>
                {this.renderAlert()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 8,
        borderColor: "#DAE3EC",
        borderWidth: 1.3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})

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
        userLogin: (token, isLoginSuccess) => dispatch(userLogin(token, isLoginSuccess)),
        userLogout: () => dispatch(userLogout()),
    };
};



// Exports
export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileScreen);