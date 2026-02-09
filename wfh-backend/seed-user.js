// seed-user.js
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

async function main() {
  // konfigurasi database
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',           // sesuaikan username mysql
    password: '', // sesuaikan password mysql
    database: 'tes_medela_wfh',
  });

  // password plain
  const plainPassword = 'password123';

  // hash password dengan bcrypt
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // insert user
  const [result] = await connection.execute(
    `INSERT INTO users (name, email, password, position, phone) VALUES (?, ?, ?, ?, ?)`,
    ['Andi', 'andi@company.com', hashedPassword, 'Developer', '081234567890']
  );

  console.log('User inserted with ID:', result.insertId);

  await connection.end();
}

main().catch((err) => {
  console.error('Error:', err.message);
});
