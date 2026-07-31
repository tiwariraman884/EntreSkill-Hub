"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Search, MoreHorizontal, UserX, CheckCircle, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  mentorProfile?: {
    verificationStatus: string;
  };
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const url = new URL(window.location.origin + "/api/admin/users");
      if (roleFilter !== "all") {
        url.searchParams.set("role", roleFilter);
      }
      if (searchTerm) {
        url.searchParams.set("q", searchTerm);
      }

      const res = await fetch(url.toString());
      if (res.ok) {
        const json = await res.json();
        setUsers(json.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  }, [roleFilter, searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [fetchUsers]);

  const handleSuspend = async (userId: string) => {
    if (!confirm("Are you sure you want to suspend this user?")) return;
    setActionLoading(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}/suspend`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: "Admin suspended via dashboard" }),
      });
      if (res.ok) {
        alert("User suspended (Audit log created).");
        fetchUsers();
      } else {
        alert("Failed to suspend user.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleVerifyMentor = async (userId: string, decision: "verified" | "rejected") => {
    setActionLoading(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}/verify-mentor`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision, reason: `Admin ${decision} via dashboard` }),
      });
      if (res.ok) {
        alert(`Mentor profile ${decision}`);
        fetchUsers();
      } else {
        alert("Failed to process mentor verification.");
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
      >
        <h1 className="text-4xl font-bold tracking-tight font-heading">User Management</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Manage users, mentors, and administrators.
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or email..."
                className="pl-9 h-10 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["all", "user", "mentor", "admin"].map((role) => (
                <Button
                  key={role}
                  variant={roleFilter === role ? "default" : "outline"}
                  onClick={() => setRoleFilter(role)}
                  className="capitalize"
                >
                  {role === "all" ? "All" : `${role}s`}
                </Button>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Table>
              <TableHeader>
                <tr>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status / Mentor Status</TableHead>
                  <TableHead>Joined Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </tr>
              </TableHeader>
              <TableBody className="divide-y">
                {loading ? (
                  <tr>
                    <TableCell colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                      Loading users...
                    </TableCell>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === "admin"
                              ? "default"
                              : user.role === "mentor"
                                ? "secondary"
                                : "outline"
                          }
                          className="capitalize"
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.mentorProfile ? (
                          <Badge
                            variant={
                              user.mentorProfile.verificationStatus === "verified"
                                ? "default"
                                : user.mentorProfile.verificationStatus === "rejected"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className="capitalize"
                          >
                            Mentor: {user.mentorProfile.verificationStatus}
                          </Badge>
                        ) : (
                          <Badge variant="default" className="capitalize">
                            Active
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(user.createdAt || "2026-01-01").toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            className="inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors hover:bg-muted/60 h-9 w-9"
                            disabled={actionLoading === user._id}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive cursor-pointer"
                              onClick={() => handleSuspend(user._id)}
                            >
                              <UserX className="mr-2 h-4 w-4" /> Suspend User
                            </DropdownMenuItem>
                            {user.mentorProfile &&
                              user.mentorProfile.verificationStatus === "pending" && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-green-600 cursor-pointer"
                                    onClick={() => handleVerifyMentor(user._id, "verified")}
                                  >
                                    <CheckCircle className="mr-2 h-4 w-4" /> Verify Mentor
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600 cursor-pointer"
                                    onClick={() => handleVerifyMentor(user._id, "rejected")}
                                  >
                                    <XCircle className="mr-2 h-4 w-4" /> Reject Mentor
                                  </DropdownMenuItem>
                                </>
                              )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <tr>
                    <TableCell colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                      No users found matching your filters.
                    </TableCell>
                  </tr>
                )}
              </TableBody>
            </Table>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
