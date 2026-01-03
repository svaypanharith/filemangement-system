"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText }  from 'lucide-react'
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Forward } from "lucide-react";

interface MyDocumentProps{
  title: string;
}

export default function MyDocument(
  {
  }
) {
   const { t } = useTranslation();
   return (
    <div className="flex flex-col w-full h-full">
         <Card className="w-full h-full">
               <CardHeader>
                  <CardTitle className="flex flex-row items-center gap-2">
                  <FileText className="mr-2"/>
                  {t('dashboard.my_documents')}
                    <div className="w-full  flex justify-end">
                      <Button className="bg-transparent border-gray-500 rounded">
                          <div className="flex flex-row items-center gap-2">
                            <Forward className="text-black"/>
                            <span className="text-black">
                            Share
                          </span>
                          </div>
                          
                      </Button>
                    </div>
                  </CardTitle>
               </CardHeader>
         </Card>
    </div>
   );
}