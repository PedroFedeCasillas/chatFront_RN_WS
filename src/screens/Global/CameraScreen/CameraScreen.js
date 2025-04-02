import { useState, useRef } from "react";
import { View, TouchableOpacity } from "react-native";
import { CameraView, FlashMode, CameraType } from "expo-camera";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { PhotoCapture } from "../../../components/Shared";
import { styles } from "./CameraScreen.styles";

export function CameraScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [photo, setPhoto] = useState(null);
  const [flashOn, setFlashOn] = useState(false);
  const [cameraBack, setCameraBack] = useState(true);
  const cameraRef = useRef(null);

  const onClose = () => navigation.goBack();

  const onOffFlash = () => setFlashOn((prevState) => !prevState);

  const changeTypeCamera = () => setCameraBack((prevState) => !prevState);

  const captureImage = async () => {
    if (cameraRef.current) {
      try {
        const options = { quality: 1 };
        const newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
        // console.log("Foto capturada:", newPhoto.uri);
      } catch (error) {
        console.error("Error al capturar la foto:", error);
      }
    }
  };

  if (photo) {
    return <PhotoCapture photo={photo} type={params.type} id={params.id} />;
  }

  return (
    <CameraView
      ref={cameraRef}
      style={styles.container}
      flashMode={flashOn ? "torch" : "off"}
      facing={cameraBack ? "back" : "front"}
    >
      <View style={styles.topAction}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={30} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onOffFlash}>
          {flashOn ? (
            <Ionicons name="flash" size={30} style={styles.icon} />
          ) : (
            <Ionicons name="flash-off" size={30} style={styles.icon} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.iconBackground}>
          <MaterialCommunityIcons name="null" size={24} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={captureImage}>
          <MaterialCommunityIcons
            name="checkbox-blank-circle"
            size={80}
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBackground}
          onPress={changeTypeCamera}
        >
          <MaterialCommunityIcons
            name="camera-flip"
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}
