import { ChangeEvent, useState } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { FiTrash2 } from "react-icons/fi";
import { cn } from "../../utils/cn";
interface IFormData {
    formData: {
        profileImage: string;
        fullName: string;
        userName: string;
        email: string;
        password: string;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        profileImage: string;
        fullName: string;
        userName: string;
        email: string;
        password: string;
    }>>
};
export const ImgPreview = ({formData, setFormData }: IFormData) => {
    const [imgPreview, setImgPreview] = useState<string | null>(null);
    const handleImgPreview = (e: ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0];
        if (imageFile) {
            const imageReader = new FileReader();
            imageReader.onload = (e) => {
                setImgPreview(e.target?.result as string);
                console.log(e.target?.result as string);
                
                setFormData({...formData, profileImage: e.target?.result as string})
            }
            imageReader.readAsDataURL(imageFile);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <label htmlFor="imgInput"
                className={cn("cursor-pointer text-3xl h-24 w-24 flex flex-col space-y-2 justify-center items-center", {
                    "border-[1.5px] border-primary rounded-full": !imgPreview
                })}>
                {imgPreview ? <img
                    src={imgPreview as string}
                    alt="image-preview"
                    className="h-24 w-24 rounded-full object-cover" /> :
                    <RiImageAddLine />
                }
            </label>
            <input
                type="file"
                id="imgInput"
                className="hidden"
                accept="image/*"
                onChange={handleImgPreview} />
            {!imgPreview ? <label className="cursor-pointer text-lg " htmlFor="imgInput">Add Picture</label> :
                <span
                    className="text-sm font-semibold flex items-center cursor-pointer"
                    onClick={() => setImgPreview(null)}
                ><FiTrash2 className={"mr-2"} />Remove</span>
            }
        </div>
    )
}
