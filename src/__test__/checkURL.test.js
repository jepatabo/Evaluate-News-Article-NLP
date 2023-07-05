const { validateURL } = require("../client/js/checkURL");

describe("validateURL", () => {
  test("should return false for invalid URLs", () => {
    expect(validateURL("read")).toBeFalsy();
  });

  test("should return false for email URLs", () => {
    expect(validateURL("mailto:jeanpaul.tabone@gmail.com")).toBeFalsy();
  });

  test("should return true for valid URLs", () => {
    expect(validateURL("https://inter.it")).toBeTruthy();
  });

  test("should return false for empty string", () => {
    expect(validateURL("")).toBeFalsy();
  });
});
