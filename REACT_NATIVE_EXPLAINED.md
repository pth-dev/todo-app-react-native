# React Native - Giải thích Kiến trúc & Build Process

## ❓ Tại sao React Native cần Android SDK, Java, ADB?

Nhiều người nghĩ React Native chỉ là JavaScript và sẽ chạy trực tiếp trên điện thoại. **Điều này KHÔNG đúng!**

## 🏗️ Kiến trúc React Native

### React Native ≠ Web App trong WebView

React Native **KHÔNG** phải là:
- ❌ Web app chạy trong WebView (như Cordova/PhoneGap)
- ❌ Progressive Web App (PWA)
- ❌ Hybrid app với HTML/CSS/JS thông thường

React Native **ĐÚNG** là:
- ✅ App Native thật sự
- ✅ Sử dụng Native components (không phải DOM)
- ✅ JavaScript chỉ là "ngôn ngữ lập trình", không phải runtime

### Cấu trúc Kỹ thuật

```
┌─────────────────────────────────────┐
│         React Native App            │
├─────────────────────────────────────┤
│  1. JavaScript Layer                │
│     - Business Logic (bạn viết)     │
│     - React Components              │
│     - State Management              │
├─────────────────────────────────────┤
│  2. Bridge (C++)                    │
│     - Kết nối JS ↔ Native          │
│     - Serialize/Deserialize         │
├─────────────────────────────────────┤
│  3. Native Layer                    │
│     - Android: Java/Kotlin code     │
│     - iOS: Objective-C/Swift code   │
│     - Native UI Components          │
└─────────────────────────────────────┘
```

## 📱 Khi bạn viết React Native

### Code bạn viết (JavaScript):
```javascript
import { View, Text, Button } from 'react-native';

function App() {
  return (
    <View>
      <Text>Hello</Text>
      <Button title="Click me" />
    </View>
  );
}
```

### Điều xảy ra thực tế:

1. **JavaScript Engine** (Hermes/JSC) chạy code JS của bạn
2. **Bridge** chuyển đổi lệnh JS → Native
3. **Native Code** tạo ra:
   - Android: `android.view.View`, `android.widget.TextView`, `android.widget.Button`
   - iOS: `UIView`, `UILabel`, `UIButton`

→ **Kết quả**: App Native thật sự, KHÔNG phải web!

## 🔧 Tại sao cần Java & Android SDK?

### 1. Android App = Java/Kotlin Project

Khi build React Native cho Android, bạn thực chất đang build một **Android Native App** với:

```
android/
├── app/
│   ├── src/main/java/          ← Java code (Native)
│   │   └── MainActivity.java   ← Entry point của app
│   ├── src/main/res/           ← Android resources
│   └── build.gradle            ← Build config (Java-based)
├── gradle/                      ← Gradle (Java build tool)
└── build.gradle                 ← Project config
```

### 2. Gradle = Build System chạy trên Java

```bash
./gradlew assembleDebug  # ← Lệnh này chạy Java!
```

**Gradle** (công cụ build Android) được viết bằng Java/Kotlin:
- Compile Java code → Bytecode
- Bundle resources
- Tạo APK/AAB
- Sign app

→ **Không có Java/JDK = Không build được!**

### 3. Android SDK chứa tools cần thiết

```
Android SDK/
├── platform-tools/
│   ├── adb              ← Deploy & debug
│   └── fastboot         
├── build-tools/
│   ├── aapt2            ← Package resources
│   ├── zipalign         ← Optimize APK
│   └── apksigner        ← Sign APK
├── platforms/
│   └── android-33/      ← Android API 33
└── tools/
```

## 🔌 Tại sao cần ADB (Android Debug Bridge)?

### ADB làm gì?

**ADB** = Cầu nối giữa máy tính ↔ Thiết bị Android

```
Máy tính (Dev)    ←─── ADB ───→    Điện thoại Android
  │                                      │
  ├─ Build app (npm run android)        ├─ Nhận APK
  ├─ Push APK qua USB/WiFi              ├─ Cài đặt APK
  ├─ Start Metro bundler                ├─ Chạy app
  └─ Xem logs realtime                  └─ Gửi logs về
```

### Các lệnh ADB trong React Native development:

```bash
# Deploy app lên thiết bị
adb install app-debug.apk

# Forward port để Metro kết nối
adb reverse tcp:8081 tcp:8081

# Xem logs của app
adb logcat | grep ReactNative

# Mở Dev Menu
adb shell input keyevent 82

# Reload app
adb shell input text "RR"
```

→ **Không có ADB = Không deploy được app lên thiết bị!**

## 🚀 Quy trình Build đầy đủ

### Khi chạy `npm run android`:

```
1. Metro Bundler khởi động (JavaScript)
   ├─ Bundle JS code của bạn
   ├─ Transform với Babel
   └─ Tạo bundle: index.android.bundle

2. Gradle Build (Java)
   ├─ Compile Java/Kotlin code native
   ├─ Package resources (XML, images)
   ├─ Merge manifests
   ├─ Generate R.java (resource IDs)
   ├─ Convert to DEX (Dalvik bytecode)
   ├─ Tạo APK
   └─ Sign APK (debug/release)

3. ADB Deploy
   ├─ Connect đến thiết bị
   ├─ Push APK qua USB/WiFi
   ├─ Install APK: pm install
   ├─ Start activity: am start
   └─ Forward port 8081

4. App Running
   ├─ Native code khởi động (Java/Kotlin)
   ├─ Load JavaScript engine (Hermes/JSC)
   ├─ Download JS bundle từ Metro (dev mode)
   ├─ Execute JavaScript code
   └─ Bridge kết nối JS ↔ Native
```

## 📊 So sánh: React Native vs Web App

| Tiêu chí | React Native | Web App |
|----------|--------------|---------|
| **Runtime** | Native (Java/Swift) | Browser (WebView) |
| **UI Components** | Native widgets | HTML/CSS/DOM |
| **Performance** | Native speed | Web speed |
| **Build cần gì?** | Android SDK + Java | Chỉ cần browser |
| **Kết quả** | APK/IPA (native) | HTML/JS files |
| **Deploy** | Play Store/App Store | Web hosting |

## 💡 Tóm tắt

### React Native cho Android cần:

1. **Node.js & npm** 
   - Để chạy Metro bundler
   - Quản lý dependencies JavaScript

2. **Java JDK** 
   - Gradle build system chạy trên Java
   - Compile native Android code

3. **Android SDK**
   - Build tools (aapt, zipalign, etc.)
   - Platform APIs (android-33)
   - Emulator (nếu dùng)

4. **ADB (Android Debug Bridge)**
   - Deploy app lên thiết bị
   - Debug và xem logs
   - Port forwarding cho Metro

### Không thể thiếu bất kỳ thứ gì!

```
React Native Android = JavaScript + Native Android
                     = Metro Bundler + Gradle + ADB
                     = Node.js + Java + Android SDK
```

## 🎯 Kết luận

**React Native KHÔNG chạy JavaScript trực tiếp trên điện thoại!**

Thực tế:
1. JavaScript chạy trong JS Engine (Hermes)
2. Giao tiếp với Native code qua Bridge
3. Native code render UI thật sự
4. Kết quả = App Native 100%

Đó là lý do vì sao:
- Performance gần như native app
- Có thể dùng native modules
- Cần các công cụ native để build
- APK/AAB output, không phải HTML/JS

## 🔗 Tham khảo

- [React Native Architecture](https://reactnative.dev/architecture/overview)
- [Android Build Process](https://developer.android.com/build)
- [How React Native Works](https://reactnative.dev/docs/intro-react-native-components)

---

**TL;DR**: React Native = JavaScript để viết logic + Native code để render UI. Build process cần đầy đủ Android toolchain (Java, SDK, ADB) vì output cuối cùng là Android Native App (.apk), không phải web app!

