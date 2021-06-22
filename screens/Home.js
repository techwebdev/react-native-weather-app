import React, {useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  useWindowDimensions,
  StatusBar,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import locations from '../model/locations';
import SunIcon from '../assets/sun.svg';
import CloudyIcon from '../assets/cloudy.svg';
import MoonIcon from '../assets/moon.svg';
import RainIcon from '../assets/rain.svg';
import MenuIcon from '../assets/menu.svg';
import SearchIcon from '../assets/search.svg';

const weatherIcon = weatherType => {
  if (weatherType === 'Sunny') {
    return <SunIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === 'Rainy') {
    return <RainIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === 'Night') {
    return <MoonIcon width={34} height={34} fill="#fff" />;
  }
  if (weatherType === 'Cloudy') {
    return <CloudyIcon width={34} height={34} fill="#fff" />;
  }
};

const Home = () => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={1}>
        {locations.map((location, index) => {
          let bgImg = '';
          if (location.weatherType === 'Sunny') {
            bgImg = require('../assets/sunny.jpeg');
          } else if (location.weatherType === 'Night') {
            bgImg = require('../assets/night2.jpeg');
          } else if (location.weatherType === 'Cloudy') {
            bgImg = require('../assets/cloudy.jpeg');
          } else if (location.weatherType === 'Rainy') {
            bgImg = require('../assets/rainy.jpeg');
          }
          return (
            <View
              style={{width: windowWidth, height: windowHeight}}
              key={index}>
              <ImageBackground source={bgImg} style={styles.flexOne}>
                <View style={styles.imageContainer}>
                  <View style={styles.topInfoWrapper}>
                    <View>
                      <Text style={styles.city}>{location.city}</Text>
                      <Text style={styles.dateTime}>{location.dateTime}</Text>
                    </View>
                    <View>
                      <Text style={styles.temparature}>
                        {location.temparature}
                      </Text>
                      <View style={styles.flexDirectionRow}>
                        {weatherIcon(location.weatherType)}
                        <Text style={styles.weatherType}>
                          {location.weatherType}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.bottomInfoWrapperContainer} />

                  <View style={styles.bottomInfoWrapper}>
                    <View style={[styles.alignItemsCenter]}>
                      <Text style={styles.infoText}>Wind</Text>
                      <Text style={[styles.infoText, styles.fontSize24]}>
                        {location.wind}
                      </Text>
                      <Text style={styles.infoText}>Km/h</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={[styles.windStyle, {width: location.wind / 2}]}
                        />
                      </View>
                    </View>
                    <View style={[styles.alignItemsCenter]}>
                      <Text style={styles.infoText}>Rain</Text>
                      <Text style={[styles.infoText, styles.fontSize24]}>
                        {location.rain}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={[styles.rainStyle, {width: location.rain / 2}]}
                        />
                      </View>
                    </View>
                    <View style={[styles.alignItemsCenter]}>
                      <Text style={styles.infoText}>Humidity</Text>
                      <Text style={[styles.infoText, styles.fontSize24]}>
                        {location.humidity}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={[
                            styles.rainStyle,
                            {width: location.humidity / 2},
                          ]}
                        />
                      </View>
                    </View>
                  </View>
                  <Text style={styles.whiteColor}>{location.city}</Text>
                </View>
              </ImageBackground>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.appHeader}>
        <TouchableOpacity onPress={() => {}}>
          <SearchIcon width={24} height={24} fill="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <MenuIcon width={24} height={24} fill="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.indicatorWrapper}>
        {locations.map((location, index) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (index - 1),
              windowWidth * index,
              windowWidth * (index + 1),
            ],
            outputRange: [5, 12, 5],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View style={[styles.normalDot, {width}]} key={index} />
          );
        })}
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  whiteColor: {color: 'white'},
  fontSize24: {fontSize: 24},
  alignItemsCenter: {
    alignItems: 'center',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  flexOne: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
  },
  appHeader: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: getStatusBarHeight() + 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  topInfoWrapper: {
    flex: 1,
    marginTop: 160,
    justifyContent: 'space-between',
  },
  city: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  dateTime: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  temparature: {
    color: '#fff',
    fontFamily: 'Lato-Light',
    fontSize: 85,
  },
  weatherType: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 34,
    marginLeft: 10,
  },
  bottomInfoWrapperContainer: {
    borderBottomColor: 'rgba(255,255,255,0.7)',
    marginTop: 20,
    borderBottomWidth: 1,
  },
  bottomInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  windStyle: {
    height: 5,
    backgroundColor: '#69f0aE',
  },
  rainStyle: {
    height: 5,
    backgroundColor: '#F44336',
  },
  infoText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
  },
  infoBar: {
    width: 45,
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  indicatorWrapper: {
    position: 'absolute',
    top: 140,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalDot: {
    height: 5,
    width: 5,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
});
