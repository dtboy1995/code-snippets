<style lang="scss">
page {
  background-color: #f7f5f6;
}
</style>
<template>
  <div class="container">
    <button @click="openSetting">openSetting</button>
    <button @click="WIFI">WIFI</button>
    <button @click="BLE">BLE</button>

    <div>connectedWifi SSID: {{ connectedWifi }}</div>

    <div :key="wifi.BSSID" v-for="wifi in wifiList">
      {{ wifi.SSID }}+{{ wifi.BSSID }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wifiList: [],
      connectedWifi: "",
    };
  },
  async onLoad() {
    try {
    } catch (err) {}
  },
  methods: {
    async BLE() {
      try {
        uni.onBluetoothDeviceFound((devices) => {
          console.log(devices);
        });
        uni.onBluetoothAdapterStateChange((state) => {
          console.log(state);
        });
        let [err] = await uni.openBluetoothAdapter();
        if (err) {
          console.log(err);
          // open bluetooth
        } else {
          let scan = await uni.startBluetoothDevicesDiscovery();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async WIFI() {
      let [err, { authSetting }] = await uni.getSetting({});
      if (!authSetting["scope.userLocation"]) {
        let [err] = await uni.authorize({
          scope: "scope.userLocation",
        });
        if (err) {
          // openSetting
        } else {
        }
      } else {
        uni.onGetWifiList(({ wifiList }) => {
          console.log(wifiList);
          this.wifiList = wifiList;
        });
        let [err] = await uni.startWifi();
        if (err) {
          console.log(err);
        } else {
          let connectedWifi = await uni.getConnectedWifi();
          let { wifi } = connectedWifi[1];
          if (wifi) {
            this.connectedWifi = wifi.SSID;
          }
          let [err] = await uni.getWifiList();
          if (err) {
            console.log(err);
          }
        }
      }
    },
    async openSetting() {
      try {
        let [err, { authSetting }] = await uni.openSetting({});
        if (!authSetting["scope.userLocation"]) {
          uni.showToast({ title: "授权失败", icon: "none" });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {},
  // "permission": {
	//		"scope.userLocation": {
	//			"desc": "获取wifi列表"
	//		}
	//	}
};
</script>


