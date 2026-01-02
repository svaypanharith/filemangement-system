
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SwitchLanguage from "@/components/share/SwitchLanguage";
import { useRouter } from "next/navigation";
import MButton from "@/components/m-ui/m-button";
import { useTranslation } from "react-i18next";
import Image from "next/image";

import { Github, Linkedin, Twitter } from "lucide-react";
import {
  Brain,
  Zap,
  Palette,
  Sparkles,
  FileText,
  Shield,
  Users,
  ArrowRight,
  Upload,
  User
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t("welcome.file_management")}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <SwitchLanguage />
              <MButton
                size="sm"
                className="cursor-pointer"
                onClick={() => router.push("/signin")}
                preset="primary"
              >
                {t("signin.button")}
              </MButton>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto py-4 ">
          <div className=" max-w-4xl mx-auto text-center gap-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              {t("welcome.ai_powered")}
            </div>

            <div className="w-full flex flex-col gap-6 items-center justify-center">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                {t("welcome.title")}
              </h1>
              <h1 className=" text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> {t("welcome.title_description")}</h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t("welcome.description")}
              </p>
            </div>
  
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button size="lg" className="bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 
              hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold"
              onClick={() => router.push("/signup")}
              >
                {t("welcome.button")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t("welcome.powerful_features")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("welcome.features_description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {t("welcome.smart_categorization")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {t("welcome.smart_categorization_desc")}
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 2 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {t("welcome.lightning_search")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {t("welcome.lightning_search_desc")}
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 3 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {t("welcome.secure_storage")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {t("welcome.secure_storage_desc")}
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 4 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {t("welcome.team_collaboration")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {t("welcome.team_collaboration_desc")}
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 5 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Palette className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {t("welcome.custom_themes")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {t("welcome.custom_themes_desc")}
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 6 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {t("welcome.smart_analytics")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {t("welcome.smart_analytics_desc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      <section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {t("welcome.meet_our_expert_team")}
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {t("welcome.passionate_developers")}
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Team Member 1 */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="relative h-80 w-full">
           
           <Image
  src="/assets/Image/Gemini_Generated_Image_9fsdp69fsdp69fsd.png"
  alt="Developer 1"
  width={400}  // Required: Add width
  height={400} // Required: Add height
  className="object-cover w-full h-80" // Ensure full width and fixed height
  priority // Optional: Preload important images
/>
          
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900">Svay Panharith</h3>
          <p className="text-blue-600 mb-4">Full Stack Developer</p>
          <p className="text-gray-600 mb-4">Full-stack developer with 1+ years of experience in modern web technologies.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="relative h-80 w-full">
     <Image
  src="/assets/Image/vicheaimage.jpg"
  alt="Developer 1"
  width={400}
  height={400}
  className="object-cover w-full h-80"
  priority 
/>
      
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900">Vibol Sovichea</h3>
          <p className="text-blue-600 mb-4">Lead Developer</p>
          <p className="text-gray-600 mb-4">A visionary in the digital space, our Lead Developer is obsessed with clean code and cutting-edge tech. Vibol Sovichea leads our engineering team with a focus on high-performance applications and intuitive user experiences that push the boundaries of what's possible.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="w-full flex items-center justify-center h-80">
           <User color="blue" size={100} />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900">Peng ReakSmey</h3>
          <p className="text-blue-600 mb-4">Frontend Developer</p>
          <p className="text-gray-600 mb-4">Creating beautiful and intuitive user experiences that people love.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
        <div className="relative h-80 w-full flex items-center justify-center">
          <User color="blue" size={100} />
        
         
          {/* <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Developer 2"
            fill
            className="object-cover"
          /> */}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900">NyTa TEP</h3>
          <p className="text-blue-600 mb-4">UI/UX Designer</p>
          <p className="text-gray-600 mb-4">Creating beautiful and intuitive user experiences that people love.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      {/* Add more team members as needed */}
      
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            {t("welcome.ready_to_transform")}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t("welcome.join_thousands")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              {t("welcome.start_free_trial")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold">
              {t("welcome.learn_more")}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">{t("welcome.file_management")}</h3>
            </div>
            <p className="text-gray-400 mb-6">
              {t("welcome.intelligent_file_management")}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <span>© 2024 {t("welcome.file_management")}. {t("welcome.all_rights_reserved")}</span>
              <span>•</span>
              <span>{t("welcome.privacy_policy")}</span>
              <span>•</span>
              <span>{t("welcome.terms_of_service")}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
