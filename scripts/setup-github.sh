#!/bin/bash

# Script setup và push lên GitHub

# Màu sắc
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🐙 GitHub Setup Script${NC}"
echo ""

# Kiểm tra git
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git chưa được cài đặt!${NC}"
    exit 1
fi

# Kiểm tra xem đã có remote chưa
if git remote | grep -q "origin"; then
    echo -e "${YELLOW}⚠️  Remote 'origin' đã tồn tại${NC}"
    current_remote=$(git remote get-url origin)
    echo "Remote hiện tại: $current_remote"
    echo ""
    read -p "Bạn có muốn thay đổi? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Giữ nguyên remote hiện tại"
        exit 0
    fi
    git remote remove origin
fi

echo ""
echo "Có 2 cách để push lên GitHub:"
echo ""
echo "1. Sử dụng GitHub CLI (Tự động) - Khuyên dùng"
echo "2. Thủ công (Tạo repo trên web)"
echo ""
read -p "Chọn phương án (1/2): " -n 1 -r choice
echo ""

if [ "$choice" == "1" ]; then
    # Sử dụng GitHub CLI
    if ! command -v gh &> /dev/null; then
        echo -e "${YELLOW}📦 GitHub CLI chưa cài đặt. Đang cài...${NC}"
        brew install gh
    fi
    
    echo -e "${BLUE}🔐 Đang đăng nhập GitHub...${NC}"
    gh auth status &>/dev/null || gh auth login
    
    echo ""
    read -p "Repository name [todo-app-react-native]: " repo_name
    repo_name=${repo_name:-todo-app-react-native}
    
    echo ""
    read -p "Public hay Private? (pub/priv) [pub]: " visibility
    visibility=${visibility:-pub}
    
    if [ "$visibility" == "pub" ]; then
        visibility_flag="--public"
    else
        visibility_flag="--private"
    fi
    
    echo ""
    echo -e "${YELLOW}🚀 Đang tạo repository và push...${NC}"
    
    gh repo create "$repo_name" \
        --source=. \
        $visibility_flag \
        --description "Professional TODO List app built with React Native & TypeScript" \
        --push
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Push thành công!${NC}"
        repo_url=$(gh repo view --json url -q .url)
        echo -e "${GREEN}Repository: $repo_url${NC}"
    else
        echo -e "${RED}❌ Có lỗi xảy ra!${NC}"
        exit 1
    fi
    
else
    # Thủ công
    echo ""
    echo -e "${YELLOW}📝 Hướng dẫn thủ công:${NC}"
    echo ""
    echo "1. Truy cập: https://github.com/new"
    echo "2. Repository name: todo-app-react-native"
    echo "3. Description: Professional TODO List app - React Native & TypeScript"
    echo "4. Chọn Public/Private"
    echo "5. KHÔNG tick 'Initialize with README'"
    echo "6. Click 'Create repository'"
    echo ""
    read -p "Đã tạo xong? Nhấn Enter để tiếp tục..."
    echo ""
    
    read -p "Nhập GitHub username của bạn: " github_username
    
    if [ -z "$github_username" ]; then
        echo -e "${RED}❌ Username không được để trống!${NC}"
        exit 1
    fi
    
    read -p "Repository name [todo-app-react-native]: " repo_name
    repo_name=${repo_name:-todo-app-react-native}
    
    repo_url="https://github.com/$github_username/$repo_name.git"
    
    echo ""
    echo -e "${YELLOW}🔗 Đang thêm remote...${NC}"
    git remote add origin "$repo_url"
    
    echo -e "${YELLOW}📤 Đang push lên GitHub...${NC}"
    git branch -M main
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}✅ Push thành công!${NC}"
        echo -e "${GREEN}Repository: https://github.com/$github_username/$repo_name${NC}"
    else
        echo ""
        echo -e "${RED}❌ Push thất bại!${NC}"
        echo ""
        echo "Có thể bạn cần Personal Access Token:"
        echo "1. Vào: https://github.com/settings/tokens"
        echo "2. Click 'Generate new token (classic)'"
        echo "3. Chọn scope: 'repo'"
        echo "4. Copy token"
        echo "5. Dùng token làm password khi push"
        echo ""
        read -p "Bạn có muốn thử lại với token? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git push -u origin main
        fi
    fi
fi

echo ""
echo -e "${BLUE}📊 Git status:${NC}"
git status
echo ""
echo -e "${GREEN}🎉 Hoàn tất!${NC}"

