"use client";

import * as React from "react";
import {
  Apple,
  ArmchairIcon,
  BookOpen,
  Frame,
  HomeIcon,
  Settings2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/components/logo";
import { useTheme } from "next-themes";

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: HomeIcon,
      isActive: true,
      items: [
        {
          title: "Calendar",
          url: "/dashboard",
        },
        {
          title: "Analytics",
          url: "#",
        },
      ],
    },
    {
      title: "Exercises",
      url: "/exercises",
      icon: ArmchairIcon,
      isActive: true,
      items: [
        {
          title: "Exercises",
          url: "/exercises/list",
        },
        {
          title: "Muscle Groups",
          url: "/exercises/muscle-groups",
        },
      ],
    },
    {
      title: "Workouts",
      url: "/workouts",
      icon: BookOpen,
      items: [
        {
          title: "Workouts",
          url: "/workouts/list",
        },
        {
          title: "Scheduled Workouts",
          url: "/workouts/scheduled",
        },
        {
          title: "Workout Templates",
          url: "/workouts/templates",
        },
      ],
    },
    {
      title: "Nutrition Plans",
      url: "/nutrition-plans",
      icon: Apple,
      items: [
        {
          title: "Nutrition Plans",
          url: "/nutrition-plans/list",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Back Training",
      url: "#",
      icon: Frame,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { theme } = useTheme();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center  pt-4 gap-2 shrink-0">
          <Logo variant={theme === "dark" ? "dark" : "light"} size="medium" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={props.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
