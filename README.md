# Hướng dẫn cài đặt soure RealEstate-Project
Source sẽ có 2 phần: server và client. Để chạy được source ở localhost thì ta trước tiên cần thiết lập các môi trường cần thiết cũng như lấy các API key.
## 1. Chuẩn bị môi trường:
- Trước tiên cần đảm bảo máy tính có cài Nodejs bằng cách mở terminal (quyền admin) và gõ lệnh `node -v` hoặc node `--version`. Nếu terminal hiện thị số version thì oke.
- Tiếp theo kiểm tra đã có npm chưa, tương tự ở terminal gõ lệnh `npm -v`.
- Tải VSCode, DBeaver (bản Community), PostgreSQL Server.

## 2. Thiết lập database:
- Sau khi tải Postgres về máy và cài đặt. Tìm trên máy tính SQL Shell (psql) mở lên bằng quyền admin.
- 4 dòng đầu tiên không cần nhập gì cứ bấm Enter. Tới dòng nhập mật khẩu thì ta nhập mật khẩu mà lúc cài đặt Postgres ta đã đặt sau đó Enter.
- Tiếp ta sẽ tạo 1 database ví dụ tên là `real_estate` bằng cách gõ lệnh `create database real_estate;` và Enter. Nếu thấy xuất hiện dòng chữ CREATE DATABASE thì đã tạo thành công. Tiếp tục kiểm tra xem đã có database `real_estate` chưa bằng cách gõ lệnh `\l` để show ra các database đang có nếu thấy tên `real_estate` thì oke sang bước kế tiếp.
- Kết nối DBeaver với database ta mới tạo. Mở DBeaver đã tải và cài đặt ở bước trước đó.
- Bấm vào biểu tượng "New Connection"
- Chọn PostgresSQL
- Ở dòng database nhập `real_estate` và dòng password nhập mật khẩu postgres lúc cài đặt postgres server, sau đó bấm `Finish`.

## 3. Chạy source:
### Thiết lập server
- Cấu hình biến môi trường: Trong thư mục `server`, sao chép file `.env.example` thành `.env` và thêm các thông số cần thiết như kết nối cơ sở dữ liệu, API key, v.v.
- Cài đặt dependencies: `npm install`
- Khởi tạo cơ sở dữ liệu: `npm run initdb` (Dữ liệu sẽ được tự động khởi tạo, bao gồm các bảng quan hệ cùng với các dữ liệu mẫu ngẫu nhiên.)
- Chạy server: `npm run dev`
### Thiết lập client
- Cấu hình biến môi trường: Tương tự, trong thư mục `client`, sao chép file `.env.example` thành `.env` và thêm các thông số cần thiết.
- Cài đặt dependencies: `npm install`
- Chạy client: `npm run dev`

## 4. Truy cập Website:
Sau khi hoàn tất, bạn có thể truy cập [đây](http://localhost:5173) để vào website.
