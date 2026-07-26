import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_LEARNING_RESOURCES } from "@/data/mock-learning";
import { Download, Share2, Award, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default function CertificatePage({ params }: { params: { id: string } }) {
  const resource = MOCK_LEARNING_RESOURCES.find(r => r.id === params.id);

  if (!resource) {
    notFound();
  }

  // Generate a mock certificate ID and date
  const certId = `CERT-${resource.id.toUpperCase()}-${Math.floor(Math.random() * 1000000)}`;
  const issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-muted/20 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8 flex justify-between items-center">
          <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="size-4 mr-2" /> Back to Dashboard
          </Link>
          <div className="flex gap-3">
            <Button variant="outline">
              <Share2 className="size-4 mr-2" /> Share on LinkedIn
            </Button>
            <Button>
              <Download className="size-4 mr-2" /> Download PDF
            </Button>
          </div>
        </div>

        <Card className="border-4 border-double border-muted shadow-2xl bg-white overflow-hidden relative">
          {/* Certificate Styling / Watermark */}
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Award className="size-96" />
          </div>
          
          <CardContent className="p-12 sm:p-20 text-center relative z-10">
            <div className="mb-12">
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                    <Award className="size-8" />
                  </div>
                  <span className="text-2xl font-bold font-heading">EntreSkill Hub</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif text-slate-800 tracking-wide uppercase">Certificate of Completion</h1>
            </div>

            <div className="space-y-6 mb-12">
              <p className="text-lg text-slate-500 italic">This is to certify that</p>
              <p className="text-3xl sm:text-4xl font-bold text-slate-900 border-b-2 border-slate-200 inline-block px-12 pb-2">
                Entrepreneur
              </p>
              <p className="text-lg text-slate-500 italic">has successfully completed the course</p>
              <p className="text-2xl font-bold text-primary max-w-2xl mx-auto leading-tight">
                {resource.title}
              </p>
            </div>

            <div className="flex justify-between items-end mt-20 pt-8 border-t border-slate-200">
              <div className="text-left">
                <p className="text-sm font-bold text-slate-800">{issueDate}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Date of Issue</p>
              </div>
              
              <div className="text-center">
                {/* QR Code Placeholder */}
                <div className="size-20 bg-slate-100 border-2 border-dashed border-slate-300 mx-auto mb-2 flex items-center justify-center">
                  <span className="text-[10px] text-slate-400">QR CODE</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">{certId}</p>
              </div>

              <div className="text-right">
                <p className="text-lg font-serif italic text-slate-800 border-b border-slate-400 px-4 mb-1">Jane Doe</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Director of Education</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
