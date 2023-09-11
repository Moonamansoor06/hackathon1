const BASE_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : null;


export async function getCartData() {
  try {
    const res = await fetch(`${BASE_URL}/api/cart`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return await res.json();
  } catch (error) {
    console.log((error as { message: string }).message);
  }
}