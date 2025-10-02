#!/bin/bash

# Script chạy app trên thiết bị Android thật

# Màu sắc
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📱 Todo App - Chạy trên thiết bị Android${NC}"
echo ""

# Kiểm tra adb
if ! command -v adb &> /dev/null; then
    echo -e "${RED}❌ ADB chưa được cài đặt!${NC}"
    echo "Chạy: ./scripts/setup-android.sh"
    exit 1
fi

# Kiểm tra thiết bị
echo -e "${YELLOW}🔍 Đang kiểm tra thiết bị...${NC}"
devices=$(adb devices | grep -w "device" | wc -l)

if [ "$devices" -eq 0 ]; then
    echo -e "${RED}❌ Không tìm thấy thiết bị Android nào!${NC}"
    echo ""
    echo "Vui lòng:"
    echo "1. Kết nối thiết bị qua USB"
    echo "2. Bật Developer Options trên điện thoại"
    echo "3. Bật USB Debugging"
    echo "4. Chấp nhận popup 'Allow USB debugging' trên điện thoại"
    echo ""
    echo "Sau đó chạy lại script này."
    exit 1
fi

adb devices
echo -e "${GREEN}✅ Tìm thấy $devices thiết bị${NC}"
echo ""

# Reverse port cho Metro
echo -e "${YELLOW}🔄 Đang cấu hình port forwarding...${NC}"
adb reverse tcp:8081 tcp:8081
echo -e "${GREEN}✅ Port 8081 đã được forward${NC}"
echo ""

# Gỡ app cũ nếu có
echo -e "${YELLOW}🗑️  Đang gỡ app cũ (nếu có)...${NC}"
adb uninstall com.todoapp 2>/dev/null
echo ""

# Cài dependencies nếu chưa
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Đang cài dependencies...${NC}"
    npm install
    echo ""
fi

# Clean Android build
echo -e "${YELLOW}🧹 Đang clean Android build...${NC}"
cd android
./gradlew clean > /dev/null 2>&1
cd ..
echo -e "${GREEN}✅ Clean hoàn tất${NC}"
echo ""

# Kiểm tra Metro
metro_running=$(lsof -ti:8081 2>/dev/null)
if [ -z "$metro_running" ]; then
    echo -e "${YELLOW}🚀 Đang khởi động Metro Bundler...${NC}"
    npm start > /dev/null 2>&1 &
    sleep 5
    echo -e "${GREEN}✅ Metro đã khởi động${NC}"
else
    echo -e "${GREEN}✅ Metro đang chạy${NC}"
fi
echo ""

# Build và cài đặt
echo -e "${YELLOW}🔨 Đang build và cài đặt app...${NC}"
echo -e "${BLUE}Quá trình này có thể mất vài phút...${NC}"
echo ""

npx react-native run-android

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 App đã được cài đặt thành công!${NC}"
    echo ""
    echo "Tips:"
    echo "- Lắc điện thoại để mở Dev Menu"
    echo "- Hoặc chạy: adb shell input keyevent 82"
    echo "- Bật 'Fast Refresh' trong Dev Menu để tự động reload"
else
    echo ""
    echo -e "${RED}❌ Có lỗi xảy ra!${NC}"
    echo ""
    echo "Thử các giải pháp sau:"
    echo "1. Kiểm tra lại kết nối USB"
    echo "2. Xem logs: adb logcat | grep ReactNativeJS"
    echo "3. Clean và build lại: cd android && ./gradlew clean"
    echo "4. Xem DEPLOY_GUIDE.md để biết thêm chi tiết"
fi

