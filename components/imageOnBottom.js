import * as React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Platform } from "react-natieve";
import { Constants } from "expo";


const margin = 16;
const borderRadius = 5;
const width = Dimensions.get("window").width / 2 - margin * 2;
const offset = (v: number) => (Platform.OS === "android" ? (v + Constants.statusBarHeight) : v);

type ImageOnBottomProps = {
    story: Position,
    onPress: () => void,
    selected: boolean,
  };

export defaul class ImageOnBottom extends React.PureComponent<ImageOnBottomProps> {
    ref = React.createRef();

    measure = async (): Position => new Promise(resolve => this.ref.current.measureInWindow((x, y, width, height) => resolve({
        x, y: offset(y), width, height,
    })));

    render() {
      const { ref } = this;
      const { story, onPress, selected } = this.props;
      return (
        <TouchableWithoutFeedback {...{ onPress }}>
          <View style={styles.container}>
            {
              !selected && (
              <Image source={story.source} style={styles.image} {...{ ref }} />
              )
            }
          </View>
        </TouchableWithoutFeedback>
      );
    }
}