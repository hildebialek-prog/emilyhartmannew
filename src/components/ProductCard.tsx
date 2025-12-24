import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  category: string;
  rating: number;
  isNew?: boolean;
  index: number;
  currentPage?: number;
  selectedCategory?: string;
}

const ProductCard = ({
  id,
  image,
  name,
  category,
  rating,
  isNew,
  index,
  currentPage = 1,
  selectedCategory = "all",
}: ProductCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Lưu scroll position, currentPage và selectedCategory trước khi navigate
    const scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    sessionStorage.setItem('productsScrollPosition', scrollPosition.toString());
    sessionStorage.setItem('productsCurrentPage', currentPage.toString());
    sessionStorage.setItem('productsSelectedCategory', selectedCategory);
    navigate(`/product/${id}`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${name}`}
    >
      <div className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative aspect-square bg-secondary/50 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Badges */}
          {isNew && (
            <span className="absolute top-4 left-4 bg-gradient-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
              NEW
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-sm text-muted-foreground mb-1">{category}</p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "text-accent fill-accent"
                    : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">({rating})</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
