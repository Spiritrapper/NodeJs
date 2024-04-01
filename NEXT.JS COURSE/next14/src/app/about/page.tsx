import Image from "next/image";


export const metadata = {
  title: "About Codevolution",
};

export default function About() {

  console.log("About server component 터미널에서만 반영됨 개발자 콘솔창엔 반영안됨")
  return (
    
    <h1>welcome about</h1>
  );
}

