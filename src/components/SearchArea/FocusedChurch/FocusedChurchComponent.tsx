import React, { useEffect, useState } from 'react';

import {
  Image,
  ImageSourcePropType,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useUrls } from '../../../hooks/useUrls';

import { useAtomValue } from 'jotai';
import { focusedChurchAtom } from '../../../atoms/searchArea';
import { recenterMapAtom } from '../../../atoms/map';

import { styles } from './FocusedChurchStyle';

export const FocusedChurchComponent = () => {
  const church = useAtomValue(focusedChurchAtom);
  const { fn: recenterMap } = useAtomValue(recenterMapAtom);
  const { dioceseUrl } = useUrls();
  const [churchImg, setChurchImg] = useState<ImageSourcePropType>();

  useEffect(() => {
    if (!church) return;

    recenterMap(true, {
      latitude: church.coordinates.lat,
      longitude: church.coordinates.lng,
    });
  }, [church, recenterMap]);

  useEffect(() => {
    if (!church) return;
    setChurchImg({ uri: `${dioceseUrl}/${church.images.image_intro}` });
  }, [church, dioceseUrl]);

  return church && churchImg ? (
    <>
      <View style={styles.churchContainer}>
        <Image
          style={styles.coverImg}
          defaultSource={require('../../../assets/images/church.png')}
          source={churchImg}
          onError={() => {
            setChurchImg(require('../../../assets/images/church.png'));
          }}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{church.name}</Text>
          <View style={styles.detailsContainer}>
            <Image
              style={styles.icon}
              source={require('../../../assets/images/church-pin-blue.png')}
            />
            <Text style={styles.address}>{church.address}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() =>
            Linking.openURL(
              `google.navigation:q=${church.coordinates.lat}+${church.coordinates.lng}`,
            )
          }>
          <View style={{ ...styles.button, ...styles.searchButton }}>
            <Text style={{ ...styles.buttonText, ...styles.searchButtonText }}>
              Buscar rotas
            </Text>
            <Image
              source={require('../../../assets/images/open-link-white.png')}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.75} onPress={() => {}}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Salvar</Text>
            <Image
              source={require('../../../assets/images/bookmark-grey.png')}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  ) : (
    <></>
  );
};
