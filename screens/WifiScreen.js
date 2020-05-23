import WifiManager from 'react-native-wifi';
 
WifiManager.connectToProtectedSSID(ssid, password, isWep)
.then(() => {
    console.log('Connected successfully!')
}, () => {
    console.log('Connection failed!')
})
 
WifiManager.getCurrentWifiSSID()
.then((ssid) => {
    console.log("Your current connected wifi SSID is " + ssid)
}, () => {
    console.log('Cannot get current SSID!')
})