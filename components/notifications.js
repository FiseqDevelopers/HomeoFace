import React from 'react';
import Block from './block';
import Card from './card'
import { theme } from '../constants';
import { Text, ScrollView, StyleSheet, View, SafeAreaView, Platform, TouchableOpacity, Image} from 'react-native' 

export default class Notifications extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <View style={{height: 120, backgroundColor: Platform.OS === 'android' ? 'black' : 'white'}} >
                    <Text style={styles.notificationsText}>
                        Sonuçlar
                    </Text>
                    <TouchableOpacity style={styles.logOut}>
                        <Text>Çıkış</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.rewards} showsVerticalScrollIndicator={false}>
                    <Card shadow>
                        <Block>
                            <Text> date </Text>
                        </Block>
                    </Card>
                    <Card shadow>
                        <Block>
                            <Text> Chart </Text>
                        </Block>
                    </Card>
                    <Card shadow>
                        <Block>
                            <Text> Chart </Text>
                        </Block>
                    </Card>
                    <Card shadow>
                        <Block>
                            <Text> Chart </Text>
                        </Block>
                    </Card>
                    <Card shadow>
                        <Block>
                            <Text> Chart </Text>
                        </Block>
                    </Card>
                    <Card shadow>
                        <Block>
                            <Text> Chart </Text>
                        </Block>
                    </Card>
                    <Card shadow>
                        <Block>
                            <Text> Chart </Text>
                        </Block>
                    </Card>
                    <Card shadow>
                        <Block>
                            <Text> Chart </Text>
                        </Block>
                    </Card>
                    <Card shadow>
                        <Block>
                            <Text> Chart </Text>
                        </Block>
                    </Card>
                    <Card shadow>
                        <Block>
                            <Text> Chart </Text>
                        </Block>
                    </Card>
                    <Card shadow>
                        <Block>
                            <Text> Chart </Text>
                        </Block>
                    </Card>
                    <Card shadow>
                        <Block>
                            <Text> Chart </Text>
                        </Block>
                    </Card>
                    <Card shadow>
                        <Block>
                            <Text> Chart </Text>
                        </Block>
                    </Card>
                    <Card shadow>
                        <Block>
                            <Text> Chart </Text>
                        </Block>
                    </Card>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    rewards: {
      padding: theme.sizes.padding,
      backgroundColor: theme.colors.gray2,
    },
    // horizontal line
    hLine: {
      marginVertical: theme.sizes.base * 1.5,
      height: 1,
    },
    // vertical line
    vLine: {
      marginVertical: theme.sizes.base / 2,
      width: 1,
    },
    notificationsText: {
      color: Platform.OS === 'android' ? 'white' : 'black',
      fontSize: 50,
      position: 'absolute',
      bottom: 5,
      marginLeft: 5
    },
    logOut: {
      color: Platform.OS === 'android' ? 'white' : 'black',
      fontSize: 50,
      position: 'absolute',
      bottom: 5,
      marginRight:5
    }
  })