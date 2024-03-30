import Image from "next/image";
import wondersImages, { WonderImage } from "../wonders";

export default function PhotoPage({
    params: {id},
}: {
    params: {id: string};
}) {
    const photo: WonderImage = wondersImages.find((p) => p.id == id)!;
    return (
        <div>
            <div>
                <div>
                    <h1 className="text-center text-3xl font-bold my-4">{photo.name}</h1>
                </div>
                <Image 
                    alt={photo.name}
                    src={photo.src}
                    className="w-full object-cover aspect-square "
                    />
                    <div className="bg-white py-4">
                        <h3>{photo.photographer}</h3>
                        <h3>{photo.location}</h3>
                    </div>
            </div>
        </div>
    )
}