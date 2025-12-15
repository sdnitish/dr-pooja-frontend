import React from "react";
import PageLayout from "@/app/PageLayout";
import { ContactUs } from "@/app/components/sections/ContactUs";
import ServiceDetail from "@/app/components/sections/ServiceDetail";

const page = async ({ params }) => {
  const { slug } = await params; // ✅ await params, not params.slug

  return (
    <PageLayout>
      <ServiceDetail slug={slug} />
      <ContactUs />
    </PageLayout>
  );
};

export default page;
