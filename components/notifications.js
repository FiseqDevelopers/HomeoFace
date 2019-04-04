import React from 'react';
import { Result, Card, Block } from '../components';
import { theme } from '../constants';
import { Text, RefreshControl, ScrollView, StyleSheet, View, SafeAreaView, Platform, TouchableOpacity, AsyncStorage, Alert } from 'react-native' 
import DeviceInfo from 'react-native-device-info';
import { LogoutModel } from '../models';
import Moment from 'moment';
import GetAllResultsModel from '../models/getAllResultsModel';

export default class Notifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listOfData: [],
            refreshing: false,
            resultId: 0,
            front_side: '',
            left_side: '',
            right_side: '',
            visible: false
        }
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.componentDidMount().then(() => {
        });
    }

    async componentDidMount() {
        this.setState({listOfData: []});
        const getList = await AsyncStorage.getItem('@HomeoFace:sendingList');
        var l = JSON.parse(getList);
        l.reverse().map((item) => {
            this.setState({listOfData:[...this.state.listOfData, item]});
        });

        this.setState({refreshing: false});
        //this.setState({listOfData: getList});
    }

    async openResult(id) {
        var user_id = new GetAllResultsModel(parseInt(await AsyncStorage.getItem('@HomeoFace:userId')), id);
        await fetch("http://api2.homeocure.net/api/homeo/getmaskedphotos", {
            method: 'POST',
            headers: {
                'Authorization': 'Basic 0Tr0V+XwnVjhu26UIJim0Tr0Xw0kjydyd26U26Q7G6LQgxwVEC', //'Basic': '0Tr0V+XwnVjhu26UIJim0Tr0Xw0kjydyd26U26Q7G6LQgxwVEC',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user_id),
        }).then((val) => {
            if(val.ok) {
                var onje = JSON.parse(val._bodyInit);
                this.setState({front_side: 'data:image/png;base64,'+onje[0].front_side});
                this.setState({left_side: 'data:image/png;base64,'+onje[0].left_side});
                this.setState({right_side: 'data:image/png;base64,'+onje[0].right_side});

                this.setState({visible: true});
                return;
            }
        });

        Alert.alert(
          'Dikkat',
          'Sonucunuz açıklandığında burada görünecektir.',
          [
            {
              text: 'İptal',
              style: 'cancel',
            },
            {text: 'Tamam'},
          ],
          {cancelable: false},
        );
        return;
    }

    async logOut() {
        await AsyncStorage.removeItem('@HomeoFace:sendingList');
        try{
            var logoutModel = new LogoutModel(); 
            logoutModel.id = DeviceInfo.getDeviceId();
            let response = await fetch("https://api.homeocure.net/homeo/login/loginout", {
                method: 'POST',
                headers: {
                    'Authorization': 'Basic 0Tr0V+XwnVjhu26UIJim0Tr0Xw0kjydyd26U26Q7G6LQgxwVEC', //'Basic': '0Tr0V+XwnVjhu26UIJim0Tr0Xw0kjydyd26U26Q7G6LQgxwVEC',
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logoutModel),
            });
            if(response.ok) {
                await AsyncStorage.removeItem('@HomeoFace:user');
                await AsyncStorage.removeItem('@HomeoFace:password');
                await AsyncStorage.removeItem('@HomeoFace:userId');
                this.setState({modalVisible: true});
            } else {
            this.setState({alreadPressed: false});
            }
        } catch(error) {
        console.error(error);
        }
    }

    render() {
        if(this.state.listOfData === null) {
            return (
                <SafeAreaView style={{flex: 1}}>
                    <View style={{height: 120, backgroundColor: Platform.OS === 'android' ? 'black' : 'white'}} >
                        <Text style={styles.notificationsText}>
                            Sonuçlar
                        </Text>
                        <View style={{right: 10, bottom: 5, position: 'absolute'}}>
                            <TouchableOpacity onPress={this.logOut.bind(this)}>
                                <Text style={styles.logOut}>Çıkış</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            )
        } else {
            return (
                <SafeAreaView style={{flex: 1}}>
                    <Result visible={this.state.visible} frontSide={this.state.front_side} leftSide={this.state.left_side} rightSide={this.state.right_side}></Result>
                    <View style={{height: 120, backgroundColor: Platform.OS === 'android' ? 'black' : 'white'}} >
                        <Text style={styles.notificationsText}>
                            Sonuçlar
                        </Text>
                        <View style={{right: 10, bottom: 5, position: 'absolute'}}>
                            <TouchableOpacity onPress={this.logOut.bind(this)}>
                                <Text style={styles.logOut}>Çıkış</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView 
                        style={styles.rewards}
                        refreshControl={
                            <RefreshControl style={{flex:0, position: 'absolute', top: 0, left:0, backgroundColor: 'transparent'}}
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            />
                        }
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{alignItems: 'center', marginTop: 10, justifyContent: 'center'}} >
                    {
                        this.state.listOfData.map((item) => {
                            return (
                                <TouchableOpacity key={item.guid_id} style={{width: '80%'}} onPress={this.openResult.bind(this, item.guid_id)}>
                                    <Card shadow>
                                    <Block>
                                         <Text>{Moment(item.date).format('L h:mm')}</Text>
                                    </Block>
                                </Card>
                                </TouchableOpacity>
                            )
                        })
                    }
                    </ScrollView>
                </SafeAreaView>
            )
        }
    }
}

const styles = StyleSheet.create({
    rewards: {
      backgroundColor: theme.colors.gray2
    },
    // horizontal line
    hLine: {
      marginVertical: theme.sizes.base * 1.5,
      height: 1,
    },
    // vertical line
    vLine: {
      marginVertical: theme.sizes.base / 2,
      width: 1,
    },
    notificationsText: {
      color: Platform.OS === 'android' ? 'white' : 'black',
      fontSize: 50,
      position: 'absolute',
      bottom: 5,
      marginLeft: 5
    },
    logOut: {
      color: Platform.OS === 'android' ? 'white' : 'black',
      fontSize: 15,
    }
  })