
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Facebook, Instagram, Twitter, Book, Star, Users, BarChart } from "lucide-react";
import Navbar from '@/components/Navbar';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    intro: false,
    visuals: false,
    testimonials: false,
    team: false,
  });

  useEffect(() => {
    setIsVisible({
      hero: true,
      intro: true,
      visuals: true,
      testimonials: true,
      team: true,
    });
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });
    
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-theme-dark text-white min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className={`min-h-screen flex flex-col justify-center items-center text-center px-4 transition-all duration-1000 transform ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="container mx-auto pt-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Ace Your Interview
            <span className="text-theme-orange"> </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Master core subjects concepts with personalized roadmaps and daily practice tests
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-theme-orange hover:bg-theme-orange/90 text-white">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/roadmap">
              <Button variant="outline" size="lg" className="border-theme-orange text-theme-orange hover:bg-theme-orange hover:text-white">
                View Roadmaps
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-0 right-0 flex justify-center animate-bounce">
          <div className="border-2 border-theme-orange rounded-full p-2">
            <ArrowRight className="h-5 w-5 text-theme-orange transform rotate-90" />
          </div>
        </div>
      </section>
      
      {/* Introduction Section */}
      <section className="py-20 px-4 animate-on-scroll opacity-0">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Introducing <span className="text-theme-orange">Smart-Scheduler</span>
            </h2>
            <div className="h-1 w-20 bg-theme-orange mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">AI-Powered Learning Journey</h3>
              <p className="text-gray-300 mb-6">
                Smart-Schedule generates personalized roadmaps using AI, providing you with day-by-day routines tailored to your learning pace and goals.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Master Core Subjects</h3>
              <p className="text-gray-300 mb-6">
                Focus on essential computer science subjects including OS, Computer Networks, DBMS, OOP, and DSA to build a solid foundation.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">Daily Knowledge Check</h3>
              <p className="text-gray-300">
                Test your understanding with daily quizzes and track your progress as you advance through your personalized roadmap.
              </p>
            </div>
            
            <div className="bg-theme-darkgray p-6 rounded-2xl border border-gray-800">
              <div className="grid grid-cols-2 gap-6">
                <FeatureCard 
                  icon={<Book className="h-8 w-8 text-theme-orange" />}
                  title="Personalized Roadmaps"
                  description="AI-generated learning paths"
                />
                <FeatureCard 
                  icon={<Star className="h-8 w-8 text-theme-orange" />}
                  title="Daily Practice"
                  description="Reinforce your learning"
                />
                <FeatureCard 
                  icon={<Users className="h-8 w-8 text-theme-orange" />}
                  title="Community Support"
                  description="Learn with others"
                />
                <FeatureCard 
                  icon={<BarChart className="h-8 w-8 text-theme-orange" />}
                  title="Progress Tracking"
                  description="Monitor your improvement"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Visuals & Diagrams Section */}
      <section className="py-20 px-4 bg-theme-lightgray animate-on-scroll opacity-0">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Maximize Your <span className="text-theme-orange">Potential</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Our students consistently achieve their career goals and secure positions at top tech companies
          </p>
          
          <div className="bg-theme-darkgray p-8 rounded-2xl border border-gray-800 max-w-4xl mx-auto">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <p className="text-theme-orange font-bold">Platform User</p>
                <p className="text-gray-400">Industry Average</p>
              </div>
              
              <div className="space-y-8">
                <StatBar title="Interview Success Rate" value={85} />
                <StatBar title="Concept Mastery" value={92} />
                <StatBar title="Time to Job Offer" value={78} />
                <StatBar title="Salary Increase" value={88} />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-4 animate-on-scroll opacity-0">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Student <span className="text-theme-orange">Success Stories</span>
            </h2>
            <div className="h-1 w-20 bg-theme-orange mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Priya Sharma"
              role="Software Engineer @ Google"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
              quote="Personalized roadmap helped me systematically prepare for my interviews. The daily tests reinforced my learning and built my confidence."
            />
            <TestimonialCard 
              name="Rahul Patel"
              role="Systems Engineer @ Microsoft"
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
              quote="The personalized roadmap for OS concepts was exactly what I needed. I cleared my Microsoft interview with confidence thanks to this platform."
            />
            <TestimonialCard 
              name="Anjali Kumar"
              role="Backend Developer @ Amazon"
              image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
              quote="Smart Scheduler turned my overwhelming interview preparation into a structured plan. The daily practice tests were instrumental in cementing my knowledge."
            />
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 px-4 bg-theme-lightgray animate-on-scroll opacity-0">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet The <span className="text-theme-orange">Team</span>
            </h2>
            <div className="h-1 w-20 bg-theme-orange mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember 
              name="Amit Singh"
              role="Backend Developer"
              image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
            />
            <TeamMember 
              name="Neha Gupta"
              role="Frontend Developer"
              image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
            />
            <TeamMember 
              name="Vikram Reddy"
              role="UI/UX Designer"
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
            />
            <TeamMember 
              name="Meera Patil"
              role="Database Specialist"
              image="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
            />
          </div>
        </div>
      </section>
      
      {/* Social Section */}
      <section className="py-20 px-4 animate-on-scroll opacity-0">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Connect With <span className="text-theme-orange">Us</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join our community and stay updated with the latest resources
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            <SocialButton icon={<Facebook size={24} />} label="Facebook" />
            <SocialButton icon={<Instagram size={24} />} label="Instagram" />
            <SocialButton icon={<Twitter size={24} />} label="Twitter" />
            <SocialButton icon={<Users size={24} />} label="Discord" />
          </div>
        </div>
      </section>
      
      {/* Footer Section */}
      <footer className="bg-theme-darkgray py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-theme-orange h-8 w-8 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SS</span>
                </div>
                <span className="text-xl font-bold text-white">Smart Scheduler</span>
              </div>
              <p className="text-gray-400 mb-4">
                Your ultimate guide to mastering operating systems and acing technical interviews.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-theme-orange transition-colors">Home</Link></li>
                <li><Link to="/roadmap" className="hover:text-theme-orange transition-colors">Roadmap</Link></li>
                <li><Link to="/notes" className="hover:text-theme-orange transition-colors">Notes</Link></li>
                <li><Link to="/discussion" className="hover:text-theme-orange transition-colors">Discussion</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="#" className="hover:text-theme-orange transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-theme-orange transition-colors">Terms of Service</Link></li>
                <li><Link to="#" className="hover:text-theme-orange transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-gray-400 mb-2">Email: support@coredevelopers.com</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-theme-orange transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-theme-orange transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-theme-orange transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Smart Scheduler. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Components

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-theme-dark p-4 rounded-lg flex flex-col gap-2 items-center text-center hover:scale-105 transition-transform">
    {icon}
    <h4 className="font-semibold">{title}</h4>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

const StatBar = ({ title, value }: { title: string, value: number }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span>{title}</span>
      <span>{value}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div 
        className="bg-theme-orange h-2.5 rounded-full transition-all duration-1000" 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const TestimonialCard = ({ name, role, image, quote }: { name: string, role: string, image: string, quote: string }) => (
  <div className="bg-theme-darkgray p-6 rounded-2xl border border-gray-800 hover:border-theme-orange/50 transition-colors">
    <div className="flex items-start mb-4">
      <img 
        src={image} 
        alt={name} 
        className="h-14 w-14 rounded-full object-cover mr-4"
      />
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
    <p className="text-gray-300 italic">&ldquo;{quote}&rdquo;</p>
  </div>
);

const TeamMember = ({ name, role, image }: { name: string, role: string, image: string }) => (
  <div className="bg-theme-darkgray rounded-2xl overflow-hidden border border-gray-800 hover:border-theme-orange/50 transition-colors group">
    <div className="h-64 overflow-hidden">
      <img 
        src={image}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
    <div className="p-4 text-center">
      <h4 className="font-bold text-lg">{name}</h4>
      <p className="text-theme-orange">{role}</p>
    </div>
  </div>
);

const SocialButton = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <a 
    href="#" 
    className="flex flex-col items-center gap-2 p-4 rounded-full bg-theme-darkgray hover:bg-theme-orange/20 transition-colors border border-gray-800 hover:border-theme-orange"
  >
    <div className="h-12 w-12 rounded-full bg-theme-orange/10 flex items-center justify-center">
      {icon}
    </div>
    <span>{label}</span>
  </a>
);

export default LandingPage;
