import React, { Component } from 'react';
import { Modal, Text, View, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

export default class Result extends Component {
  constructor(props) {
      super(props);

      this.state = {
          modalVisible: false,
          front_side: '',
          left_side: '',
          right_side: ''
      }
  }

  async componentWillUpdate() {
    if(this.props.photoArray !== undefined && this.props.photoArray.length > 0) {
        this.props.photoArray.map((item) => {
            if(item['front_side'] && this.state.front_side === '') {
                this.setState({front_side: item['front_side']});
            } else if(item['left_side'] && this.state.left_side === '') {
                this.setState({left_side: item['left_side']});
            } else if(item['right_side'] && this.state.right_side === '') {
                this.setState({right_side: item['right_side']});
            }
        });
        if(!this.state.modalVisible) {
            this.setState({modalVisible: true});
        }
    }
  }

  close() {
    this.setState({front_side: ''});
    this.setState({left_side: ''});
    this.setState({right_side: ''});
    this.setState({modalVisible: false});
  }

  render() {
      if(this.state.modalVisible) {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={() => {}}
                style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center',justifyContent: 'center', flex:1 }}>
                    <View style={{ backgroundColor: 'white', width: '90%', height: '80%' }}>
                        <View style={{ justifyContent: 'space-between', flex:1, flexDirection:'row' }}>
                            <Text style={{ color: '#000000', marginTop:15, marginLeft:20, fontSize:30 }}>Sonuç</Text>
                            <TouchableOpacity onPress={this.close.bind(this)}>
                                <Text style={{ color: '#000000', marginTop:10, marginRight:20, fontSize:40 }}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:5 }}>
                            <Swiper ref='swiper' loop={true} showsPagination={false} style={{flex: 1, justifyContent:'center'}} index={0}>
                                <Image 
                                    key='leftSide'
                                    style={{ width: '100%', height: '100%' }}
                                    source={{uri: this.state.left_side}} />
                                <Image 
                                    key='rightSide'
                                    style={{ width: '100%', height: '100%' }}
                                    source={{uri: this.state.right_side}} />
                                <Image 
                                    key='frontSide'
                                    style={{ width: '100%', height: '100%' }}
                                    source={{uri: this.state.front_side}} />
                            </Swiper>
                        </View>
                        
    
                    </View>
                </View>
            </Modal>
          )
      } else {
          return null;
      }
      
  } 

}