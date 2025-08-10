import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React from "react";

type ImageInputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ImageInput({ onChange }: ImageInputProps) {
  const name = "image";
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        Image
      </Label>
      <Input
        id={name}
        name={name}
        type="file"
        required
        accept="image/*"
        className="max-w-xs"
        onChange={onChange}
      />
    </div>
  );
}

export default ImageInput;
