Simple Attendance & Employee Monitoring System

Aplikasi web absensi WFH dan monitoring karyawan yang bersifat responsive dan dapat diakses melalui browser desktop maupun mobile.

# Fitur Utama

1. Aplikasi Karyawan
* Login karyawan menggunakan email perusahaan dan password
* Profil Karyawan
  Menampilkan data pribadi seperti nama, email, foto, posisi, dan nomor handphone
  Karyawan dapat mengubah foto, nomor handphone, dan password
* Notifikasi & Logging Perubahan Data : 
  * Notifikasi real-time ke halaman admin
  * Pencatatan aktivitas (logging) ke database terpisah melalui data stream / message queue
* Absensi
  Melakukan absen masuk dan pulang dengan pencatatan tanggal, waktu, dan status
* Summary Absensi
  Menampilkan ringkasan absensi dari awal bulan hingga hari ini, serta fitur filter berdasarkan rentang tanggal

2. Aplikasi Admin (HRD)
* Manajemen data karyawan (tambah & update)
* Monitoring absensi seluruh karyawan (read-only)

3. Arsitektur
* Menggunakan microservices (REST API)
* Backend dapat dikonsumsi oleh aplikasi karyawan dan admin
* Dibangun dengan React.js (frontend) dan NestJS (backend)

# instalasi

1. Backend 
```bash
npm i -g @nestjs/cli
nest new wfh-backend
cd wfh-backend
npm install @nestjs/jwt bcrypt
npm install @nestjs/microservices amqplib
npm run start:dev
```

Akses:
```
http://localhost:3000
```

2. Install MySQL & Dependency

```bash
npm install @nestjs/typeorm typeorm mysql2
```

3. Frontend
- React
```bash
npm create vite@latest wfh-frontend -- --template react
cd wfh-frontend
npm install
npm run dev
```

- Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```