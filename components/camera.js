import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, SafeAreaView, CameraRoll } from 'react-native';
import { Camera, Permissions, ImagePicker } from 'expo';

export default class MainCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    hasCameraRollPermission: null,
    photos: [
        {key: 1, imageSource: '../images/shutter.png'},
        {key: 2, imageSource: '../images/shutter.png'},
        {key: 3, imageSource: '../images/shutter.png'}]
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { camera_roll_status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === 'granted', hasCameraRollPermission: camera_roll_status === 'granted'});
  }

  render() {
    const { hasCameraPermission, hasCameraRollPermission } = this.state;
    if (hasCameraPermission === null && hasCameraRollPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false && hasCameraRollPermission === false) {
      return <Text>Kamera veya dosyalara erişim yoktur. Lütfen gerekli izinleri veriniz.</Text>;
    } else {
      return (
        <View style={styles.container}>
          <Camera style={styles.preview} type={this.state.type} ref={ref => { this.camera = ref; }} />
          <SafeAreaView style={styles.settingsButton} >
            <TouchableOpacity>
              <Image source={require('../images/settings.png')} style={{width: 40, height: 40}}/>
            </TouchableOpacity>
          </SafeAreaView>
          <View style={styles.bottomBar}>
            <View style={styles.gallery} >
              <TouchableOpacity>
                <Image source={require('../images/gallery.png')} style={{width: 40, height: 40}}/>
              </TouchableOpacity>
            </View>
            <View style={styles.shutterButton} >
              <TouchableOpacity onPress={this.snap.bind(this)}>
                <Image source={require('../images/shutter.png')} style={{width: 60, height: 60}}/>
              </TouchableOpacity>
            </View>
            <View style={styles.notifications} >
                <TouchableOpacity
                onPress={() => {
                    this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                    });
                }}>
              <Image source={require('../images/notifications.png')} style={{width: 40, height: 40}}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.imageBar}>
            <View style={styles.nonImage} />
            {
                <View style={{flex: 3, flexDirection: 'row'}} >
                    {
                        this.state.photos.map((item, index) => {
                            return(
                                <View style={styles.exampleImage} key={index}>
                                    <TouchableOpacity onPress={this._pickImage.bind(this, item.key)}>
                                        <Image 
                                            key={item.key}
                                            style={{ width: 40, height: 40 }}
                                            source={{uri:item.imageSource}} />
                                    </TouchableOpacity>
                                </View>
                            );
                        })
                    }
                </View>
            }
            <View style={styles.nonImage} />
          </View>
        </View>
      );
    }
  }

  _pickImage = async (key) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
    });
    
    if (!result.cancelled) {
        this.state.photos.map((item) => {
            if(item.key === key) {
                console.log(result);
                item.imageSource = result.uri;
            }
        });
    }
    
  };

  _renderPhotos(photos) {
    if(photos == null) {
        <View style={styles.exampleImage} >
            <TouchableOpacity>
                <Image style={{ width: 40, height: 40 }} 
                       source={require('../images/exampleImage.png')} />
            </TouchableOpacity>
        </View>
    } else {
        for (let { node: photo } of photos.edges) {
            images.push(
            <Image
                source={photo.image}
                resizeMode="contain"
                style={{ height: 40, width: 40, resizeMode: 'contain' }}
            />
            );
        }
    }
  }

  snap = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      await this.camera.takePictureAsync(options).then(data => {
        CameraRoll.saveToCameraRoll(data.uri);
        var isNotSet = true;
        this.state.photos.map((item) => {
            if(isNotSet === true && item.imageSource === '../images/shutter.png') {
                item.imageSource = data.uri;
                isNotSet = false;
            }
        });

        this._getPhotosAsync(0).catch(error => {
            console.error(error);
        });
      });
    }
  };

  async _getPhotosAsync(val) {
      if(val > 0) {
        let photos = await CameraRoll.getPhotos({ first: val });
        this.setState({ photos });
      }
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    preview: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    settingsButton: {
        position: 'absolute',
        left: 20,
        top: 20,
    },
    bottomBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 80,
        flexDirection: 'row',
        flex: 1
    },
    shutterButton: {
        flex: 1,
        alignItems: 'center'
    },
    gallery: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notifications: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 20,
        flexDirection: 'row',
        flex: 10
    },
    nonImage: {
        flex: 2,
    },
    exampleImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
  });
