# 🚀 Hướng dẫn Deploy & Chạy trên Thiết bị Thật

## 📱 Phần 1: Cài đặt Android Development Environment

### Bước 1: Cài đặt Android Studio

1. **Download Android Studio:**
   - Truy cập: https://developer.android.com/studio
   - Download phiên bản cho macOS
   - Mở file `.dmg` và kéo vào thư mục Applications

2. **Cài đặt Android SDK:**
   - Mở Android Studio
   - Click "More Actions" → "SDK Manager"
   - Trong tab "SDK Platforms", chọn:
     - ✅ Android 13.0 (Tiramisu) - API Level 33
     - ✅ Android SDK Platform 33
   - Trong tab "SDK Tools", chọn:
     - ✅ Android SDK Build-Tools 33
     - ✅ Android SDK Platform-Tools
     - ✅ Android Emulator
     - ✅ Android SDK Tools
   - Click "Apply" để tải về

3. **Cấu hình Environment Variables:**

   Mở Terminal và chạy:
   ```bash
   # Mở file cấu hình shell
   nano ~/.zshrc
   
   # Thêm các dòng sau vào cuối file:
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   
   # Lưu file: Ctrl+O, Enter, Ctrl+X
   
   # Reload configuration
   source ~/.zshrc
   ```

4. **Kiểm tra cài đặt:**
   ```bash
   # Kiểm tra adb
   adb --version
   # Nên hiển thị: Android Debug Bridge version x.x.x
   
   # Kiểm tra ANDROID_HOME
   echo $ANDROID_HOME
   # Nên hiển thị: /Users/hieupt/Library/Android/sdk
   ```

## 🔗 Phần 2: Push lên GitHub

### Cách 1: Sử dụng GitHub Website (Khuyên dùng cho người mới)

1. **Tạo repository trên GitHub:**
   - Truy cập: https://github.com/new
   - Repository name: `todo-app-react-native`
   - Description: `Professional TODO List app - React Native & TypeScript`
   - Chọn Public/Private
   - **KHÔNG** tick "Initialize with README"
   - Click "Create repository"

2. **Push code lên GitHub:**
   ```bash
   cd /Users/hieupt/Documents/TODO
   
   # Thêm remote (thay YOUR_USERNAME bằng username GitHub của bạn)
   git remote add origin https://github.com/YOUR_USERNAME/todo-app-react-native.git
   
   # Đổi tên branch sang main (nếu cần)
   git branch -M main
   
   # Push lên GitHub
   git push -u origin main
   ```

3. **Nhập credentials:**
   - Username: Tên GitHub của bạn
   - Password: Sử dụng **Personal Access Token** (không phải password thường)
   
   **Tạo Personal Access Token:**
   - Vào: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Chọn scope: `repo` (full control)
   - Copy token và dùng làm password

### Cách 2: Sử dụng GitHub CLI (Tự động hơn)

1. **Cài đặt GitHub CLI:**
   ```bash
   brew install gh
   ```

2. **Login và tạo repo:**
   ```bash
   cd /Users/hieupt/Documents/TODO
   
   # Đăng nhập GitHub
   gh auth login
   
   # Tạo repo và push (chọn public/private khi được hỏi)
   gh repo create todo-app-react-native --source=. --public --push
   ```

## 📱 Phần 3: Chạy trên Thiết bị Android Thật

### Bước 1: Chuẩn bị thiết bị Android

1. **Bật Developer Options:**
   - Vào Settings → About phone
   - Tìm "Build number" 
   - Tap 7 lần vào Build number
   - Xuất hiện thông báo "You are now a developer!"

2. **Bật USB Debugging:**
   - Vào Settings → System → Developer options
   - Bật "USB debugging"
   - Bật "Install via USB" (nếu có)

3. **Kết nối với máy tính:**
   - Cắm dây USB từ điện thoại vào Mac
   - Trên điện thoại sẽ có popup "Allow USB debugging?"
   - Tick "Always allow from this computer"
   - Click "OK"

### Bước 2: Cài đặt dependencies

```bash
cd /Users/hieupt/Documents/TODO

# Cài các dependencies
npm install

# Cài Gradle dependencies (chỉ lần đầu)
cd android
./gradlew clean
cd ..
```

### Bước 3: Kiểm tra kết nối

```bash
# Kiểm tra thiết bị đã kết nối chưa
adb devices

# Kết quả mong muốn:
# List of devices attached
# ABC123456789    device
```

Nếu thấy "unauthorized" → Kiểm tra lại popup trên điện thoại

Nếu không thấy device → Thử:
```bash
adb kill-server
adb start-server
adb devices
```

### Bước 4: Chạy ứng dụng

**Terminal 1 - Start Metro:**
```bash
cd /Users/hieupt/Documents/TODO
npm start
```

**Terminal 2 - Build và cài đặt:**
```bash
cd /Users/hieupt/Documents/TODO
npm run android
```

Hoặc chạy trực tiếp:
```bash
npx react-native run-android
```

### Bước 5: Live Reload trong Development

Sau khi app đã cài trên điện thoại:

1. **Bật Dev Menu:**
   - Lắc điện thoại (shake gesture)
   - Hoặc chạy: `adb shell input keyevent 82`

2. **Bật Hot Reload:**
   - Trong Dev Menu chọn "Enable Hot Reloading"
   - Hoặc "Enable Fast Refresh"

3. **Kết nối Metro:**
   - Nếu không tự kết nối, vào Dev Menu
   - Chọn "Settings"
   - Đảm bảo điện thoại và Mac cùng WiFi
   - Nhập IP Mac: `<YOUR_MAC_IP>:8081`

## 🐛 Phần 4: Xử lý lỗi thường gặp

### Lỗi 1: "Unable to load script"

**Nguyên nhân:** Metro bundler chưa chạy hoặc điện thoại không kết nối được

**Giải pháp:**
```bash
# Xóa cache và restart
npm start -- --reset-cache

# Hoặc
rm -rf /tmp/metro-*
npm start
```

### Lỗi 2: "SDK location not found"

**Nguyên nhân:** Android SDK chưa cấu hình đúng

**Giải pháp:**
```bash
# Tạo file local.properties
cd /Users/hieupt/Documents/TODO/android
echo "sdk.dir=/Users/hieupt/Library/Android/sdk" > local.properties
```

### Lỗi 3: "Execution failed for task ':app:installDebug'"

**Nguyên nhân:** Thiết bị không được authorize hoặc app cũ conflict

**Giải pháp:**
```bash
# Gỡ app cũ nếu có
adb uninstall com.todoapp

# Build lại
cd /Users/hieupt/Documents/TODO
npm run android
```

### Lỗi 4: "Could not connect to development server"

**Nguyên nhân:** Firewall hoặc network issues

**Giải pháp 1 - Reverse port:**
```bash
adb reverse tcp:8081 tcp:8081
npm start
```

**Giải pháp 2 - Dùng IP thủ công:**
```bash
# Lấy IP của Mac
ipconfig getifaddr en0

# Trên app, vào Dev Menu → Settings
# Dev Settings → Debug server host & port
# Nhập: YOUR_MAC_IP:8081
```

### Lỗi 5: "BUILD FAILED" với Gradle

**Giải pháp:**
```bash
cd /Users/hieupt/Documents/TODO/android

# Clean build
./gradlew clean

# Build lại với debug info
./gradlew assembleDebug --stacktrace

# Nếu vẫn lỗi, xóa cache Gradle
rm -rf ~/.gradle/caches/
./gradlew clean build
```

### Lỗi 6: Port 8081 đã được sử dụng

**Giải pháp:**
```bash
# Kill process trên port 8081
lsof -ti:8081 | xargs kill -9

# Start lại Metro
npm start
```

### Lỗi 7: React Native version mismatch

**Giải pháp:**
```bash
cd /Users/hieupt/Documents/TODO

# Xóa node_modules và reinstall
rm -rf node_modules
npm install

# Xóa cache
npm start -- --reset-cache
```

## ✅ Checklist Kiểm tra

Trước khi chạy, đảm bảo:

- [ ] Android Studio đã cài đặt
- [ ] Android SDK 33 đã cài đặt
- [ ] ANDROID_HOME đã cấu hình
- [ ] `adb devices` hiển thị thiết bị
- [ ] Developer Options đã bật trên điện thoại
- [ ] USB Debugging đã bật
- [ ] Đã chạy `npm install`
- [ ] Đã chạy `cd android && ./gradlew clean`

## 📊 Build cho Production

### Tạo APK Release:

```bash
cd /Users/hieupt/Documents/TODO/android

# Build release APK
./gradlew assembleRelease

# APK sẽ nằm ở:
# android/app/build/outputs/apk/release/app-release.apk
```

### Tạo AAB cho Google Play Store:

```bash
cd /Users/hieupt/Documents/TODO/android

# Build release AAB
./gradlew bundleRelease

# AAB sẽ nằm ở:
# android/app/build/outputs/bundle/release/app-release.aab
```

## 🎯 Tips & Best Practices

1. **Luôn test trên thiết bị thật** - Emulator không phản ánh đúng performance
2. **Bật Fast Refresh** - Tiết kiệm thời gian development
3. **Dùng Flipper** - Debug tool mạnh mẽ cho React Native
4. **Kiểm tra logs:**
   ```bash
   # Xem logs của app
   adb logcat | grep -i "ReactNativeJS"
   
   # Hoặc trong Metro terminal
   ```
5. **Clear cache thường xuyên** khi gặp vấn đề lạ

## 📞 Cần trợ giúp?

1. Kiểm tra [React Native Docs](https://reactnative.dev/docs/running-on-device)
2. Xem logs: `adb logcat`
3. Check Metro bundler logs
4. Tìm lỗi tương tự trên GitHub Issues

---

**Chúc bạn thành công! 🚀**

