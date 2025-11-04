import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Database, Copy, Check } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export const ExternalDBSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sqlScript, setSqlScript] = useState('');
  const [copied, setCopied] = useState(false);

  const setupExternalDatabase = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('setup-external-db');
      
      if (error) throw error;

      if (data.sql) {
        setSqlScript(data.sql);
        toast.success('SQL Script Generated', {
          description: 'Copy the SQL script below and run it in your external Supabase SQL Editor'
        });
      } else {
        toast.success(data.message);
      }
    } catch (error: any) {
      toast.error('Setup Failed', {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlScript);
    setCopied(true);
    toast.success('SQL copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          External Database Setup
        </CardTitle>
        <CardDescription>
          Create the same table structure in your external Supabase project
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Click the button below to generate the SQL schema. Then copy and run it in your external Supabase SQL Editor.
          </p>
          <Button 
            onClick={setupExternalDatabase} 
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Schema...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Generate SQL Schema
              </>
            )}
          </Button>
        </div>

        {sqlScript && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">SQL Schema Script</label>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy SQL
                  </>
                )}
              </Button>
            </div>
            <Textarea
              value={sqlScript}
              readOnly
              className="font-mono text-xs h-96"
            />
            <p className="text-xs text-muted-foreground">
              Copy this SQL and run it in your external Supabase project's SQL Editor to create all tables, functions, and policies.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
