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
          right_side: '',
          detected_list: []
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
            } else if(item['detected_list'] && this.state.detected_list.length === 0) {
                const cleanArray = item['detected_list'].filter(function (el, index) { return index %2 === 1; });
                this.setState({detected_list: cleanArray});
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
    this.setState({detected_list: []});
    this.setState({modalVisible: false});
  }

  returnText(item, index) {
      
  }

  render() {
      if(this.state.modalVisible) {
        let lengthOfList = this.state.detected_list.length;
        return (
            <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={() => {}}
                style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ alignItems: 'center',justifyContent: 'center', flex:1 }}>
                    <View style={{ backgroundColor: 'darkgray', opacity: .99, width: '100%', height: '90%', borderRadius:20 }}>
                        <View style={{ justifyContent: 'space-between', backgroundColor:'gray', borderRadius:20, shadowColor:'black', flex:.5, flexDirection:'row' }}>
                            <Text style={{ color: 'white', marginTop:15, marginLeft:20, fontSize:30 }}>Sonuç</Text>
                            <TouchableOpacity onPress={this.close.bind(this)}>
                                <Text style={{ color: 'white', marginTop:10, marginRight:20, fontSize:35 }}>X</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: (lengthOfList * .2)}}>
                            {
                                this.state.detected_list.map((item, index) => {
                                    return(
                                        <Text style={{ color: 'white', marginLeft: 10}} key={index} >{item}</Text>
                                      );
                                })
                            }
                        </View>
                        <View style={{flex:5 -(lengthOfList * .1), width: '100%'}}>
                            <Swiper ref='swiper' loop={false} showsPagination={false} style={{flex: 1, justifyContent:'center'}} index={0}>
                                <Image 
                                    key='leftSide'
                                    style={{ width: '95%', height: '95%', borderRadius: 20, margin: 10 }}
                                    source={{uri: this.state.left_side}} />
                                <Image 
                                    key='rightSide'
                                    style={{ width: '95%', height: '95%', borderRadius: 20, margin: 10 }}
                                    source={{uri: this.state.right_side}} />
                                <Image 
                                    key='frontSide'
                                    style={{ width: '95%', height: '95%', borderRadius: 20, margin: 10 }}
                                    source={{uri: this.state.front_side}} />
                            </Swiper>
                            </View>
                        <View style={{ justifyContent: 'space-between', flex:.2, flexDirection:'row' }} />
                    </View>
                </View>
            </Modal>
          )
      } else {
          return null;
      }
      
  } 

}