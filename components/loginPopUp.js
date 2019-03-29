import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, SafeAreaView, Alert, TextInput, Button} from 'react-native';
import { styles } from './block';
import { LoginModel } from '../models';

export default class LogInPopUp extends React.Component {
  state = {
    modalVisible: true,
  };

  setModalVisible() {
    if(this.state.modalVisible){
      this.setState({modalVisible: false});
    } else {
      this.setState({modalVisible: true});
    }
  }

  async login() {
    var uuid = require('react-native-uuid');
    var loginModel = new LoginModel();
    
    try{
      let response = await fetch("https://api.homeocure.net/homeo/login/loginuser", {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginModel),
      });
      console.warn(response);
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