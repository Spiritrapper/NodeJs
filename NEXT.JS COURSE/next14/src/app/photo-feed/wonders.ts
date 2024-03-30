import { StaticImageData } from "next/image";
import photo1 from "./photos/1.jpg";
import photo2 from "./photos/2.jpg";
import photo3 from "./photos/3.jpg";
import photo4 from "./photos/4.jpg";
import photo5 from "./photos/5.jpg";
import photo6 from "./photos/6.jpg";
import photo7 from "./photos/7.jpg";

export type WonderImage = {
    id: string;
    name: string;
    src: StaticImageData;
    photographer: string;
    location: string;
};

const wondersImages: WonderImage[] = [
    {
        id: "1",
        name: "Greate Wall of China1",
        src: photo1,
        photographer: "a1",
        location: "China1",

    },
    {
        id: "2",
        name: "Greate Wall of China2",
        src: photo2,
        photographer: "a2",
        location: "China2",

    },
    {
        id: "3",
        name: "Greate Wall of China3",
        src: photo3,
        photographer: "a3",
        location: "China3",

    },
    {
        id: "4",
        name: "Greate Wall of China4",
        src: photo4,
        photographer: "a4",
        location: "China4",

    },
    {
        id: "5",
        name: "Greate Wall of China5",
        src: photo5,
        photographer: "a5",
        location: "China5",

    },
    {
        id: "6",
        name: "Greate Wall of China6",
        src: photo6,
        photographer: "a6",
        location: "China6",

    },
    {
        id: "7",
        name: "Greate Wall of China7",
        src: photo7,
        photographer: "a7",
        location: "China7",

    }
]

export default wondersImages;