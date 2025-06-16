
import { AiChatGuidanceForm } from "@/components/admin/ai-chat-guidance-form";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function AiChatGuidancePage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" /> AI Chat Content Guidance
          </CardTitle>
          <CardDescription>
            Leverage AI to analyze popular livestream trends and get recommendations for your generated chat content themes. This can help make fake viewer interactions feel more natural and relevant.
          </CardDescription>
        </CardHeader>
      </Card>
      <AiChatGuidanceForm />
    </div>
  );
}
