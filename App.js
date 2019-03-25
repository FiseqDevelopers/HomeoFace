import React from 'react';
import { StyleSheet } from 'react-native';
import { MainCamera, Notifications, ModalExample } from './components';
import Swiper from 'react-native-swiper';

export default class App extends React.Component {
  render() {
    return (
      <Swiper loop={false} showsPagination={false} index={0}>
        <ModalExample />
        <MainCamera />
        <Notifications style={styles.wrapper} />
      </Swiper>
    );
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
