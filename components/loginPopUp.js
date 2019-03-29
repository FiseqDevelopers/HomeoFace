import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, SafeAreaView, Alert, TextInput, Button, AsyncStorage} from 'react-native';
import { styles } from './block';
import { LoginModel } from '../models';

export default class LogInPopUp extends React.Component {
  state = {
    modalVisible: true,
  };

  componentWillMount() {
    console.warn(this.props.visible);
    this.setState({modalVisible: this.props.visible});
  }

  setModalVisible() {
    if(this.state.modalVisible){
      this.setState({modalVisible: false});
    } else {
      this.setState({modalVisible: true});
    }
  }

  async login() {

    console.warn(user, password);

    var uuid = require('react-native-uuid');
    var loginModel = new LoginModel();
    loginModel.email = 'safakkizkin@gmail.com';
    loginModel.password = 'Safak981*-';
    try{
      let response = await fetch("https://api.homeocure.net/homeo/login/loginuser", {
        method: 'POST',
        headers: {
            'Authorization': 'Basic 0Tr0V+XwnVjhu26UIJim0Tr0Xw0kjydyd26U26Q7G6LQgxwVEC', //'Basic': '0Tr0V+XwnVjhu26UIJim0Tr0Xw0kjydyd26U26Q7G6LQgxwVEC',
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginModel),
      });
      if(response.ok) {
        await AsyncStorage.setItem('@HomeoFace:user', loginModel.email);
        await AsyncStorage.setItem('@HomeoFace:password', loginModel.password);
        console.warn('kayıt başarılı.');
      }
    } catch(error) {
      console.error(error);
    }
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={{backgroundColor: 'transparent', alignItems: 'center',justifyContent: 'center', flex:1}}>
          <View style={{backgroundColor: 'white', alignItems: 'center',justifyContent: 'center', width: '75%', height: '50%'}}>
            <View style={{alignItems: 'center',justifyContent: 'center', flex:1}}>
                <Text style={{color: '#9A9A9A', fontSize: 34}}>HomeoFace</Text>
            </View>
            <View style={{alignItems: 'center', flex:2}}>
              <TextInput placeholder = "Kullanıcı Adı:" style={{backgroundColor: '#EFEFEF', borderRadius: 10, width:'50%', fontSize: 21, padding: 7, margin:10}}/>
              <TextInput placeholder = "Şifre:" style={{backgroundColor: '#EFEFEF', borderRadius: 10, width:'50%', fontSize: 21, padding: 7}}/>
            </View>
            <View style={{alignItems: 'center', flex:2}}>
              <Button title='test' 
                onPress={() => {
                  this.login()
                }} />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}