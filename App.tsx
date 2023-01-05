// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, StatusBar } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

import React, { Component } from "react";
import { BackHandler } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default class App extends Component {
	WEBVIEW_REF: React.RefObject<any>;
	constructor(props: {} | Readonly<{}>) {
		super(props);
		this.WEBVIEW_REF = React.createRef();
	}

	componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
	}

	handleBackButton = () => {
		this.WEBVIEW_REF.current.goBack();
		return true;
	};

	onNavigationStateChange(navState: { canGoBack: any }) {
		this.setState({
			canGoBack: navState.canGoBack,
		});
	}

	render(): React.ReactNode {
		return (
			<SafeAreaProvider>
				<SafeAreaView>
					<View style={styles.container}>
						<StatusBar />
						<WebView
							source={{ uri: "https://royalrosetrading.com/" }}
							ref={this.WEBVIEW_REF}
							onNavigationStateChange={this.onNavigationStateChange.bind(this)}
						/>
					</View>
				</SafeAreaView>
			</SafeAreaProvider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		// marginTop: StatusBar.currentHeight,s
	},
});
