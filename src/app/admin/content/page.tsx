"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, CheckCircle, XCircle } from "lucide-react";

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState("ideas");
  const [ideas, setIdeas] = useState<unknown[]>([]);
  const [resources, setResources] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/business-ideas");
      if (res.ok) {
        const json = await res.json();
        setIdeas(json.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchResources = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content/pending");
      if (res.ok) {
        const json = await res.json();
        setResources(json.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (activeTab === "ideas") {
        await fetchIdeas();
      } else if (activeTab === "resources") {
        await fetchResources();
      }
    };
    fetchData();
  }, [activeTab]);

  const handleResourceApproval = async (id: string, decision: "approved" | "rejected") => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/admin/content/${id}/approve`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision })
      });
      if (res.ok) {
        alert(`Resource ${decision}`);
        fetchResources();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Curation</h1>
          <p className="text-muted-foreground mt-2">
            Manage business ideas, roadmaps, and learning resources.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Content
        </Button>
      </div>

      <Tabs defaultValue="ideas" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="ideas">Business Ideas</TabsTrigger>
          <TabsTrigger value="roadmaps">Roadmaps</TabsTrigger>
          <TabsTrigger value="resources">Learning Resources (Pending)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ideas">
          <Card>
            <CardHeader>
              <CardTitle>Business Ideas Catalog</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Title</th>
                      <th className="px-4 py-3 font-medium">Difficulty</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {loading ? (
                      <tr><td colSpan={4} className="px-4 py-8 text-center">Loading...</td></tr>
                    ) : ideas.length > 0 ? (
                      ideas.map((idea) => (
                        <tr key={(idea as { _id: string })._id} className="hover:bg-muted/30">
                          <td className="px-4 py-3 font-medium">{(idea as { title: string }).title}</td>
                          <td className="px-4 py-3 text-muted-foreground capitalize">{(idea as { difficultyLevel: string }).difficultyLevel}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${(idea as { isActive: boolean }).isActive ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {(idea as { isActive: boolean }).isActive ? "Published" : "Draft"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No ideas found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roadmaps">
          <Card>
            <CardHeader>
              <CardTitle>Learning Roadmaps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Roadmaps are managed under their corresponding Business Idea.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Pending Learning Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">Title</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">URL</th>
                      <th className="px-4 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {loading ? (
                      <tr><td colSpan={4} className="px-4 py-8 text-center">Loading...</td></tr>
                    ) : resources.length > 0 ? (
                      resources.map((res) => (
                        <tr key={(res as { _id: string })._id} className="hover:bg-muted/30">
                          <td className="px-4 py-3 font-medium">{(res as { title: string }).title}</td>
                          <td className="px-4 py-3 text-muted-foreground capitalize">{(res as { type: string }).type}</td>
                          <td className="px-4 py-3 text-blue-500 underline">
                            <a href={(res as { url: string }).url} target="_blank" rel="noreferrer">View</a>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="text-green-600" onClick={() => handleResourceApproval((res as { _id: string })._id, "approved")} disabled={actionLoading === (res as { _id: string })._id}><CheckCircle className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="icon" className="text-red-600" onClick={() => handleResourceApproval((res as { _id: string })._id, "rejected")} disabled={actionLoading === (res as { _id: string })._id}><XCircle className="h-4 w-4" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No pending resources.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
