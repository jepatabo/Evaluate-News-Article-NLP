const { validateURL } = require("../client/js/checkURL");

// test for invalid urls
describe("validateURL", () => {
  test("should return false for invalid URLs", () => {
    expect(validateURL("read")).toBeFalsy();
  });
  // test if it is an email address
  test("should return false for email URLs", () => {
    expect(validateURL("mailto:jeanpaul.tabone@gmail.com")).toBeFalsy();
  });
  // test for valid urls
  test("should return true for valid URLs", () => {
    expect(validateURL("https://inter.it")).toBeTruthy();
  });
  // test for empy string
  test("should return false for empty string", () => {
    expect(validateURL("")).toBeFalsy();
  });
});
