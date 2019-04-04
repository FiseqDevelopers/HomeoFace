import React, { Component } from 'react';
import { Modal, Text, View, Image, TouchableOpacity } from 'react-native';

export default class Result extends Component {
  constructor(props) {
      super(props);

      this.state = {
          visible: false,
          front_side: '',
          left_side: '',
          right_side: '',
          isFirst: true
      }
  }

  async componentDidMount() {
      this.setState({visible: false});
  }

  async componentWillUpdate() {
    if(this.state.isFirst) {
        this.setState({visible: this.props.visible});
        this.setState({isFirst: false})
    }
  }

  close() {
      this.setState({visible: false});
      this.setState({isFirst: true});
  }

  render() {
      return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.visible} 
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
                    <View style={{ alignItems: 'center', justifyContent:'space-evenly', flex:5, width: '100%'}}>
                        <Image 
                            key='leftSide'
                            style={{ width: 120, height: 120 }}
                            source={{uri: this.props.leftSide}} />
                        <Image 
                            key='rightSide'
                            style={{ width: 120, height: 120 }}
                            source={{uri: this.props.rightSide}} />
                        <Image 
                            key='frontSide'
                            style={{ width: 120, height: 120 }}
                            source={{uri: this.props.frontSide}} />
                    </View>

                </View>
            </View>
        </Modal>
      )
  } 

}