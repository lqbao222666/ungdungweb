const bcrypt = require("bcrypt");

const plainPasswords = [
  { username: "user12", password: "123456" },
  { username: "user13", password: "123456" },
  { username: "user14", password: "123456" },
];

const saltRounds = 10;

plainPasswords.forEach(({ username, password }) => {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return console.error("Lỗi hash:", err);
    console.log(
      `UPDATE DocGia SET Password = '${hash}' WHERE Username = '${username}';`
    );
  });
});
