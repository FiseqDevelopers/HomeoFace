import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, CameraRoll, Platform, ImageStore, ImageEditor } from 'react-native';
import { Camera, Permissions, ImagePicker, ImageManipulator } from 'expo';
import { LogInPopUp } from './'

export default class MainCamera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            hasCameraRollPermission: null,
            photos: [
                {key: 'left_side', imageSource: null, width: 0, height: 0},
                {key: 'front_side', imageSource: null, width: 0, height: 0},
                {key: 'right_side', imageSource: null, width: 0, height: 0}],
            isAllSet: false,
            platform: Platform.OS,
            count: 0,
            guid_id: '',
            front_side: '',
            left_side: '',
            right_side: '',
            width: 512,
            height: 512,
            isUserLoggedIn: props.isUserLoggedIn
        };
        this._pickImage.bind(this);
    }

    componentWillUpdate(nextProps) {
        this.state.isUserLoggedIn = nextProps.isUserLoggedIn;
    }

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
        return <View style={styles.permissionError}><Text>Kamera veya dosyalara erişim yoktur. Lütfen gerekli izinleri veriniz.</Text></View>;
        } else {
        return (
            <View style={styles.container}>
                <LogInPopUp isUserLoggedIn={this.props.isUserLoggedIn} />
                { this.renderCamera() }
                <View style={styles.bottomBar}>
                    <View style={styles.gallery} >
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                type: this.state.type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back,
                                });
                            }}>
                            <Image source={require('../images/switch.png')} style={{width: 40, height: 40}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.shutterButton} >
                        <TouchableOpacity onPress={this.state.isAllSet ?  this.sendData.bind(this) : this.snap.bind(this)}>
                            <Image source={this.state.isAllSet ? require('../images/upload.png') : require('../images/shutter.png')} style={{width: 60, height: 60}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.notifications} >
                        <TouchableOpacity onPress={this.setIndex.bind(this, 1)}>
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
                                    if(item.imageSource == null) {
                                        return(
                                            <View key={index} style={styles.mainImage} >
                                                <TouchableOpacity onPress={this._pickImage.bind(this, item.key)} style={styles.exampleImage} >
                                                    <Image 
                                                        key={item.key}
                                                        style={{ width: 40, height: 40 }}
                                                        source={require('../images/exampleImage.png')} />
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    } else {
                                        return(
                                            <View key={index} style={styles.mainImage} >
                                                <TouchableOpacity onPress={this._pickImage.bind(this, item.key)} style={styles.exampleImage} >
                                                    <Image 
                                                        key={item.key}
                                                        style={{ width: 40, height: 40 }}
                                                        source={{uri: item.imageSource}} />
                                                </TouchableOpacity>
                                                
                                                <TouchableOpacity onPress={this._deleteImage.bind(this, item.key)} style={styles.deleteItem}>
                                                    <Image 
                                                        key={item.key}
                                                        style={{ width: 20, height: 20 }}
                                                        source={require('../images/cancel.png')} />
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    }
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
            mediaTypes: 'Images',
            quality: 1,
            aspect: [4,4],
        });

        if (!result.cancelled) {
            this.updateList(key, result.uri,result.width, result.height);
        }
        this.checkImagesAreSet();
    };

    _deleteImage = async (key) => {
        this.setState({isAllSet: false});
        this.updateList(key, null, null, null);
    };

    setIndex(val) {
        this.props.onPageIndexChanged(val);
    }

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

    sendData = async function() {
        // Upload the image using the fetch and FormData APIs
        var uuid = require('react-native-uuid');
        this.setState({guid_id: uuid.v1()});
        
        const requests = this.state.photos.map((item) => {
            let imageSettings = {
                offset: { x: 0, y: 0 },
                size: { width: item.width, height: item.height }
            };

            ImageEditor.cropImage(item.imageSource, imageSettings, (uri) => {
              ImageStore.getBase64ForTag(uri, (data) => {
                if(item.key === 'front_side') {
                    this.setState({
                        front_side: data
                    });
                }
                else if(item.key === 'left_side'){
                    this.setState({
                        left_side: data
                    });
                }
                else if(item.key === 'right_side') {
                    this.setState({
                        right_side: data
                    });
                } else {
                }
              }, e => console.warn("getBase64ForTag: ", e))
            }, e => console.warn("cropImage:g ", e));
        });

        return fetch("https://facecuring.herokuapp.com/root/PhotosFromPhone", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                guid_id: this.state.guid_id,
                front_side: this.state.front_side,
                left_side: this.state.left_side,
                right_side: this.state.right_side
            }),
        });
    }

    snap = async function() {
        if (this.camera) {
        const options = { quality: 0.5, base64: true };
        await this.camera.takePictureAsync(options).then(data => {
            var rate = data.width/1000;
            const compressedData = ImageManipulator.manipulateAsync(data.uri, [{resize: {width: data.width/rate, height: data.height/rate}}], {format: 'jpeg', compress: 0.8}).then((result) => {
                CameraRoll.saveToCameraRoll(result.uri);

                var setOne = false;
                this.state.photos.map((item) => {
                    if(setOne === false &&  item.imageSource == null) {
                        this.updateList(item.key, result.uri, result.width, result.height);
                        setOne = true;
                    }
                });
                this.checkImagesAreSet();
            });
            

            this._getPhotosAsync(0).catch(error => {
                console.error(error);
            });
        });
        }
    };

    // Check if all images are set to sent.
    async checkImagesAreSet() {
        this.setState({isAllSet: true});
        this.state.photos.map((item) => {
            if(item.imageSource === null){
                this.setState({isAllSet: false});
            }
        });
    }

    async updateList(key, source, itemWidth, itemHeight) {
        this.setState(state => {
            const photos = state.photos.map((item) => {
                if (item.key === key) {
                    return {key: item.key, imageSource: source, width: itemWidth, height: itemHeight};
                } else {
                    return {key: item.key, imageSource: item.imageSource, width: item.width, height: item.height};
                }
            });
    
            return {
            photos,
            };
        });
    }

    renderCamera() {
        if(this.state.platform === 'android') {
            return (
                <Camera 
                    style={styles.preview} 
                    type={this.state.type} 
                    ref={ref => { this.camera = ref; }} 
                    ratio='16:9' >
                </Camera>);
        }
        else {
            return (
                <Camera 
                    style={styles.preview} 
                    type={this.state.type} 
                    ref={ref => { this.camera = ref; }} >
                </Camera>);
        }
    }

    async _getPhotosAsync(val) {
        if(val > 0) {
            let photos = await CameraRoll.getPhotos({ first: val });
            this.setState({ photos });
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 2,
      backgroundColor: '#000',
    },
    permissionError: {
        flex: 2,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    preview: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    bottomBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 80,
        flexDirection: 'row'
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
        flexDirection: 'row'
    },
    nonImage: {
        flex: 2,
    },
    mainImage: {
        flex: 1,
        justifyContent: 'center'
    },
    exampleImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteItem: {
        position: 'absolute', 
        flex: 1,
        right: 0,
        top: -10
    }
  });
