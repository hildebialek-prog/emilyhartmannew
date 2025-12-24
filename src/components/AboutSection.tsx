import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Award, Users, Clock } from "lucide-react";

const AboutSection = () => {
  const companyInfo = {
    name: "Emily Hartman",
    address: "Youngstoun Court 20316 Hagerstown Maryland 21742",
    email: "kwgxxnrbi232@outlook.com",
    phone: "+1 9036180982",
  };

  const stats = [
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Clock, value: "24/7", label: "Customer Support" },
  ];

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
              Your Trusted Partner for{" "}
              <span className="text-gradient">Accessories</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              At Emily Hartman, we're passionate about bringing you the finest computer accessories 
              and phone accessories. Our mission is to provide high-quality products that enhance 
              your digital experience and protect your valuable devices.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              With years of experience in the industry, we've built a reputation for quality 
              accessories, exceptional customer service, and competitive prices. We carefully 
              curate our selection of computer and phone accessories to ensure you get only the best.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-card rounded-3xl p-8 md:p-10 shadow-elevated">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Our Location</h4>
                    <p className="text-muted-foreground">{companyInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Us</h4>
                    <a 
                      href={`mailto:${companyInfo.email}`}
                      className="text-primary hover:underline transition-all duration-300 inline-block hover:-translate-y-0.5"
                    >
                      {companyInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Call Us</h4>
                    <a 
                      href={`tel:${companyInfo.phone}`}
                      className="text-primary hover:underline transition-all duration-300 inline-block hover:-translate-y-0.5"
                    >
                      {companyInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
