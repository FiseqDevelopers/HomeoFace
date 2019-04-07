import React, {Component} from 'react';
import {Modal, Text, View, Alert, TextInput, Button, AsyncStorage} from 'react-native';
import { LoginModel, RegisterModel } from '../models';
import DeviceInfo from 'react-native-device-info';

export default class LogInPopUp extends React.Component {
  state = {
    modalVisible: true,
    username: '',
    password: '',
    alreadyPressed: false
  };

  async componentDidMount() {
    this.setState({modalVisible: !this.props.isUserLoggedIn});
  }

  setModalVisible() {
    if(this.state.modalVisible){
      this.setState({modalVisible: false});
    } else {
      this.setState({modalVisible: true});
    }
  }

  async login() {
    this.setState({alreadyPressed: true});
    var loginModel = new LoginModel();
    loginModel.appBuild = DeviceInfo.getBuildNumber();
    loginModel.deviceName = DeviceInfo.getDeviceName();
    loginModel.id = DeviceInfo.getDeviceId();
    loginModel.model = DeviceInfo.getModel();
    loginModel.version = DeviceInfo.getVersion();
    loginModel.isDevice = !DeviceInfo.isEmulator();
    loginModel.email = this.state.username;
    loginModel.password = this.state.password;
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
        var tst = JSON.parse(response._bodyInit);
        await AsyncStorage.setItem('@HomeoFace:userId', tst.UserID.toString());
        await AsyncStorage.setItem('@HomeoFace:user', loginModel.email);
        await AsyncStorage.setItem('@HomeoFace:password', loginModel.password);
        this.setState({modalVisible: false});
      }
    } catch(error) {
      console.error(error);
    }

    this.setState({alreadyPressed: false});
  }

  async signup() {
    this.setState({alreadyPressed: true});
    if(!this.state.username || !this.state.password) {
      Alert.alert(
        'Dikkat',
        'Lütfen kayıt olmak için kullanıcı adı ve şifrenizi giriniz.',
        [
          {
            text: 'İptal',
            style: 'cancel',
          },
          {text: 'Tamam'},
        ],
        {cancelable: false},
      );
    } else {
      var registerModel = new RegisterModel();
      registerModel.fullName = this.state.username;
      registerModel.email = this.state.username;
      registerModel.password = this.state.password;

      try{
        let response = await fetch("https://api.homeocure.net/homeo/login/registeruser", {
          method: 'POST',
          headers: {
              'Authorization': 'Basic 0Tr0V+XwnVjhu26UIJim0Tr0Xw0kjydyd26U26Q7G6LQgxwVEC', //'Basic': '0Tr0V+XwnVjhu26UIJim0Tr0Xw0kjydyd26U26Q7G6LQgxwVEC',
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerModel),
        });
        
        if(response.ok) {
          var tst = JSON.parse(response._bodyInit);
          await AsyncStorage.setItem('@HomeoFace:userId', tst.UserID.toString());
          await AsyncStorage.setItem('@HomeoFace:user', registerModel.email);
          await AsyncStorage.setItem('@HomeoFace:password', registerModel.password);
          this.setState({modalVisible: false});
        } else {
          var message = JSON.parse(response._bodyText);
          
          Alert.alert(
            'Dikkat',
            message.Message + ' Eğer şifrenizi unuttuysanız, lütfen HomeoCure uygulamasından şifremi unuttum bölümünden değişiklik yapınız.',
            [
              {
                text: 'İptal',
                style: 'cancel',
              },
              {text: 'Tamam'},
            ],
            {cancelable: false},
          );
        }
        this.setState({alreadyPressed: false});
      } catch(error) {
        console.error(error);
      }
    }
    this.setState({alreadyPressed: false});
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {}}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={{backgroundColor: 'transparent', alignItems: 'center',justifyContent: 'center', flex:1}}>
          <View style={{backgroundColor: 'white', alignItems: 'center',justifyContent: 'center', width: '75%', height: '50%'}}>
            <View style={{alignItems: 'center',justifyContent: 'center', flex:2}}>
                <Text style={{color: '#9A9A9A', fontSize: 34}}>HomeoFace</Text>
            </View>
            <View style={{alignItems: 'center', flex:1.5, width: '50%'}}>
              <TextInput 
                placeholder = "E-Posta" 
                onChangeText={(username) => this.setState({username})} 
                style={{backgroundColor: '#EFEFEF', margin:10, marginBottom: 0, width: '100%', borderRadius: 10, fontSize: 21, padding: 7}}/>
              <TextInput 
                placeholder = "Şifre" 
                secureTextEntry={true} 
                onChangeText={(password) => this.setState({password})} 
                style={{backgroundColor: '#EFEFEF', margin:10, marginBottom: 0, width: '100%', borderRadius: 10, fontSize: 21, padding: 7}}/>
            </View>
            <View style={{alignItems: 'center', flex:1, flexDirection: 'row'}}>
              <View style={{alignItems: 'center', margin:5}}>
                <Button title='Giriş yap'
                  disabled={this.state.alreadyPressed}
                  onPress={() => {
                    this.login()
                  }} />
              </View>
              <View style={{alignItems: 'center', margin:5}}>
              <Button title='Kayıt Ol'
                disabled={this.state.alreadyPressed}
                onPress={() => {
                    this.signup()
                  }} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}