import { Text, StyleSheet, View, Linking, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

class QRScannerScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
        }
    }


    onReadData = (data) => {
        // this.props.route.params.onGoBack(data)
        this.props.navigation.goBack()
    }

  render() {
    return (
        <QRCodeScanner
        onRead={(e) => {this.onReadData(e.data)}}
        flashMode={RNCamera.Constants.FlashMode.off}
        showMarker={true}
        topViewStyle={{ width: "100%", backgroundColor: "black" }}
        cameraContainerStyle={{ backgroundColor: "black" }}
        topContent={
            <View style={{justifyContent: "flex-end", alignContent: "flex-end", marginVertical: "10%"}}>
                <Text style={styles.centerText}>
                    Focus Camera to QR code for scan
                </Text>
            </View>

        }
        bottomViewStyle={{ backgroundColor: "black" }}
    />
    )
  }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: 'white'
    },
    textBold: {
        fontWeight: '500',
        color: 'gray'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
});


export default QRScannerScreen