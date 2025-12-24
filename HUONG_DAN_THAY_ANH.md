# 📸 HƯỚNG DẪN TẢI ẢNH VỀ VÀ THAY THẾ

## Các bước chi tiết:

### ✅ Bước 1: Tải ảnh về máy
- Tải ảnh từ internet (Google Images, Unsplash, v.v.)
- Hoặc sử dụng ảnh có sẵn trên máy tính của bạn
- **Lưu ý:** Nên dùng ảnh có kích thước phù hợp (khuyến nghị: 800x800px trở lên)

### ✅ Bước 2: Copy ảnh vào thư mục assets

**Cách 1: Dùng File Explorer (Windows)**
1. Mở File Explorer
2. Điều hướng đến: `C:\Users\admin\Desktop\test\haven-tech\src\assets\`
3. Copy file ảnh vào thư mục này

**Cách 2: Dùng VS Code/Cursor**
1. Mở thư mục `src/assets/` trong VS Code/Cursor
2. Kéo thả file ảnh vào thư mục này
3. Hoặc click chuột phải → Paste

**Ví dụ cấu trúc thư mục sau khi thêm ảnh:**
```
src/
  assets/
    product-phone.jpg          (ảnh cũ)
    smartphone-new.jpg         (ảnh mới - bạn vừa thêm)
    smartphone-back.jpg        (ảnh mới - bạn vừa thêm)
    smartphone-side.jpg        (ảnh mới - bạn vừa thêm)
```

### ✅ Bước 3: Mở file products.ts và thêm import

Mở file: `src/data/products.ts`

Tìm phần import ở đầu file (dòng 1-6):
```typescript
import productPhone from "@/assets/product-phone.jpg";
import productHeadphones from "@/assets/product-headphones.jpg";
import productSmartHome from "@/assets/product-smart-home.jpg";
import productLaptop from "@/assets/product-laptop.jpg";
import productWatch from "@/assets/product-watch.jpg";
import productEarbuds from "@/assets/product-earbuds.jpg";
```

**Thêm các dòng import mới:**
```typescript
import productPhone from "@/assets/product-phone.jpg";
import productHeadphones from "@/assets/product-headphones.jpg";
// ... các import khác ...

// Thêm các dòng này (thay tên file bằng tên file ảnh bạn vừa thêm)
import smartphoneNew from "@/assets/smartphone-new.jpg";
import smartphoneBack from "@/assets/smartphone-back.jpg";
import smartphoneSide from "@/assets/smartphone-side.jpg";
```

**Lưu ý quan trọng:**
- Tên biến (ví dụ: `smartphoneNew`) có thể đặt tùy ý, nhưng nên đặt dễ nhớ
- Đường dẫn `@/assets/` phải khớp với tên file bạn đã copy vào thư mục
- Tên file không được có khoảng trắng (dùng `-` hoặc `_`)

### ✅ Bước 4: Thay thế ảnh trong sản phẩm

Tìm sản phẩm bạn muốn thay ảnh, ví dụ:

**TRƯỚC (ảnh cũ):**
```typescript
{
  id: "ultra-pro-smartphone-15",
  image: productPhone,  // ← Ảnh cũ
  images: [productPhone, productPhone, productPhone],  // ← Mảng ảnh cũ
  name: "Ultra Pro Smartphone 15",
  category: "Smartphones",
  // ... các thông tin khác
}
```

**SAU (ảnh mới):**
```typescript
{
  id: "ultra-pro-smartphone-15",
  image: smartphoneNew,  // ← Ảnh chính mới
  images: [smartphoneNew, smartphoneBack, smartphoneSide],  // ← Mảng ảnh mới
  name: "Ultra Pro Smartphone 15",
  category: "Smartphones",
  // ... các thông tin khác
}
```

### ✅ Bước 5: Lưu và kiểm tra

1. **Lưu file** `products.ts` (Ctrl + S)
2. **Kiểm tra lỗi:** Nếu có lỗi, thường là:
   - Tên file không khớp
   - Đường dẫn sai
   - File ảnh chưa được copy vào thư mục assets
3. **Chạy lại ứng dụng** để xem ảnh mới

---

## 📝 Ví dụ cụ thể:

### Ví dụ: Thay ảnh cho sản phẩm "Ultra Pro Smartphone 15"

**1. Bạn đã tải 3 ảnh về:**
- `phone-front.jpg`
- `phone-back.jpg`
- `phone-side.jpg`

**2. Copy 3 file này vào:** `src/assets/`

**3. Thêm import:**
```typescript
import phoneFront from "@/assets/phone-front.jpg";
import phoneBack from "@/assets/phone-back.jpg";
import phoneSide from "@/assets/phone-side.jpg";
```

**4. Thay đổi trong sản phẩm:**
```typescript
{
  id: "ultra-pro-smartphone-15",
  image: phoneFront,  // Ảnh chính
  images: [phoneFront, phoneBack, phoneSide],  // Gallery ảnh
  name: "Ultra Pro Smartphone 15",
  // ...
}
```

---

## ⚠️ Lưu ý quan trọng:

1. **Tên file:** Không dùng khoảng trắng, dùng `-` hoặc `_`
   - ✅ Đúng: `smartphone-new.jpg`
   - ❌ Sai: `smartphone new.jpg`

2. **Định dạng ảnh:** Hỗ trợ `.jpg`, `.jpeg`, `.png`, `.webp`

3. **Kích thước ảnh:** Nên dùng ảnh có kích thước phù hợp (không quá lớn để tránh load chậm)

4. **Đường dẫn:** Luôn bắt đầu với `@/assets/` (không phải `./assets/`)

5. **Tên biến:** Có thể đặt tùy ý nhưng nên đặt dễ nhớ và không trùng với tên khác

---

## 🆘 Xử lý lỗi thường gặp:

**Lỗi: "Cannot find module '@/assets/xxx.jpg'"**
- Kiểm tra file ảnh đã được copy vào thư mục `src/assets/` chưa
- Kiểm tra tên file có khớp không (phân biệt chữ hoa/thường)
- Kiểm tra đường dẫn import có đúng không

**Lỗi: "Unexpected token"**
- Kiểm tra cú pháp import có đúng không
- Đảm bảo có dấu `;` ở cuối dòng import

**Ảnh không hiển thị:**
- Kiểm tra lại tên file và đường dẫn
- Thử restart lại ứng dụng
- Xóa cache trình duyệt (Ctrl + Shift + R)

