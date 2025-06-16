
"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getAISuggestions } from '@/app/admin/ai-chat-guidance/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AIGuidanceSchema = z.object({
  livestreamTrends: z.string().min(10, { message: 'Please provide more details about current trends (min 10 characters).' }),
});

type AIGuidanceFormInputs = z.infer<typeof AIGuidanceSchema>;

export function AiChatGuidanceForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors } } = useForm<AIGuidanceFormInputs>({
    resolver: zodResolver(AIGuidanceSchema),
  });

  const onSubmit: SubmitHandler<AIGuidanceFormInputs> = async (data) => {
    setIsLoading(true);
    setSuggestions(null);
    setError(null);

    const result = await getAISuggestions({ livestreamTrends: data.livestreamTrends });

    if (result.success && result.data) {
      setSuggestions(result.data.suggestedThemes);
      toast({
        title: 'Suggestions Generated',
        description: 'AI has provided chat content themes.',
      });
    } else {
      setError(result.error || 'An unknown error occurred.');
      toast({
        title: 'Error Generating Suggestions',
        description: result.error || 'Could not fetch suggestions from AI.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-headline flex items-center gap-2">
           <Sparkles className="h-5 w-5 text-primary" /> AI-Powered Chat Guidance
        </CardTitle>
        <CardDescription>
          Enter current livestream trends to get AI-generated suggestions for engaging chat content themes.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="livestreamTrends" className="text-base">Current Livestream Trends</Label>
            <Textarea
              id="livestreamTrends"
              placeholder="e.g., Popular games being streamed, trending challenges, viral topics..."
              {...register('livestreamTrends')}
              rows={5}
              className="mt-1 min-h-[100px]"
              aria-invalid={errors.livestreamTrends ? "true" : "false"}
            />
            {errors.livestreamTrends && <p className="text-sm text-destructive mt-1">{errors.livestreamTrends.message}</p>}
          </div>
          
          <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Get Suggestions
          </Button>
        </CardContent>
      </form>

      {(suggestions || error) && (
        <CardFooter className="flex flex-col items-start gap-4 pt-4 border-t">
          {error && (
             <Alert variant="destructive" className="w-full">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {suggestions && (
            <div className="w-full space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> Suggested Themes:
              </h3>
              <div className="p-4 bg-muted/50 rounded-md border whitespace-pre-wrap text-sm">
                {suggestions}
              </div>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
