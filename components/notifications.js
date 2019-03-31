import React from 'react';
import Block from './block';
import Card from './card'
import { theme } from '../constants';
import { Text, ScrollView, StyleSheet, View, SafeAreaView, Platform, TouchableOpacity, AsyncStorage } from 'react-native' 
import DeviceInfo from 'react-native-device-info';
import { LogoutModel } from '../models';
import Moment from 'moment';

export default class Notifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listOfData: []
        }
    }

    async componentDidMount() {
        //console.warn(this.state.listOfData);
        const getList = await AsyncStorage.getItem('@HomeoFace:sendingList');

        var l = JSON.parse(getList);
        console.warn(l);
        l.map((item) => {
            this.setState({listOfData:[...this.state.listOfData, item]});
        })
        //this.setState({listOfData: getList});
    }

    async logOut() {
      try{
        var logoutModel = new LogoutModel(); 
        logoutModel.id = DeviceInfo.getDeviceId();
        console.warn(DeviceInfo.getAPILevel());
        // let response = await fetch("https://api.homeocure.net/homeo/login/loginout", {
        //   method: 'POST',
        //   headers: {
        //       'Authorization': 'Basic 0Tr0V+XwnVjhu26UIJim0Tr0Xw0kjydyd26U26Q7G6LQgxwVEC', //'Basic': '0Tr0V+XwnVjhu26UIJim0Tr0Xw0kjydyd26U26Q7G6LQgxwVEC',
        //       Accept: 'application/json',
        //       'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(logoutModel),
        // });
        // if(response.ok) {
        //   await AsyncStorage.removeItem('@HomeoFace:user');
        //   await AsyncStorage.removeItem('@HomeoFace:password');
        //   this.setState({modalVisible: true});
        // }else {
        //     this.setState({alreadPressed: false});
        // }
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
                    <ScrollView style={styles.rewards} showsVerticalScrollIndicator={false}>
                    
                    {
                        this.state.listOfData.map((item) => {
                            return (
                                <Card shadow key={item.guid_id}>
                                    <Block>
                                         <Text>{Moment(item.date).format('L h:mm')}</Text>
                                    </Block>
                                </Card>
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
      padding: theme.sizes.padding,
      backgroundColor: theme.colors.gray2,
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