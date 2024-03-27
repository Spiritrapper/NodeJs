import Image from "next/image";
import Link from "next/link";

export default function ProductList() {
  const productId= 100;
  return (
    <>
    <Link href="/">Home</Link>
    <h1>ProductList</h1>
    <h2><Link href="products/1">Produc 1</Link></h2>
    <h2><Link href="products/2">Produc 2</Link></h2>
    <h2><Link href="products/3" replace>Produc 3</Link></h2> {/**/}
    <h2>
      <Link href={`product/${productId}`}>Product {productId}</Link>
    </h2>
    </>
  );
}

