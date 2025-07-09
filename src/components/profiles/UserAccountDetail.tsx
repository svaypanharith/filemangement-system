"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import MButton from "@/components/m-ui/m-button";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Calendar, MoreVertical, Edit } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useGetProfileInfoQuery } from "@/redux/slices/data-slice";
import { User as UserType } from "../setting/EditProfileDialog";
import { useEffect } from "react";

interface UserAccountDetailProps {
  onOpenEditProfileDialog: () => void;
  onGetProfileInfo: (user: UserType) => void;
}

export default function UserAccountDetail({
  onOpenEditProfileDialog,
  onGetProfileInfo,
}: UserAccountDetailProps) {
  const { t } = useTranslation();
  const { data: profile } = useGetProfileInfoQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  useEffect(() => {
    if (profile) {
      onGetProfileInfo(profile.user as UserType);
    }
  }, [profile]);
  return (
    <>
      <div className="w-full mx-auto">
        <Card className="border-0 shadow-xl max-w-md  flex flex-col gap-4 from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {t("user_account.account_overview")}
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
                <div className="bg-gray-100 w-12 h-12 flex items-center justify-center rounded-full p-2">
                   <p className="text-lg font-semibold">
                    {profile?.user.first_name.slice(0, 1).toUpperCase()}
                   </p> 
                </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-6">
                  <p className="text-lg font-semibold">
                    {profile?.user.first_name}
                  </p>
                  <Badge className="text-xs bg-blue-500 rounded-full text-white">
                    Pro
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {profile?.user.email}
                </p>
              </div>
            </div>
            <Separator className="my-4" />

            {/* user account*/}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-gray-50 cursor-pointer dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-4">
                <div className="bg-blue-200 rounded-full p-2">
                  <User className="h-4 w-4 text-blue-500 " />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">
                    {t("user_account.user_name")}{" "}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {profile?.user.first_name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-50 cursor-pointer dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-4">
                <div className="bg-blue-200 rounded-full p-2">
                  <Mail className="h-4 w-4 text-blue-500 " />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">
                    {t("user_account.user_email")}{" "}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {profile?.user.email}
                  </p>
                </div>
              </div>
              {/* member since */}
              <div className="flex items-center gap-4 bg-gray-50 cursor-pointer dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 p-4">
                <div className="bg-blue-200 rounded-full p-2">
                  <Calendar className="h-4 w-4 text-blue-500 " />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold">
                    {t("user_account.member_since")}{" "}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(
                      profile?.user.created_at || ""
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
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
                {t("user_account.edit_profile")}
              </MButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
