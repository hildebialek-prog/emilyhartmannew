# 📸 Hướng dẫn thêm nhiều ảnh cho sản phẩm

## Cách 1: Import từng ảnh riêng (Khuyến nghị)

Khi mỗi sản phẩm có ảnh riêng, bạn cần import từng ảnh một.

### Ví dụ: Thêm 4 ảnh cho sản phẩm "Ultra Pro Smartphone 15"

**Bước 1: Copy 4 ảnh vào thư mục assets**
```
src/assets/
  mouse1.jpg              (ảnh chính)
  mouse1-side.jpg         (ảnh phụ 1)
  mouse1-back.jpg         (ảnh phụ 2)
  mouse1-detail.jpg       (ảnh phụ 3)
```

**Bước 2: Import tất cả ảnh ở đầu file `products.ts`**

```typescript
// Ảnh cũ
import productPhone from "@/assets/mouse1.jpg";

// Thêm các ảnh mới cho sản phẩm này
import mouse1Main from "@/assets/mouse1.jpg";
import mouse1Side from "@/assets/mouse1-side.jpg";
import mouse1Back from "@/assets/mouse1-back.jpg";
import mouse1Detail from "@/assets/mouse1-detail.jpg";
```

**Bước 3: Sử dụng trong sản phẩm**

```typescript
{
  id: "ultra-pro-smartphone-15",
  image: mouse1Main,  // Ảnh chính
  images: [mouse1Side, mouse1Back, mouse1Detail],  // 3 ảnh phụ
  name: "OEM Led Custom Gaming Mouse",
  // ...
}
```

---

## Cách 2: Tái sử dụng ảnh đã import (Khi nhiều sản phẩm dùng chung ảnh)

Nếu nhiều sản phẩm có thể dùng chung một số ảnh, bạn chỉ cần import một lần và tái sử dụng.

**Ví dụ:**
```typescript
// Import một lần
import mouseImage1 from "@/assets/mouse1.jpg";
import mouseImage2 from "@/assets/mouse2.jpg";
import mouseImage3 from "@/assets/mouse3.jpg";

// Sử dụng cho nhiều sản phẩm
{
  id: "mouse-product-1",
  image: mouseImage1,
  images: [mouseImage2, mouseImage3, mouseImage1],
  // ...
},
{
  id: "mouse-product-2",
  image: mouseImage2,
  images: [mouseImage1, mouseImage3, mouseImage2],
  // ...
}
```

---

## Cách 3: Sử dụng URL ảnh (Không cần import)

Nếu bạn có URL ảnh từ internet, không cần import, chỉ cần dùng trực tiếp:

```typescript
{
  id: "ultra-pro-smartphone-15",
  image: "https://example.com/images/mouse-main.jpg",
  images: [
    "https://example.com/images/mouse-side.jpg",
    "https://example.com/images/mouse-back.jpg",
    "https://example.com/images/mouse-detail.jpg"
  ],
  name: "OEM Led Custom Gaming Mouse",
  // ...
}
```

**Ưu điểm:**
- Không cần import
- Không tốn dung lượng trong project
- Dễ thay đổi

**Nhược điểm:**
- Phụ thuộc vào internet
- Có thể load chậm hơn

---

## 📝 Ví dụ đầy đủ: Thêm 4 ảnh cho 1 sản phẩm

### File structure:
```
src/
  assets/
    mouse1.jpg
    mouse1-side.jpg
    mouse1-back.jpg
    mouse1-detail.jpg
```

### Code trong `products.ts`:

```typescript
// Import tất cả ảnh
import mouse1Main from "@/assets/mouse1.jpg";
import mouse1Side from "@/assets/mouse1-side.jpg";
import mouse1Back from "@/assets/mouse1-back.jpg";
import mouse1Detail from "@/assets/mouse1-detail.jpg";

export const products: Product[] = [
  {
    id: "ultra-pro-smartphone-15",
    image: mouse1Main,  // Ảnh chính
    images: [mouse1Side, mouse1Back, mouse1Detail],  // 3 ảnh phụ
    name: "OEM Led Custom Gaming Mouse",
    category: "Computer Accessories",
    // ... các thông tin khác
  },
  // ... các sản phẩm khác
];
```

---

## 💡 Mẹo đặt tên ảnh

Để dễ quản lý, nên đặt tên ảnh theo pattern:

**Pattern 1: Theo tên sản phẩm**
```
mouse-main.jpg
mouse-side.jpg
mouse-back.jpg
mouse-detail.jpg
```

**Pattern 2: Theo ID sản phẩm**
```
ultra-pro-smartphone-15-main.jpg
ultra-pro-smartphone-15-side.jpg
ultra-pro-smartphone-15-back.jpg
ultra-pro-smartphone-15-detail.jpg
```

**Pattern 3: Theo số thứ tự**
```
mouse-1.jpg  (ảnh chính)
mouse-2.jpg  (ảnh phụ 1)
mouse-3.jpg  (ảnh phụ 2)
mouse-4.jpg  (ảnh phụ 3)
```

---

## ⚠️ Lưu ý quan trọng

1. **Mỗi ảnh cần import riêng** nếu là file local
2. **Có thể tái sử dụng** ảnh đã import cho nhiều sản phẩm
3. **URL ảnh** không cần import, dùng trực tiếp
4. **Tên biến import** có thể đặt tùy ý (không nhất thiết phải giống tên file)
5. **Tối đa 4 ảnh** trong gallery (1 chính + 3 phụ)

---

## 🎯 Tóm tắt nhanh

**Câu trả lời:** Có, bạn cần import từng ảnh riêng nếu dùng file local. Nhưng:
- ✅ Có thể tái sử dụng ảnh đã import
- ✅ Có thể dùng URL để tránh import nhiều
- ✅ Đặt tên ảnh có hệ thống để dễ quản lý

