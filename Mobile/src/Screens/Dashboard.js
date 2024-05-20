import { Text, View, ScrollView } from 'react-native'
import React, { Component } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Button, Card, Divider } from 'react-native-paper'

export default class Dashboard extends Component {
    render() {
        return (
            <View style={{ flex: 1, position: "absolute", width: "100%", height: "100%", backgroundColor: '#F4F6F8' }}>
                <View>
                    <View style={{ marginVertical: 10, flexDirection: 'row', }}>
                        <Ionicons color="#000" size={36} style={{ marginLeft: 18 }} name={"menu"} />

                    </View>
                    <Divider />
                </View>
                <ScrollView style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgb(236, 239, 241)",
                }}

                >
                    <View style={{ width: '100%', paddingTop: 10, paddingHorizontal: 20 }}>
                        <Text style={{ color: "#000", fontSize: 23}}>Hello</Text>
                        <Text style={{ color: "#000", fontSize: 20}}>Auditors,</Text>
                        <Card style={{ justifyContent: 'center', backgroundColor: "#183351", padding: 15, marginTop: 20}}>
                            <Card.Title title={"Audit"} titleStyle={{ fontSize: 25, fontWeight: '900', textAlign: 'center', color: '#fff'}}/>
                            <Button style={{ backgroundColor: '#fff', marginBottom: 25, marginTop: 5, marginHorizontal: 25}} textColor='#183351' onPress={() => this.props.navigation.navigate("QRScannerScreen")}>Do Audit</Button>
                        </Card>
                        <Card style={{ justifyContent: 'center', backgroundColor: "#183351", padding: 15, marginTop: 20}}>
                            <Card.Title title={"Reports"} titleStyle={{ fontSize: 25, fontWeight: '900', textAlign: 'center', color: '#fff'}}/>
                            <Button style={{ backgroundColor: '#fff', marginTop: 10, marginHorizontal: 25}} textColor='#183351'>Audit History</Button>
                            <Button style={{ backgroundColor: '#fff', marginTop: 15, marginHorizontal: 25}} textColor='#183351'>Latest Audit</Button>
                            <Button style={{ backgroundColor: '#fff', marginBottom: 25, marginTop: 15, marginHorizontal: 25}} textColor='#183351'>Stock Comparison</Button>
                        </Card>
                        <Card style={{ justifyContent: 'center', backgroundColor: "#183351", padding: 15, marginTop: 20}}>
                            <Card.Title title={"System Stock"} titleStyle={{ fontSize: 25, fontWeight: '900', textAlign: 'center', color: '#fff'}}/>
                            <Button style={{ backgroundColor: '#fff', marginTop: 10, marginHorizontal: 25}} textColor='#183351'>System Stock</Button>
                            <Button style={{ backgroundColor: '#fff', marginTop: 15, marginBottom: 25, marginHorizontal: 25}} textColor='#183351'>Stock History</Button>
                        </Card>
                    </View>
                </ScrollView>
            </View>

        )
    }
}