import React, { Component, useRef } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View } from "react-native";
import { inject, observer } from "mobx-react";
import { SCREEN_WIDTH } from "../../res/styles/GlobalStyles";
const AliCaptchaButton = inject("")(
    observer(({ callBack }) => {

        const ChildRef = useRef()
        const webOnMessage = event => {
            const data = event.nativeEvent.data
            try {
                let userInfoDict = JSON.parse(data)
            } catch (error) { }
        }

        return (
            <View style={styles.container}>
                <WebView
                    source={require('./html/captcha.html')}
                    ref={ChildRef}
                    style={{ width: SCREEN_WIDTH - 65, alignSelf: 'center', paddingTop: 0, marginTop: 0 }}
                    startInLoadingState={true}
                    automaticallyAdjustContentInsets={true}
                    javaScriptEnabled={true}
                    onMessage={async (event) => {
                        let backData = {};
                        backData = JSON.parse(event.nativeEvent.data);
                        callBack && callBack(backData)
                    }}
                    onLoadEnd={() => {
                        // 加载结束后动态获取网页高度
                        let optionStr = JSON.stringify({
                            appKey: '你的app key',
                            scene: '应用场景',
                            language: 'cn',
                        })

                        //样式修改
                        let customStyle = ""

                        const script = `window._init('nc', {\"height\":40}, '${optionStr}', '${customStyle}');`;
                        //修改整个webview 背景颜色，最好调整为你的模块的背景色
                        const bgStyle = `document.body.style.backgroundColor=\"#BDBDBD\"`
                        ChildRef && ChildRef.current.injectJavaScript(bgStyle);
                        ChildRef && ChildRef.current.injectJavaScript(script);
                    }}
                    scrollEnabled={false}
                ></WebView>
            </View >
        );
    })
);

export default AliCaptchaButton;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',//修改为你的项目背景色
        height: 56,
    },
});
