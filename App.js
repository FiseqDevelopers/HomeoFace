import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import { MainCamera, Notifications } from './components';
import { LoginModel } from './models';
import Swiper from 'react-native-swiper';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      swiperIndex: 0,
    }
  }

  async checkIfUserAlreadyLoggedIn() {
    const user = await AsyncStorage.getItem('@HomeoFace:user');
    const password = await AsyncStorage.getItem('@HomeoFace:password');

    if(!user || !password) {
      this.setState({isUserLoggedIn: false});
    }
    
    var loginModel = new LoginModel();
    loginModel.email = user;
    loginModel.password = password;
    
    return new Promise( async function(resolve, reject) {
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
          resolve(true);
        } else {
          reject(false);
        }
      } catch(error) {
        reject(false);
      }
    });
  }

  async componentDidMount() {
    this.checkIfUserAlreadyLoggedIn().then((val) => {
      if(val) {
        this.setState({isUserLoggedIn: true});
      } else {
        this.setState({isUserLoggedIn: false});
      }
    }, (error) => {
      this.setState({isUserLoggedIn: false});
    });
  }

  handleIndex = (value) => {
    this.refs.swiper.scrollBy(1);
  }

  render() {
    if(this.state.isUserLoggedIn === undefined) {
      return null;
    } else {
      return (
        <Swiper ref='swiper' loop={false} showsPagination={false} index={0}>
          <MainCamera isUserLoggedIn={this.state.isUserLoggedIn} onPageIndexChanged={this.handleIndex}/>
          <Notifications style={styles.wrapper} />
        </Swiper>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1
  }
});
