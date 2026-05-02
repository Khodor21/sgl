import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return filled || half ? (
          <AiFillStar key={i} className="text-amber-400" size={14} />
        ) : (
          <AiOutlineStar key={i} className="text-[#AEAEAE]" size={14} />
        );
      })}
    </div>
  );
}
