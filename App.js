import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MainCamera, Notifications } from './components';
import Swiper from 'react-native-swiper';

export default class App extends React.Component {
  render() {
    return (
      <Swiper loop={false} showsPagination={false} index={1}>
        <View style={styles.container}>
        </View>
        <MainCamera />
        <Notifications style={{flex: 1}} />
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
  }
});
