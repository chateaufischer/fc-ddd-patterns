import Product from "./product";

describe("Product unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("1", "", 100);
    }).toThrowError("Name is required");
  });

  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("1", "Product", -10);
    }).toThrowError("Price must be greater than zero");
  });

  it("should create a product", () => {
    const product = new Product("1", "Product 1", 100);
    expect(product.id).toBe("1");
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(100);
  });

});
