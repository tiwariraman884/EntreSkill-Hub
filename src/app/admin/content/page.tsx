"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
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
        body: JSON.stringify({ decision }),
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
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight font-heading">Content Curation</h1>
          <p className="text-muted-foreground text-lg mt-2">
            Manage business ideas, roadmaps, and learning resources.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Content
        </Button>
      </motion.div>

      <Tabs defaultValue="ideas" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="ideas">Business Ideas</TabsTrigger>
          <TabsTrigger value="roadmaps">Roadmaps</TabsTrigger>
          <TabsTrigger value="resources">Learning Resources (Pending)</TabsTrigger>
        </TabsList>

        <TabsContent value="ideas">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Business Ideas Catalog</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableHead>Title</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </tr>
                  </TableHeader>
                  <TableBody className="divide-y">
                    {loading ? (
                      <tr>
                        <TableCell colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                          Loading...
                        </TableCell>
                      </tr>
                    ) : ideas.length > 0 ? (
                      ideas.map((idea) => (
                        <TableRow key={(idea as { _id: string })._id}>
                          <TableCell className="font-medium">
                            {(idea as { title: string }).title}
                          </TableCell>
                          <TableCell className="text-muted-foreground capitalize">
                            {(idea as { difficultyLevel: string }).difficultyLevel}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                (idea as { isActive: boolean }).isActive
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {(idea as { isActive: boolean }).isActive ? "Published" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <tr>
                        <TableCell colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                          No ideas found.
                        </TableCell>
                      </tr>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="roadmaps">
          <Card>
            <CardHeader>
              <CardTitle>Learning Roadmaps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Roadmaps are managed under their corresponding Business Idea.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Pending Learning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <tr>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>URL</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </tr>
                  </TableHeader>
                  <TableBody className="divide-y">
                    {loading ? (
                      <tr>
                        <TableCell colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                          Loading...
                        </TableCell>
                      </tr>
                    ) : resources.length > 0 ? (
                      resources.map((res) => (
                        <TableRow key={(res as { _id: string })._id}>
                          <TableCell className="font-medium">
                            {(res as { title: string }).title}
                          </TableCell>
                          <TableCell className="text-muted-foreground capitalize">
                            {(res as { type: string }).type}
                          </TableCell>
                          <TableCell className="text-primary underline">
                            <a
                              href={(res as { url: string }).url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View
                            </a>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-600"
                                onClick={() =>
                                  handleResourceApproval(
                                    (res as { _id: string })._id,
                                    "approved",
                                  )
                                }
                                disabled={actionLoading === (res as { _id: string })._id}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600"
                                onClick={() =>
                                  handleResourceApproval(
                                    (res as { _id: string })._id,
                                    "rejected",
                                  )
                                }
                                disabled={actionLoading === (res as { _id: string })._id}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <tr>
                        <TableCell colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                          No pending resources.
                        </TableCell>
                      </tr>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
