const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const hashPassword = (pwd) => bcrypt.hashSync(pwd, bcrypt.genSaltSync(10));
const listingTypes = ["Bán", "Cho thuê"];

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
      userId: 7,
      roleCode: "ROL3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
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

  property_types: [
    {
      name: "Căn hộ chung cư",
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "apartment",
      }),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Chung cư mini, căn hộ dịch vụ",
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "smallapartment",
      }),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Nhà riêng",
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "house",
      }),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Nhà biệt thự, liền kề",
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "villa",
      }),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Nhà mặt phố",
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "townhouse",
      }),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Shophouse, nhà phố thương mại",
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "shophouse",
      }),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Đất nền dự án",
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "landproject",
      }),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Đất",
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "land",
      }),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Trang trại, khu nghỉ dưỡng",
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "farmresort",
      }),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Condotel",
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "condotel",
      }),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Kho, nhà xưởng",
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "warehouse",
      }),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Nhà trọ, phòng trọ",
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "rentalhouse",
      }),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Văn phòng",
      image: faker.image.urlLoremFlickr({
        width: 1000,
        height: 500,
        category: "office",
      }),
      description: faker.lorem.sentences({ min: 2, max: 3 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  properties: Array.from([...Array(60).keys()]).map(() => ({
    name: faker.lorem.sentence({ max: 1, min: 1 }).replace(".", ""),
    description: faker.lorem.sentences({ min: 5, max: 10 }),
    listingType: faker.helpers.arrayElement(["Bán", "Cho thuê"]),
    price: faker.number.int({ max: 1000000, min: 1000 }) * 1000,
    propertyTypeId: faker.number.int({ max: 13, min: 1 }),
    owner: faker.helpers.arrayElement([7, 9]),
    status: "Chờ duyệt",
    isAvailable: true,
    featuredImage: faker.image.urlLoremFlickr({ category: "realestate" }),
    images: JSON.stringify(
      Array.from([...Array(faker.number.int({ max: 7, min: 5 })).keys()]).map(
        () =>
          `${faker.image.urlLoremFlickr({
            category: "realestate",
          })}?random=${faker.string.numeric(30)}`
      )
    ),
    postedBy: faker.helpers.arrayElement([7, 8, 9]),
    bedRoom: faker.number.int({ max: 3, min: 1 }),
    bathRoom: faker.number.int({ max: 3, min: 1 }),
    propertySize: faker.number.int({ max: 200, min: 20 }),
    yearBuilt: faker.number.int({ max: 2024, min: 1945 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  })),

  features: [
    {
      name: "Hệ thống điều hòa",
      image: faker.image.urlLoremFlickr({ category: "airconditioning" }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Lò sưởi",
      image: faker.image.urlLoremFlickr({ category: "furnace" }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Garage",
      image: faker.image.urlLoremFlickr({ category: "garage" }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Hồ bơi",
      image: faker.image.urlLoremFlickr({ category: "pool" }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Vườn",
      image: faker.image.urlLoremFlickr({ category: "garden" }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Ban công",
      image: faker.image.urlLoremFlickr({ category: "balcony" }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],

  property_features: Array.from([...Array(60).keys()]).map((el) => ({
    propertyId: el + 1,
    featureId: faker.number.int({ max: 4, min: 1 }),
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
};
