import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { Colors } from './themes';
import Splash from './containers/Splash';
import Login from './containers/Login';
import Home from './containers/Home';
import Notification from './containers/Notification';
import Profile from './containers/Profile';
import BookPod from './containers/BookPod';
import IconWithBadge from './components/IconWithBadge';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const defaultStyle = {
    headerStyle: {
        borderBottomWidth: 0, //for ios
        shadowOpacity: 0, //for ios
        elevation: 0, //for android
    },
    shadowColor: 'transparent',
    borderBottomWidth: 0,
    headerBackTitle: " ",
    headerTitleAlign: 'center',
}

function HomeTab() {
    return (
        <Stack.Navigator screenOptions={({ navigation }) => ({
            ...defaultStyle,
        })}>
            <Stack.Screen
                name={'Home'}
                component={Home}
                options={Home.navigationOptions}
            />
        </Stack.Navigator>
    )
}

function NotificationTab() {
    return (
        <Stack.Navigator screenOptions={({ navigation }) => ({
            ...defaultStyle,
        })}>
            <Stack.Screen
                name={'Notification'}
                component={Notification}
                options={Notification.navigationOptions}
            />
        </Stack.Navigator>
    )
}

function ProfileTab() {
    return (
        <Stack.Navigator screenOptions={({ navigation }) => ({
            ...defaultStyle,
        })}>
            <Stack.Screen
                name={'Profile'}
                component={Profile}
                options={Profile.navigationOptions}
            />
        </Stack.Navigator>
    )
}

function DashboardApp(props) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    const homeBadge = props.badge;
                    let badgeTotal = 0;

                    if (homeBadge && (route.name == 'Notification')) {
                        badgeTotal = homeBadge;
                    }
                    return (
                        <IconWithBadge
                            name={route.name}
                            color={color}
                            focused={focused}
                            badgeCount={badgeTotal}
                        />
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: Colors.primary,
                inactiveTintColor: 'gray',
                safeAreaInset: { bottom: 'never', top: 'never' },
            }}>
            <Tab.Screen name={'Home'} component={HomeTab} />
            <Tab.Screen name={'Notification'} component={NotificationTab} />
            <Tab.Screen name={'Profile'} component={ProfileTab} />

        </Tab.Navigator>
    );
}

const mapStateToProps = (state, ownProps) => {
    const { badge } = state.app;
    return { badge }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardApp)

export default function StackNavigation(props) {
    const stackRef = useRef('APP_NAV');

    useEffect(() => {
        props.stackRef(stackRef);
    }, [stackRef]);

    return (
        <NavigationContainer ref={stackRef}>
            <Stack.Navigator initialRouteName={'Splash'} screenOptions={({ navigation }) => ({
                ...defaultStyle,
                headerBackImage: () => {
                    return (
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 10 }} >
                            <Image source={require("./assets/images/arrow_left.png")} />
                        </TouchableOpacity>
                    )
                },
            })}>
                <Stack.Screen
                    name={'Splash'}
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Login'}
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'Dashboard'}
                    component={Dashboard}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name={'BookPod'}
                    component={BookPod}
                    options={BookPod.navigationOptions}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}