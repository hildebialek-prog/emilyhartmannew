import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Laptop, Smartphone } from "lucide-react";
import { products } from "@/data/products";

// Đếm số lượng sản phẩm theo category
const getProductCount = (category: string) => {
  return products.filter((product) => product.category === category).length;
};

const categories = [
  {
    icon: Laptop,
    name: "Computer Accessories",
    count: getProductCount("Computer Accessories"),
    color: "from-blue-500 to-cyan-500",
    categoryId: "computer",
  },
  {
    icon: Smartphone,
    name: "Phone Accessories",
    count: getProductCount("Phone Accessories"),
    color: "from-green-500 to-emerald-500",
    categoryId: "phone",
  },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <section id="categories" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">
            Browse Categories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Shop by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Find exactly what you're looking for in our well-organized 
            product categories.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => handleCategoryClick(category.categoryId)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCategoryClick(category.categoryId);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View ${category.name} products`}
            >
              <div className="bg-card rounded-2xl p-8 text-center shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2">
                <div
                  className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <category.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-all duration-300">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground transition-all duration-300">
                  {category.count} {category.count === 1 ? "Product" : "Products"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
