#!/bin/bash

# Script tự động cài đặt Android environment cho macOS

echo "🚀 Bắt đầu cài đặt Android Development Environment..."

# Màu sắc cho terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Kiểm tra Homebrew
if ! command -v brew &> /dev/null; then
    echo -e "${RED}❌ Homebrew chưa được cài đặt!${NC}"
    echo "Vui lòng cài Homebrew trước: https://brew.sh"
    exit 1
fi

echo -e "${GREEN}✅ Homebrew đã cài đặt${NC}"

# Kiểm tra Java
if ! command -v java &> /dev/null; then
    echo -e "${YELLOW}⚠️  Java chưa được cài đặt. Đang cài đặt...${NC}"
    brew install --cask zulu11
else
    java_version=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d'.' -f1)
    if [ "$java_version" -ge 11 ]; then
        echo -e "${GREEN}✅ Java $java_version đã cài đặt${NC}"
    else
        echo -e "${YELLOW}⚠️  Java version < 11. Đang cài đặt Java 11...${NC}"
        brew install --cask zulu11
    fi
fi

# Cấu hình ANDROID_HOME
ANDROID_HOME_PATH="$HOME/Library/Android/sdk"

if [ ! -d "$ANDROID_HOME_PATH" ]; then
    echo -e "${YELLOW}⚠️  Android SDK chưa được cài đặt${NC}"
    echo "Vui lòng:"
    echo "1. Cài đặt Android Studio từ: https://developer.android.com/studio"
    echo "2. Mở Android Studio và cài SDK Platform 33"
    echo "3. Chạy lại script này"
    exit 1
fi

echo -e "${GREEN}✅ Android SDK đã cài đặt tại: $ANDROID_HOME_PATH${NC}"

# Cấu hình environment variables
SHELL_CONFIG=""
if [ -f "$HOME/.zshrc" ]; then
    SHELL_CONFIG="$HOME/.zshrc"
elif [ -f "$HOME/.bash_profile" ]; then
    SHELL_CONFIG="$HOME/.bash_profile"
else
    SHELL_CONFIG="$HOME/.zshrc"
    touch "$SHELL_CONFIG"
fi

echo -e "${YELLOW}📝 Đang cấu hình environment variables...${NC}"

# Kiểm tra xem đã có cấu hình chưa
if ! grep -q "ANDROID_HOME" "$SHELL_CONFIG"; then
    cat >> "$SHELL_CONFIG" << 'EOF'

# Android SDK
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
EOF
    echo -e "${GREEN}✅ Đã thêm ANDROID_HOME vào $SHELL_CONFIG${NC}"
else
    echo -e "${GREEN}✅ ANDROID_HOME đã được cấu hình${NC}"
fi

# Source lại config
source "$SHELL_CONFIG"

# Kiểm tra adb
if command -v adb &> /dev/null; then
    adb_version=$(adb --version | head -n 1)
    echo -e "${GREEN}✅ ADB đã sẵn sàng: $adb_version${NC}"
else
    echo -e "${RED}❌ ADB chưa sẵn sàng${NC}"
    echo "Vui lòng:"
    echo "1. Mở Android Studio"
    echo "2. Vào SDK Manager và cài Android SDK Platform-Tools"
    echo "3. Restart terminal và chạy lại script"
    exit 1
fi

echo ""
echo -e "${GREEN}🎉 Cài đặt hoàn tất!${NC}"
echo ""
echo "Các bước tiếp theo:"
echo "1. Restart terminal: source $SHELL_CONFIG"
echo "2. Kết nối thiết bị Android và bật USB Debugging"
echo "3. Kiểm tra: adb devices"
echo "4. Chạy app: npm run android"

