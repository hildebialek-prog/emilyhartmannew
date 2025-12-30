import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Check, Mail, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductImageGallery from "@/components/ProductImageGallery";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProductById } from "@/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const product = id ? getProductById(id) : undefined;

  const handleBack = () => {
    navigate(-1);
  };

  const handleContact = () => {
    // Navigate to home page and scroll to contact section
    navigate("/");
    // Use setTimeout to ensure page loads before scrolling
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleBackToShop = () => {
    // Đảm bảo scroll position được giữ nguyên khi quay lại
    navigate("/products");
  };

  if (!product) {
    return (
      <>
        <Helmet>
          <title>Product Not Found | Emily Hartman</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{t("productDetail.productNotFound")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("productDetail.productNotFoundDesc")}
            </p>
            <Button onClick={() => navigate("/")}>{t("productDetail.goHome")}</Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | Emily Hartman</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16 sm:pt-20 md:pt-24">
          {/* Back Button */}
          <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="mb-2 sm:mb-4 text-sm sm:text-base"
              aria-label={t("productDetail.back")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("productDetail.back")}
            </Button>
          </div>

          {/* Product Content */}
          <div className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {/* Product Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:sticky lg:top-24"
              >
                <ProductImageGallery
                  mainImage={product.image}
                  images={product.images || []}
                  productName={product.name}
                />
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="space-y-6">
                  {/* Category & Badge */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground uppercase tracking-wider">
                      {product.category}
                    </span>
                    {product.isNew && (
                      <span className="bg-gradient-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                        {t("productDetail.new")}
                      </span>
                    )}
                  </div>

                  {/* Product Name */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    {product.name}
                  </h1>

                  {/* Price */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl sm:text-4xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-lg sm:text-xl text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="bg-accent text-accent-foreground text-sm font-semibold px-3 py-1 rounded-full">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            i < Math.floor(product.rating)
                              ? "text-accent fill-accent"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-base sm:text-lg text-muted-foreground">
                      ({product.rating})
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="flex-1"
                      onClick={handleContact}
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      {t("productDetail.contact")}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="shrink-0"
                      onClick={handleBackToShop}
                    >
                      <Store className="w-5 h-5 mr-2" />
                      {t("productDetail.backToShop")}
                    </Button>
                  </div>

                  {/* Features */}
                  <div className="pt-6 border-t border-border">
                    <h2 className="text-xl font-semibold mb-4">{t("productDetail.keyFeatures")}</h2>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Product Details Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16"
            >
              <Tabs defaultValue="specifications" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md">
                  <TabsTrigger value="specifications">{t("productDetail.specifications")}</TabsTrigger>
                  <TabsTrigger value="features">{t("productDetail.features")}</TabsTrigger>
                </TabsList>
                <TabsContent value="specifications" className="mt-6">
                  <div className="bg-card rounded-2xl p-6 shadow-card">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="border-b border-border pb-4 last:border-0">
                          <dt className="font-semibold text-foreground mb-1">{key}</dt>
                          <dd className="text-muted-foreground">{value}</dd>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="mt-6">
                  <div className="bg-card rounded-2xl p-6 shadow-card">
                    <ul className="space-y-4">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProductDetail;

