// Site Configuration
// Update this file to change the domain name across the entire site

export const siteConfig = {
  // Domain name (without https://)
  domain: "emilyhartmantech.com",
  
  // Full URL
  get url() {
    return `https://${this.domain}`;
  },
  
  // Site name
  name: "Emily Hartman",
  
  // Site description
  description: "Premium Computer & Phone Accessories",
};

