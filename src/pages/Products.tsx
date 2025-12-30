import { useState, useMemo, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { products } from "@/data/products";
import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 9;

const Products = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    // Khôi phục selectedCategory từ sessionStorage nếu có và categoryParam không thay đổi
    const savedCategory = sessionStorage.getItem('productsSelectedCategory');
    const savedPage = sessionStorage.getItem('productsCurrentPage');
    // Chỉ khôi phục nếu có savedPage (tức là quay lại từ trang chi tiết)
    if (savedPage && savedCategory && (!categoryParam || categoryParam === savedCategory)) {
      return savedCategory;
    }
    return categoryParam || "all";
  });
  
  const [currentPage, setCurrentPage] = useState<number>(() => {
    // Khôi phục currentPage từ sessionStorage nếu có và category không thay đổi
    const savedPage = sessionStorage.getItem('productsCurrentPage');
    const savedCategory = sessionStorage.getItem('productsSelectedCategory');
    if (savedPage && savedCategory) {
      const currentCategory = categoryParam || "all";
      // Chỉ khôi phục nếu category không thay đổi
      if (currentCategory === savedCategory) {
        return parseInt(savedPage, 10);
      }
    }
    return 1;
  });

  // Update category when URL parameter changes
  useEffect(() => {
    if (categoryParam && (categoryParam === "computer" || categoryParam === "phone")) {
      setSelectedCategory(categoryParam);
      // Reset currentPage khi category thay đổi (không phải quay lại từ trang chi tiết)
      const savedCategory = sessionStorage.getItem('productsSelectedCategory');
      if (categoryParam !== savedCategory) {
        setCurrentPage(1);
      }
    } else if (!categoryParam) {
      setSelectedCategory("all");
      // Reset currentPage khi category thay đổi (không phải quay lại từ trang chi tiết)
      const savedCategory = sessionStorage.getItem('productsSelectedCategory');
      if ("all" !== savedCategory) {
        setCurrentPage(1);
      }
    }
  }, [categoryParam]);

  // Khôi phục scroll position khi quay lại từ trang chi tiết
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('productsScrollPosition');
    const savedPage = sessionStorage.getItem('productsCurrentPage');
    const savedCategory = sessionStorage.getItem('productsSelectedCategory');
    
    // Xóa các giá trị đã lưu sau khi đã sử dụng
    if (savedPage) {
      sessionStorage.removeItem('productsCurrentPage');
    }
    if (savedCategory) {
      sessionStorage.removeItem('productsSelectedCategory');
    }
    
    // Khôi phục scroll position nếu có
    if (savedScrollPosition) {
      // Sử dụng setTimeout để đảm bảo DOM đã render xong
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedScrollPosition, 10),
          behavior: 'instant' // Sử dụng 'instant' để không có animation
        });
        // Xóa scroll position sau khi đã khôi phục
        sessionStorage.removeItem('productsScrollPosition');
      }, 150);
    }
  }, []);

  // Category mapping - all categories are in English
  const categoryMapping: Record<string, string> = {
    "computer": "Computer Accessories",
    "phone": "Phone Accessories",
  };

  const categories = [
    { id: "all", name: t("products.allProducts") },
    { id: "computer", name: t("products.computerAccessories") },
    { id: "phone", name: t("products.phoneAccessories") },
  ];

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }
    const targetCategory = categoryMapping[selectedCategory];
    return products.filter((product) => 
      product.category === targetCategory
    );
  }, [selectedCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when category changes
    
    // Update URL query parameter
    if (categoryId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <>
      <Helmet>
        <title>Products | Emily Hartman</title>
        <meta
          name="description"
          content="Browse our complete collection of premium technology products and accessories at Emily Hartman."
        />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16 sm:pt-20 md:pt-24">
          <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-hero">
            <div className="container mx-auto px-4 sm:px-6">
              {/* Section Header */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
              >
                <span className="text-primary font-semibold text-xs sm:text-sm tracking-wider uppercase">
                  {t("products.title")}
                </span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
                  {t("products.subtitle")}
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                  {t("products.description")}
                </p>
              </motion.div>

              {/* Category Filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12"
              >
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "hero" : "outline"}
                    onClick={() => handleCategoryChange(category.id)}
                    className="transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2"
                  >
                    {category.name}
                  </Button>
                ))}
              </motion.div>

              {/* Products Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12"
              >
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product, index) => (
                    <ProductCard key={product.id} {...product} index={index} currentPage={currentPage} selectedCategory={selectedCategory} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      {t("products.noProducts")}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-8"
                >
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <button
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className={`h-9 px-2 sm:px-3 flex items-center gap-1 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 text-xs sm:text-sm ${
                            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:-translate-y-0.5"
                          }`}
                        >
                          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="hidden sm:inline">Previous</span>
                          <span className="sm:hidden">Prev</span>
                        </button>
                      </PaginationItem>
                      
                      {getPageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                          {page === "ellipsis" ? (
                            <PaginationEllipsis />
                          ) : (
                            <button
                              onClick={() => handlePageChange(page as number)}
                              className={`h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-md border text-xs sm:text-sm ${
                                currentPage === page
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border bg-background hover:bg-accent hover:text-accent-foreground"
                              } transition-all duration-300 cursor-pointer hover:-translate-y-0.5`}
                            >
                              {page}
                            </button>
                          )}
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <button
                          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className={`h-9 px-2 sm:px-3 flex items-center gap-1 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 text-xs sm:text-sm ${
                            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:-translate-y-0.5"
                          }`}
                        >
                          <span className="hidden sm:inline">Next</span>
                          <span className="sm:hidden">Next</span>
                          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </motion.div>
              )}

              {/* Products Count Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mt-6 text-muted-foreground"
              >
                <p className="text-sm">
                  {t("products.showing")} {startIndex + 1} - {Math.min(endIndex, filteredProducts.length)} {t("products.of")} {filteredProducts.length} {t("products.products")}
                </p>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Products;

