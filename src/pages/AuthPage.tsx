import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      toast({ title: 'Success!', description: 'Logged in successfully.' });
      navigate('/');
    } catch (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form['reg-email'].value;
    const password = form['reg-password'].value;

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Registration failed');

      toast({ title: 'Success!', description: 'Account created successfully.' });
      navigate('/');
    } catch (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-dark flex flex-col items-center justify-center p-4">
      <Link to="/" className="absolute top-4 left-4 flex items-center space-x-2">
        <div className="bg-theme-orange h-8 w-8 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">SS</span>        </div>
        <span className="text-xl font-bold text-white">Smart Scheduler</span>
      </Link>

      <div className="w-full max-w-md">
        <Card className="border-gray-700 bg-theme-darkgray text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
            <CardDescription className="text-gray-400 text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" required className="bg-theme-lightgray border-gray-700 text-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="#" className="text-sm text-theme-orange hover:underline">Forgot password?</Link>
                    </div>
                    <Input id="password" name="password" type="password" required className="bg-theme-lightgray border-gray-700 text-white" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-theme-orange hover:bg-theme-orange/90" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" required className="bg-theme-lightgray border-gray-700 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Email</Label>
                    <Input id="reg-email" name="reg-email" type="email" placeholder="you@example.com" required className="bg-theme-lightgray border-gray-700 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Password</Label>
                    <Input id="reg-password" name="reg-password" type="password" required className="bg-theme-lightgray border-gray-700 text-white" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full bg-theme-orange hover:bg-theme-orange/90" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-theme-darkgray px-2 text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4 px-6 pb-6">
            <Button variant="outline" size="icon" className="border-gray-700 bg-theme-lightgray text-white hover:bg-gray-700">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="border-gray-700 bg-theme-lightgray text-white hover:bg-gray-700">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="border-gray-700 bg-theme-lightgray text-white hover:bg-gray-700">
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="border-gray-700 bg-theme-lightgray text-white hover:bg-gray-700">
              <Github className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
