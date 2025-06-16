
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ShieldCheck } from 'lucide-react';

const adminLoginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type AdminLoginFormInputs = z.infer<typeof adminLoginSchema>;

export function AdminLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin } = useAuth();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<AdminLoginFormInputs>({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit: SubmitHandler<AdminLoginFormInputs> = async (data) => {
    setIsLoading(true);
    const success = await adminLogin(data.username, data.password);
    if (!success) {
      toast({
        title: 'Admin Login Failed',
        description: 'Invalid username or password. Please try again.',
        variant: 'destructive',
      });
    }
    // Navigation is handled by adminLogin function in AuthContext
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md shadow-xl border-primary/50">
      <CardHeader>
        <div className="mx-auto p-3 bg-primary/10 rounded-full mb-4 w-fit">
          <ShieldCheck className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl font-headline text-center text-primary">Admin Panel Login</CardTitle>
        <CardDescription className="text-center">
          Access the LiveConnect administration tools.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="admin_user"
              {...register('username')}
              aria-invalid={errors.username ? "true" : "false"}
            />
            {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ShieldCheck className="mr-2 h-4 w-4" />
            )}
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
