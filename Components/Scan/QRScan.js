import { StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';

const QRScan = ({ scanned, setScanned, setProjectCode, handleJoin }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await BarCodeScanner.requestPermissionsAsync();

        if (status !== 'granted') {
          alert('sorry, we eed camera roll permissions to make this work');
        } else {
          setHasPermission(status === 'granted');
        }
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    await setScanned(true);
    await setProjectCode(data);
    await handleJoin();
  };

  return (
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />
  );
};

export default QRScan;
