"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MButton from "@/components/m-ui/m-button";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Calendar, MoreVertical, Edit } from "lucide-react";

// user account wrapper

interface UserAccountDetailProps {
  onOpenEditProfileDialog: () => void;
}

const userAccountWrapper = (
  icon: React.ReactNode,
  header: string,
  description: string
) => {
  return (
    <div className="flex items-center gap-4 bg-gray-50 cursor-pointer dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-4">
      <div className="bg-blue-200 rounded-full p-2">{icon}</div>
      <div className="flex flex-col">
        <p className="text-sm font-semibold">{header}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function UserAccountDetail({
  onOpenEditProfileDialog,
}: UserAccountDetailProps) {
  return (
    <>
      <div className="w-full mx-auto">
        <Card className="border-0 shadow-xl max-w-md  flex flex-col gap-4 from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Account Overview
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-6">
                  <p className="text-lg font-semibold">Panharith</p>
                  <Badge className="text-xs bg-blue-500 rounded-full text-white">
                    Pro
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  svaypanharith@gmail.com
                </p>
              </div>
            </div>
            <Separator className="my-4" />

            {/* user account*/}
            <div className="flex flex-col gap-4">
              {userAccountWrapper(
                <User className="h-4 w-4 text-blue-500 " />,
                "Username",
                "svaypanharith"
              )}
              {/* email */}
              {userAccountWrapper(
                <Mail className="h-4 w-4 text-green-500 " />,
                "Email",
                "svaypanharith@gmail.com"
              )}

              {/* member since */}
              {userAccountWrapper(
                <Calendar className="h-4 w-4 text-purple-500 " />,
                "Member since",
                "2024-01-01"
              )}
            </div>
            <Separator className="my-4" />
            <div className="flex items-center w-full gap-4">
              <MButton
                onClick={() => {
                  onOpenEditProfileDialog();
                }}
                preset="primary"
                size="sm"
                className="w-full flex items-center justify-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </MButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
