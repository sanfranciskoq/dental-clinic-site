import Image from "next/image";

interface ServiceHeaderImageProps {
  src: string;
  alt: string;
}

export function ServiceHeaderImage({ src, alt }: ServiceHeaderImageProps) {
  return (
    <div className="relative aspect-[16/9] w-full">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 560px"
        className="object-cover object-center"
      />
    </div>
  );
}
