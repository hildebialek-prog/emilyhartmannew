import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { emailjsConfig } from "@/lib/emailjs.config";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      contactSchema.parse(formData);
      
      // Check if EmailJS is configured
      if (
        emailjsConfig.serviceId === "YOUR_SERVICE_ID" ||
        emailjsConfig.templateId === "YOUR_TEMPLATE_ID" ||
        emailjsConfig.publicKey === "YOUR_PUBLIC_KEY"
      ) {
        // Fallback: Use mailto link if EmailJS is not configured
        const mailtoLink = `mailto:${companyInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        window.location.href = mailtoLink;
        
        toast({
          title: "Opening email client...",
          description: "Please send the email from your email client.",
        });
        
        setFormData({ name: "", email: "", subject: "", message: "" });
        return;
      }

      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: companyInfo.email,
      };

      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      );
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        // EmailJS error
        console.error("EmailJS Error:", error);
        toast({
          title: "Failed to send message",
          description: "Please try again later or contact us directly via email.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const companyInfo = {
    address: "Youngstoun Court 20316 Hagerstown Maryland 21742",
    email: "kwgxxnrbi232@outlook.com",
    phone: "+1 9036180982",
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16"
        >
          <span className="text-primary font-semibold text-xs sm:text-sm tracking-wider uppercase">
            Contact Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
            Have questions or need assistance? We're here to help! 
            Reach out to us and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-elevated h-full flex flex-col">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className={errors.subject ? "border-destructive" : ""}
                  />
                  {errors.subject && (
                    <p className="text-destructive text-sm mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={5}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-6"
          >
            {/* Google Maps */}
            <div className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card">
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1 text-sm sm:text-base">Visit Us</h4>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{companyInfo.address}</p>
                </div>
              </div>
              <div className="rounded-lg sm:rounded-xl overflow-hidden shadow-md mb-3 sm:mb-4">
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(companyInfo.address)}&output=embed`}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                  title="Location Map"
                />
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(companyInfo.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline transition-all duration-300"
              >
                <MapPin className="w-4 h-4" />
                Open in Google Maps
              </a>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Email Us</h4>
                  <a 
                    href={`mailto:${companyInfo.email}`}
                    className="text-muted-foreground text-sm hover:text-primary transition-all duration-300 inline-block hover:-translate-y-0.5 break-all"
                  >
                    {companyInfo.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Call Us</h4>
                  <a 
                    href={`tel:${companyInfo.phone}`}
                    className="text-muted-foreground text-sm hover:text-primary transition-all duration-300 inline-block hover:-translate-y-0.5"
                  >
                    {companyInfo.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gradient-primary rounded-2xl p-6 text-primary-foreground">
              <h4 className="font-semibold mb-3">Business Hours</h4>
              <div className="space-y-2 text-sm opacity-90">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-medium">9:00 AM - 8:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-medium">10:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-medium">Closed</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
