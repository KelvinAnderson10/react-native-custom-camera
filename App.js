import { Camera, CameraType, FlashMode } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import {Entypo, FontAwesome5, MaterialIcons, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function toggleFlash() {
    if (flash== Camera.Constants.FlashMode.off){
      setFlash(Camera.Constants.FlashMode.on)
    }
    else if (flash== Camera.Constants.FlashMode.on){
      setFlash(Camera.Constants.FlashMode.auto)
    }
    else if (flash== Camera.Constants.FlashMode.auto){
      setFlash(Camera.Constants.FlashMode.off)
    }
  }

  const takePicture = async () => {
    if (camera){
      const data = await camera.takePictureAsync(null)
      console.log(data);
      setImage(data.uri)
    }
  }

  let openImagePickerAsync = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setImage(pickerResult.uri);
    console.log(pickerResult.uri);
  }

  return (
    <View style={styles.main_container}>
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} flashMode={flash} ref={ref => setCamera(ref)}>
          {/* <View style={styles.buttonContainer}> */}
          {/* </View> */}
        </Camera>
      </View>
      <View style={styles.bottom_container}>
        <MaterialCommunityIcons name='image' size={32} color='white' onPress={openImagePickerAsync}></MaterialCommunityIcons>
        <FontAwesome name='circle-thin' size={80} color='white' onPress={()=> takePicture()}></FontAwesome>
        {flash == Camera.Constants.FlashMode.on ? 

        <MaterialIcons name='flash-on' size={32} color='white' onPress={() => toggleFlash()}></MaterialIcons>
        : flash == Camera.Constants.FlashMode.off ?
        <MaterialIcons name='flash-off' size={32} color='white' onPress={() => toggleFlash()}></MaterialIcons> :
        <MaterialIcons name='flash-auto' size={32} color='white' onPress={() => toggleFlash()}></MaterialIcons>}
        
        {/* {image && <Image source={{uri: image}} style={{flex: 1, width: 50, height: 50}}/>} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  bottom_container: {
    flex: 0.25,
    backgroundColor: 'black',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    flex: 0.75,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
