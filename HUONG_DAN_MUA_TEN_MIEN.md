# Hướng dẫn mua và cấu hình tên miền

Hướng dẫn chi tiết từng bước để mua tên miền và kết nối với website của bạn.

## Bước 1: Chọn nhà cung cấp tên miền

### Các nhà cung cấp phổ biến và uy tín:

1. **Namecheap** (Khuyến nghị)
   - Website: https://www.namecheap.com
   - Giá: ~$10-15/năm
   - Ưu điểm: Giá rẻ, giao diện dễ dùng, hỗ trợ tốt

2. **GoDaddy**
   - Website: https://www.godaddy.com
   - Giá: ~$12-20/năm
   - Ưu điểm: Phổ biến, nhiều khuyến mãi

3. **Cloudflare**
   - Website: https://www.cloudflare.com/products/registrar/
   - Giá: Giá gốc (không markup)
   - Ưu điểm: Giá tốt nhất, bảo mật tốt

4. **Google Domains**
   - Website: https://domains.google
   - Giá: ~$12/năm
   - Ưu điểm: Đơn giản, tích hợp tốt với Google

## Bước 2: Kiểm tra tên miền có sẵn không

1. Truy cập website của nhà cung cấp (ví dụ: Namecheap)
2. Tìm ô tìm kiếm tên miền
3. Nhập tên miền bạn muốn (ví dụ: `emilyhartman.com`)
4. Xem kết quả:
   - ✅ Có sẵn: Có thể mua
   - ❌ Đã có người dùng: Thử tên khác hoặc extension khác (.net, .org, .store)

### Gợi ý tên miền:
- Ngắn gọn, dễ nhớ
- Liên quan đến thương hiệu/business
- Tránh số và dấu gạch ngang
- Extension phổ biến: `.com` (tốt nhất), `.net`, `.org`, `.store`

## Bước 3: Mua tên miền

### Ví dụ với Namecheap:

1. **Đăng ký tài khoản**
   - Vào https://www.namecheap.com
   - Click "Sign Up" ở góc trên
   - Điền thông tin: Email, mật khẩu
   - Xác nhận email

2. **Tìm và thêm vào giỏ hàng**
   - Tìm kiếm tên miền bạn muốn
   - Click "Add to Cart"
   - Chọn thời gian đăng ký (thường 1 năm)

3. **Thanh toán**
   - Vào giỏ hàng
   - Chọn phương thức thanh toán (Credit Card, PayPal)
   - Điền thông tin thanh toán
   - Xác nhận mua

4. **Hoàn tất**
   - Bạn sẽ nhận email xác nhận
   - Tên miền sẽ được kích hoạt trong vài phút

## Bước 4: Cấu hình DNS (Quan trọng!)

Sau khi mua tên miền, bạn cần trỏ nó về hosting/server của website.

### Nếu bạn dùng Netlify/Vercel:

#### Với Netlify:
1. Đăng nhập Netlify
2. Vào project của bạn
3. Vào **Domain settings** > **Add custom domain**
4. Nhập tên miền của bạn
5. Netlify sẽ hiển thị DNS records cần cấu hình
6. Vào Namecheap (hoặc nhà cung cấp domain):
   - Vào **Domain List** > Click vào domain của bạn
   - Vào tab **Advanced DNS**
   - Thêm các records theo hướng dẫn của Netlify:
     ```
     Type: A Record
     Host: @
     Value: [IP từ Netlify]
     
     Type: CNAME Record
     Host: www
     Value: [URL từ Netlify]
     ```
7. Lưu và chờ 24-48 giờ để DNS propagate

#### Với Vercel:
1. Đăng nhập Vercel
2. Vào project của bạn
3. Vào **Settings** > **Domains**
4. Thêm domain của bạn
5. Làm theo hướng dẫn DNS tương tự như Netlify

### Nếu bạn có server riêng:

1. Vào quản lý domain (Namecheap, GoDaddy, etc.)
2. Vào **DNS Settings** hoặc **Advanced DNS**
3. Thêm các records:
   ```
   Type: A Record
   Host: @
   Value: [IP của server]
   TTL: Automatic
   
   Type: CNAME Record
   Host: www
   Value: yourdomain.com
   TTL: Automatic
   ```
4. Lưu và chờ DNS propagate

## Bước 5: Cập nhật trong code

Sau khi đã mua và cấu hình DNS:

1. Mở file `src/config/site.config.ts`
2. Đổi domain thành tên miền mới:
   ```typescript
   domain: "ten-mien-moi-cua-ban.com",
   ```
3. Lưu file
4. Deploy lại website

## Bước 6: Kiểm tra SSL Certificate

- Nếu dùng Netlify/Vercel: SSL tự động được cấu hình (miễn phí)
- Nếu có server riêng: Cần cài đặt Let's Encrypt hoặc SSL certificate khác

## Lưu ý quan trọng

1. **DNS Propagation**: Sau khi cấu hình DNS, phải chờ 24-48 giờ để thay đổi có hiệu lực trên toàn cầu

2. **Gia hạn**: Nhớ gia hạn domain trước khi hết hạn (thường nhận email nhắc nhở 30 ngày trước)

3. **Privacy Protection**: Nên bật WHOIS Privacy để ẩn thông tin cá nhân (một số nhà cung cấp cho miễn phí)

4. **Email**: Nếu muốn dùng email với domain (ví dụ: info@yourdomain.com), cần cấu hình thêm email hosting

## Kiểm tra DNS đã hoạt động chưa

Sau khi cấu hình DNS, kiểm tra bằng:

1. **Online tools**:
   - https://www.whatsmydns.net
   - https://dnschecker.org
   - Nhập domain và xem DNS records

2. **Command line**:
   ```bash
   nslookup yourdomain.com
   ping yourdomain.com
   ```

## Tổng chi phí ước tính

- Tên miền: $10-15/năm
- Hosting (Netlify/Vercel): Miễn phí (có giới hạn) hoặc $0-20/tháng
- SSL: Miễn phí (tự động với Netlify/Vercel)
- **Tổng: ~$10-15/năm** (nếu dùng hosting miễn phí)

## Hỗ trợ

Nếu gặp vấn đề:
- Liên hệ support của nhà cung cấp domain
- Kiểm tra documentation của hosting provider
- Đảm bảo DNS records đúng format

---

**Chúc bạn thành công!** 🎉

