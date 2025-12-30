# Hướng dẫn Setup Ảnh cho Netlify

## Vấn đề
Netlify không hiểu cách import ảnh từ `src/assets` trong production build. Cần di chuyển ảnh vào `public/assets` để hoạt động đúng.

## Giải pháp

### Bước 1: Tạo thư mục public/assets
```bash
mkdir public/assets
```

### Bước 2: Copy tất cả ảnh từ src/assets sang public/assets

**Windows PowerShell:**
```powershell
Copy-Item -Path "src\assets\*" -Destination "public\assets\" -Recurse
```

**Windows CMD:**
```cmd
xcopy /E /I src\assets public\assets
```

**Linux/Mac:**
```bash
cp -r src/assets/* public/assets/
```

### Bước 3: Kiểm tra
Sau khi copy, bạn sẽ có cấu trúc:
```
public/
  assets/
    a1.jpg
    a2.jpg
    ...
    z4.jpg
```

### Bước 4: Build và Deploy
```bash
npm run build
# hoặc
yarn build
```

Sau đó deploy lên Netlify. Ảnh sẽ được serve từ `/assets/` và hoạt động đúng cách.

## Lưu ý
- File `products.ts` đã được cập nhật để sử dụng `getImagePath()` helper function
- Helper function tự động thêm prefix `/assets/` vào đường dẫn ảnh
- Ảnh sẽ được serve trực tiếp từ public folder, không cần qua build process

## Troubleshooting
Nếu ảnh vẫn không hiển thị:
1. Kiểm tra xem ảnh đã được copy vào `public/assets/` chưa
2. Kiểm tra console browser để xem lỗi 404
3. Đảm bảo đường dẫn trong `getImagePath()` đúng với tên file trong `public/assets/`

