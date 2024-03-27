"use client"
import { notFound } from "next/navigation"; //{ notFound }는 next/navigation 모듈에서 notFound 속성(함수)를 추출

function getRandomInt(count: number) {
  return Math.floor(Math.random() * count);
}
export default function ReviewDetails({
  params,
} :  {
  params : {
    productId : string;
    reviewId: string; // String error
  }}) {
    const random = getRandomInt(2);

    // if(random === 1 ) {
    //   throw new Error("Error loading")
    // }

    if(parseInt(params.reviewId) > 1000) {
      notFound();
    }
  return (
   
    <h1>
      Review {params.reviewId} for product {params.productId}
      </h1>
    
  );
}

