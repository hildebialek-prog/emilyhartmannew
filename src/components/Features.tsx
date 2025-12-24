import { motion } from "framer-motion";
import { Truck, Shield, Headphones, RefreshCcw } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on all orders over $50. Fast and reliable shipping worldwide.",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "Your payment information is protected with industry-standard encryption.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our support team is here to help you anytime, day or night.",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "Not satisfied? Return your product within 30 days for a full refund.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group cursor-default"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 shadow-soft transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110">
                <feature.icon className="w-8 h-8 text-primary-foreground transition-transform duration-300 group-hover:scale-110" />
              </div>
              <h3 className="font-semibold text-lg mb-2 transition-all duration-300 group-hover:-translate-y-0.5 inline-block">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
