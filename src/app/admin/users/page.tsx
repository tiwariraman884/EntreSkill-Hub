"use client";

import { useState, useEffect, useCallback } from "react";

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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreHorizontal, UserX, CheckCircle, XCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    // Debounce the search term
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
        body: JSON.stringify({ reason: "Admin suspended via dashboard" })
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
        body: JSON.stringify({ decision, reason: `Admin ${decision} via dashboard` })
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage users, mentors, and administrators.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name or email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={roleFilter === "all" ? "default" : "outline"} 
                onClick={() => setRoleFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={roleFilter === "user" ? "default" : "outline"} 
                onClick={() => setRoleFilter("user")}
              >
                Users
              </Button>
              <Button 
                variant={roleFilter === "mentor" ? "default" : "outline"} 
                onClick={() => setRoleFilter("mentor")}
              >
                Mentors
              </Button>
              <Button 
                variant={roleFilter === "admin" ? "default" : "outline"} 
                onClick={() => setRoleFilter("admin")}
              >
                Admins
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status / Mentor Status</th>
                  <th className="px-4 py-3 font-medium">Joined Date</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      Loading users...
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{user.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold capitalize
                          ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                            user.role === 'mentor' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {user.mentorProfile ? (
                           <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold capitalize
                           ${user.mentorProfile.verificationStatus === 'verified' ? 'bg-green-100 text-green-800' : 
                             user.mentorProfile.verificationStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                             'bg-yellow-100 text-yellow-800'}`}>
                           Mentor: {user.mentorProfile.verificationStatus}
                         </span>
                        ) : (
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold capitalize bg-green-100 text-green-800`}>
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(user.createdAt || "2026-01-01").toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted/50 h-9 w-9" disabled={actionLoading === user._id}>
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive cursor-pointer" onClick={() => handleSuspend(user._id)}>
                              <UserX className="mr-2 h-4 w-4" /> Suspend User
                            </DropdownMenuItem>
                            {user.mentorProfile && user.mentorProfile.verificationStatus === "pending" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-green-600 cursor-pointer" onClick={() => handleVerifyMentor(user._id, "verified")}>
                                  <CheckCircle className="mr-2 h-4 w-4" /> Verify Mentor
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => handleVerifyMentor(user._id, "rejected")}>
                                  <XCircle className="mr-2 h-4 w-4" /> Reject Mentor
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No users found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
