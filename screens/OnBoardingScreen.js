import React from 'react';
import {StyleSheet, Image, Button, View} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Skip = ({...props}) => <Button title="Skip" color="#000" {...props} />;
const Next = ({...props}) => <Button title="Next" color="#000" {...props} />;
const Done = ({...props}) => <Button title="Done" color="#000" {...props} />;

const Dots = ({selected}) => {
  let backgroundColor;
  backgroundColor = selected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)';
  return (
    <View
      style={{
        width: 5,
        height: 5,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};
const OnBoardingScreen = ({navigation}) => {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#a6e4d0',
          image: (
            <Image
              source={require('../assets/onBoarding/onboarding-img1.png')}
            />
          ),
          title: 'Connect to the world',
          subtitle: 'A New Way To Connect With The World',
        },
        {
          backgroundColor: '#fdeb93',
          image: (
            <Image
              source={require('../assets/onBoarding/onboarding-img2.png')}
            />
          ),
          title: 'Share Your Favorites',
          subtitle: 'Share Your Thoughts With Similar Kind of People',
        },
        {
          backgroundColor: '#e9bcbe',
          image: (
            <Image
              source={require('../assets/onBoarding/onboarding-img3.png')}
            />
          ),
          title: 'Become The Star',
          subtitle: 'Let The Spot Light Capture You',
        },
      ]}
    />
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
