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

import locations from './model/locations';
import SunIcon from './assets/sun.svg';
import CloudyIcon from './assets/cloudy.svg';
import MoonIcon from './assets/moon.svg';
import RainIcon from './assets/rain.svg';
import MenuIcon from './assets/menu.svg';
import SearchIcon from './assets/search.svg';

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
const App = () => {
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
            bgImg = require('./assets/sunny.jpeg');
          } else if (location.weatherType === 'Night') {
            bgImg = require('./assets/night2.jpeg');
          } else if (location.weatherType === 'Cloudy') {
            bgImg = require('./assets/cloudy.jpeg');
          } else if (location.weatherType === 'Rainy') {
            bgImg = require('./assets/rainy.jpeg');
          }
          return (
            <View
              style={{width: windowWidth, height: windowHeight}}
              key={index}>
              <ImageBackground
                source={bgImg}
                style={{
                  flex: 1,
                }}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: 20,
                  }}>
                  <View style={styles.topInfoWrapper}>
                    <View>
                      <Text style={styles.city}>{location.city}</Text>
                      <Text style={styles.dateTime}>{location.dateTime}</Text>
                    </View>
                    <View>
                      <Text style={styles.temparature}>
                        {location.temparature}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        {weatherIcon(location.weatherType)}
                        <Text style={styles.weatherType}>
                          {location.weatherType}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      borderBottomColor: 'rgba(255,255,255,0.7)',
                      marginTop: 20,
                      borderBottomWidth: 1,
                    }}></View>

                  <View style={styles.bottomInfoWrapper}>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Wind</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {location.wind}
                      </Text>
                      <Text style={styles.infoText}>Km/h</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: location.wind / 2,
                            height: 5,
                            backgroundColor: '#69f0aE',
                          }}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Rain</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {location.rain}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: location.rain / 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View>
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text style={styles.infoText}>Humidity</Text>
                      <Text style={[styles.infoText, {fontSize: 24}]}>
                        {location.humidity}
                      </Text>
                      <Text style={styles.infoText}>%</Text>
                      <View style={styles.infoBar}>
                        <View
                          style={{
                            width: location.humidity / 2,
                            height: 5,
                            backgroundColor: '#F44336',
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  <Text style={{color: 'white'}}>{location.city}</Text>
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

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  bottomInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
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
