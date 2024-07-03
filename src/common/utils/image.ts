import { Image } from "@/types/Common";

export function createImageVariants(
  imageUrl: string | null | undefined
): Image {
  if (!imageUrl)
    return {
      original: null,
      small: null,
      medium: null,
      large: null,
    };

  // https://m.media-amazon.com/images/I/71GAoSPqmkL._AC_UY218_.jpg

  const original = imageUrl.replace(/_.*_[.]/, "");
  const small = `${original}_AC_UY218_.jpg`;
  const medium = `${original}_AC_UY327_.jpg`;
  const large = `${original}_AC_UY436_.jpg`;

  return {
    original,
    small,
    medium,
    large,
  };
}
