import { useState, useEffect } from "react";
import Layout from "../src/layouts/Layout";
import Resume from "../src/components/Resume";
import { HeroSection } from "../src/components/HeroSection";
import { ServicesSection } from "../src/components/ServicesSection";
import { SkillsSection } from "../src/components/SkillsSection";
import { WorkSection } from "../src/components/WorkSection";
import { TestimonialSection } from "../src/components/TestimonialSection";
import { PricingSection } from "../src/components/PricingSection";
import { BlogSection } from "../src/components/BlogSection";
import { ContactSection } from "../src/components/ContactSection";
const Index = () => {
  // creating the user and its substates
  const [user, setUser] = useState(null)
  const [about, setAbout] = useState(null)
  const [services, setServices] = useState(null)
  const [socials, setSocials] = useState(null)
  const [skills, setSkills] = useState(null)
  const [timeline, setTimeline] = useState(null)
  const [testimonials, setTestimonials] = useState(null)
  const [projects, setProjects] = useState(null)

  // function that fetches the user data 
  async function fetchUserData() {
    try {
      const response = await fetch("https://portfolio-backend-30mp.onrender.com/api/v1/get/user/6602f1842197909a03f3c8da", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const userData = await response.json();
        if (userData.success) {
          setUser(userData.user);
          setAbout(userData.user.about)
          setServices(userData.user.services)
          setSocials(userData.user.social_handles)
          setSkills(userData.user.skills)
          setTimeline(userData.user.timeline)
          setTestimonials(userData.user.testimonials)
          setProjects(userData.user.projects)
        }
      } else {
        window.alert("Error in data retrieval.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  // fetching user data only only oncuechange, everytime the website is loaded
  useEffect(() => {
    fetchUserData();
  }, [])

  return (
    user && <Layout pageClassName={"home"}>
      {/* Section - Hero Started */}
      <HeroSection about={about} socials={socials}/>
      {/* Section - Services */}
      <ServicesSection services={services}/>
      {/* Section - Skills */}
      <SkillsSection skills={skills}/>
      {/* Section - Works */}
      <WorkSection projects={projects}/>
      {/* Section - Resume */}
      <Resume timeline={timeline} />
      {/* Section - Testimonials */}
      <TestimonialSection testimonials={testimonials}/>
      {/* Section - Pricing */}
      <PricingSection/>
      {/* Section - Blog */}
      <BlogSection/>
      {/* Section - Contacts */}
      <ContactSection user={user} about={about}/>
    </Layout>
  );
};
export default Index;
