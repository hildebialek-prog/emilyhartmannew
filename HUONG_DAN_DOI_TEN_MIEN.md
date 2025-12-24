# Hướng dẫn đổi tên miền

Để đổi tên miền cho website, bạn chỉ cần cập nhật file cấu hình duy nhất:

## Cách đổi tên miền

1. Mở file `src/config/site.config.ts`

2. Tìm dòng:
```typescript
domain: "emilyhartman.com",
```

3. Thay đổi thành tên miền mới của bạn (không cần thêm `https://`):
```typescript
domain: "ten-mien-moi.com",
```

Ví dụ:
```typescript
domain: "example.com",
```

4. Lưu file và khởi động lại server:
```bash
npm run dev
```

## Các nơi tự động được cập nhật

Sau khi đổi tên miền trong file config, các nơi sau sẽ tự động sử dụng tên miền mới:

- ✅ Canonical URL trong meta tags (trang chủ)
- ✅ Tất cả các nơi sử dụng `siteConfig.url`

## Lưu ý

- Tên miền chỉ cần nhập phần domain (ví dụ: `example.com`), không cần `https://` hoặc `www`
- Nếu bạn muốn sử dụng `www`, hãy thêm vào: `domain: "www.example.com"`
- Sau khi đổi, nhớ cập nhật cấu hình DNS và hosting để trỏ về server của bạn

## File cấu hình

File cấu hình nằm tại: `src/config/site.config.ts`

```typescript
export const siteConfig = {
  domain: "emilyhartman.com", // ← Đổi ở đây
  get url() {
    return `https://${this.domain}`;
  },
  name: "Emily Hartman",
  description: "Premium Computer & Phone Accessories",
};
```

