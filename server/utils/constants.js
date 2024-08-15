const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const hashPassword = (pwd) => bcrypt.hashSync(pwd, bcrypt.genSaltSync(10));

module.exports = {
  roles: [
    {
      code: "ROL1",
      value: "Quản trị viên",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      code: "ROL3",
      value: "Chủ tài sản",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      code: "ROL5",
      value: "Môi giới",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      code: "ROL7",
      value: "Khách hàng",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  users: Array.from([...Array(10).keys()]).map(() => ({
    name: faker.person.fullName(),
    phone: "0" + faker.string.numeric(9), // random 9 số
    email: faker.internet.email({
      provider: "gmail.com",
      allowSpecialCharacters: false,
    }),
    address: faker.location.streetAddress({ useFullAddress: true }),
    password: hashPassword("123456"),
    avatar: faker.image.avatar(),
    createdAt: new Date(),
    updatedAt: new Date(),
  })),

  user_roles: [
    ...Array.from([...Array(10).keys()]).map((el) => ({
      userId: el + 1,
      roleCode: "ROL7",
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
    {
      userId: 8,
      roleCode: "ROL5",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 9,
      roleCode: "ROL3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 10,
      roleCode: "ROL1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};
