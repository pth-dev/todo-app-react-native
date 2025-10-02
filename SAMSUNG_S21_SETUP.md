# Hướng dẫn Setup Samsung S21 cho React Native Development

## 🔧 Bật Developer Options trên Samsung S21

### Các bước chi tiết:

#### 1. Mở Settings (Cài đặt)
- Vuốt từ trên xuống
- Nhấn biểu tượng ⚙️

#### 2. Tìm Build Number

**Đường dẫn trên Samsung S21:**
```
Settings (Cài đặt)
  → About phone (Giới thiệu điện thoại)  
  → Software information (Thông tin phần mềm)
  → Build number (Số bản dựng) ← TAP 7 LẦN VÀO ĐÂY
```

**Lưu ý:** 
- Màn hình có thể khác một chút tùy phiên bản One UI
- Nếu không thấy "Software information", tìm trực tiếp "Build number" trong About phone

#### 3. Tap 7 lần vào Build number

1. Tap liên tục 7 lần
2. Thông báo xuất hiện:
   - Lần 1-6: "You are now X steps away from being a developer"
   - Lần 7: "You are now a developer!" ✅
3. Có thể cần nhập PIN/Password/Pattern

#### 4. Bật USB Debugging

**Sau khi bật Developer mode:**

```
Settings (Cài đặt)
  → Developer options (Tùy chọn nhà phát triển)
  → Cuộn xuống tìm "Debugging"
```

**Bật các tùy chọn sau:**
- ✅ **USB debugging** - BẮT BUỘC
- ✅ **Install via USB** - Cho phép cài APK qua USB
- ✅ **USB debugging (Security settings)** - Cài từ nguồn không rõ qua USB

**Tùy chọn (khuyến nghị):**
- ✅ **Stay awake** - Màn hình không tắt khi sạc
- ✅ **Select USB Configuration** → chọn "MTP (Media Transfer Protocol)"

#### 5. Kết nối với Mac

**Chuẩn bị:**
- Dây cáp USB-C chính hãng (Samsung hoặc chất lượng tốt)
- Mac đã cài ADB (qua Android SDK)

**Các bước:**

1. **Cắm USB-C** từ Samsung S21 vào Mac

2. **Trên S21 sẽ hiện popup:**
   ```
   Allow USB debugging?
   The computer's RSA key fingerprint is:
   XX:XX:XX:...
   
   [ ] Always allow from this computer
   
   [CANCEL]  [OK]
   ```

3. ✅ **Tick vào "Always allow from this computer"**
4. Nhấn **[OK]**

5. **Kiểm tra trên Mac:**
   ```bash
   adb devices
   ```
   
   **Kết quả mong muốn:**
   ```
   List of devices attached
   R3CM30XXXXX    device
   ```
   
   **Nếu thấy "unauthorized":**
   - Kiểm tra lại popup trên điện thoại
   - Chạy: `adb kill-server && adb start-server`
   - Rút dây ra cắm lại

## 🚀 Chạy React Native App

### Bước 1: Cài dependencies

```bash
cd /Users/hieupt/Documents/TODO
npm install
```

### Bước 2: Port forwarding (quan trọng!)

```bash
# Forward port 8081 để Metro kết nối
adb reverse tcp:8081 tcp:8081
```

### Bước 3: Chạy app

**Terminal 1 - Metro Bundler:**
```bash
npm start
```

**Terminal 2 - Build & Deploy:**
```bash
npm run android
```

**Hoặc chạy 1 lệnh:**
```bash
npm run android
# Metro sẽ tự động start
```

### Kết quả:
- App sẽ build (~2-3 phút lần đầu)
- APK tự động cài vào S21
- App tự động mở
- Hot reload sẵn sàng! 🔥

## 📱 Sử dụng Dev Menu trên S21

### Mở Dev Menu:

**Cách 1: Lắc điện thoại**
- Lắc S21 nhẹ nhàng
- Dev Menu sẽ hiện

**Cách 2: Dùng ADB**
```bash
adb shell input keyevent 82
```

**Cách 3: Tap 3 ngón tay** (One UI)
- Tap 3 ngón tay vào màn hình

### Các tùy chọn hữu ích:

- **Enable Fast Refresh** - Tự động reload khi save file
- **Enable Hot Reloading** - Reload không mất state
- **Toggle Inspector** - Inspect UI elements
- **Show Perf Monitor** - Hiển thị FPS, Memory

## 🐛 Xử lý lỗi thường gặp

### Lỗi 1: "Could not connect to development server"

**Nguyên nhân:** Port 8081 không forward được

**Giải pháp:**
```bash
# Reverse port
adb reverse tcp:8081 tcp:8081

# Kiểm tra
adb reverse --list

# Nếu vẫn lỗi, dùng IP thủ công:
# 1. Lấy IP Mac:
ipconfig getifaddr en0

# 2. Trên app, mở Dev Menu
# 3. Settings → Dev Settings → Debug server host
# 4. Nhập: YOUR_MAC_IP:8081
```

### Lỗi 2: "Unable to load script"

**Giải pháp:**
```bash
# Clear Metro cache
npm start -- --reset-cache

# Hoặc
rm -rf /tmp/metro-* && npm start
```

### Lỗi 3: S21 không hiện trong adb devices

**Kiểm tra:**
```bash
# Kill và restart ADB
adb kill-server
adb start-server
adb devices

# Kiểm tra driver (trên Mac thường không cần)
system_profiler SPUSBDataType | grep -i samsung
```

**Nếu vẫn không được:**
1. Thử dây cáp khác
2. Thử cổng USB khác trên Mac
3. Tắt/bật lại USB debugging
4. Restart cả Mac và S21

### Lỗi 4: Build failed with Gradle

**Giải pháp:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Lỗi 5: App crash khi mở

**Xem logs:**
```bash
# Xem tất cả logs
adb logcat

# Lọc React Native logs
adb logcat | grep ReactNativeJS

# Lọc lỗi
adb logcat *:E
```

## 💡 Tips cho Samsung S21

### 1. Performance Mode
- Settings → Battery → Power mode → **High performance**
- Tắt battery optimization cho app Todo

### 2. Keep screen on
- Developer options → **Stay awake** ✅

### 3. USB Configuration
- Developer options → Select USB Configuration
- Chọn **MTP** hoặc **PTP**

### 4. Wireless Debugging (Android 11+)

**Nếu muốn debug qua WiFi:**
```bash
# Trên điện thoại
Developer options → Wireless debugging → ON

# Trên Mac
adb pair <IP>:<PORT>  # Lấy từ điện thoại
adb connect <IP>:5555
adb devices  # Sẽ thấy device qua WiFi
```

## 🎯 Checklist trước khi chạy

- [ ] Developer options đã bật
- [ ] USB debugging đã bật  
- [ ] "Always allow from this computer" đã tick
- [ ] `adb devices` hiển thị device
- [ ] Mac và S21 cùng WiFi (nếu dùng wireless)
- [ ] Đã chạy `npm install`
- [ ] Port 8081 đã reverse: `adb reverse tcp:8081 tcp:8081`

## 🔗 Tài liệu tham khảo

- [React Native - Running on Device](https://reactnative.dev/docs/running-on-device)
- [Android Debug Bridge (ADB)](https://developer.android.com/studio/command-line/adb)
- [Samsung Developer](https://developer.samsung.com/)

---

**Chúc bạn develop thành công trên Samsung S21! 🚀**

