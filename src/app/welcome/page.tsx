"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SwitchLanguage from "@/components/share/SwitchLanguage";
import { useRouter } from "next/navigation";
import MButton from "@/components/m-ui/m-button";
import {
  FileText,
  Upload,
  FolderPlus,
  Search,
  Shield,
  Brain,
  Zap,
} from "lucide-react";

export default function WelcomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header Section */}
      <header className="border-b bg-white dark:bg-slate-950 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              File Management System
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Docs</Button>
            <Button variant="ghost">Support</Button>
            <Button variant="outline" onClick={() => router.push("/signin")}>
              Sign In
            </Button>
            <SwitchLanguage />
            <MButton size="sm" preset="primary">
              Get Started
            </MButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Welcome to{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            AI File Management System
          </span>
        </h1>
        <p className="text-xl md:text-2xl font-mono text-slate-600 dark:text-slate-300 max-w-3xl mb-12">
          This is a file management system that allows you to manage your files
          with AI
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button size="lg" className="flex-1 gap-2">
            <FolderPlus className="h-5 w-5" />
            Create New Folder
          </Button>
          <Button size="lg" variant="outline" className="flex-1 gap-2">
            <Upload className="h-5 w-5" />
            Upload Files
          </Button>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            className="pl-10 py-6 text-lg"
            placeholder="Search files, folders or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful AI Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle>Smart Categorization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300">
                AI automatically categorizes your files based on content, making
                organization effortless.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Content Search</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300">
                Search inside documents, images, and even videos with our
                advanced AI search capabilities.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Document Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300">
                Extract insights, summarize content, and identify key
                information from your documents.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Automation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300">
                Create workflows that automatically process, route, and act on
                files based on their content.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <CardTitle>Secure Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300">
                End-to-end encryption and advanced access controls keep your
                sensitive files protected.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-rose-100 dark:bg-rose-900 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-rose-600 dark:text-rose-400" />
              </div>
              <CardTitle>Version Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300">
                Track changes, revert to previous versions, and collaborate with
                confidence.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Try Our Interface
        </h2>
        <p className="text-lg text-center text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-12">
          Experience our intuitive dashboard with intelligent file management
          capabilities
        </p>

        <Tabs defaultValue="files" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="files">My Files</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>

          <TabsContent
            value="files"
            className="border rounded-lg bg-white dark:bg-slate-950 p-6"
          >
            <div className="space-y-4">
              {[
                "Annual Report.pdf",
                "Project Proposal.docx",
                "Financial Analysis.xlsx",
                "Meeting Notes.md",
              ].map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span>{file}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="recent"
            className="border rounded-lg bg-white dark:bg-slate-950 p-6"
          >
            <div className="space-y-4">
              {[
                "Marketing Strategy.pptx",
                "Customer Data.csv",
                "Product Roadmap.pdf",
              ].map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span>{file}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="shared"
            className="border rounded-lg bg-white dark:bg-slate-950 p-6"
          >
            <div className="space-y-4">
              {[
                "Team Budget.xlsx",
                "Project Timeline.pdf",
                "Research Notes.docx",
              ].map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span>{file}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Open
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 dark:bg-indigo-800 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to transform your file management?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have streamlined their workflow with our
            AI-powered system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-indigo-700"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-indigo-400" />
                <span className="text-xl font-bold text-white">
                  file management system
                </span>
              </div>
              <p className="mb-4">
                Intelligent file management for the modern workspace.
              </p>
              <p>© 2025 FileNexus AI. All rights reserved.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Enterprise
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
