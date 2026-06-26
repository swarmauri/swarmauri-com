import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Briefcase, UserCheck } from "lucide-react";
import { CAREER_ROLES } from "../data/careers";
import { jobPostingNode, breadcrumbListSchema } from "@mdwrk/structured-data";
import StructuredData from "../components/StructuredData";
import CareerRoleCard from "../components/CareerRoleCard";
import CareerRoleDetails from "../components/CareerRoleDetails";
import CareerApplicationForm from "../components/CareerApplicationForm";
import SEO from "../components/SEO";

export default function CareersPage() {
  const { roleId } = useParams<{ roleId?: string }>();
  const [formData, setFormData] = useState({ name: "", email: "", github: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const selectedRole = roleId || null;

  // Identify active role
  const activeRoleData = useMemo(() => {
    if (!selectedRole) return null;
    return CAREER_ROLES.find((r) => r.id === selectedRole) || null;
  }, [selectedRole]);

  const makeJobNode = (role: typeof CAREER_ROLES[0]) => {
    return jobPostingNode({
      id: `https://swarmauri.com/careers/${role.id}#job`,
      name: role.title,
      title: role.title,
      description: role.description,
      datePosted: "2026-06-26",
      hiringOrganization: {
        id: "https://swarmauri.com#organization",
        name: "Swarmauri",
        url: "https://swarmauri.com"
      },
      validThrough: "2027-06-26",
      employmentType: "FULL_TIME",
      jobLocation: {
        id: "https://swarmauri.com/careers#location",
        addressCountry: "US"
      },
      baseSalary: {
        currency: "USD",
        value: 140000,
        unitText: "YEAR"
      }
    });
  };

  const structuredData = useMemo(() => {
    try {
      if (activeRoleData) {
        const jobNode = makeJobNode(activeRoleData);
        const breadcrumbs = breadcrumbListSchema({
          id: `https://swarmauri.com/careers/${activeRoleData.id}#breadcrumb`,
          items: [
            { label: "Home", href: "https://swarmauri.com" },
            { label: "Careers", href: "https://swarmauri.com/careers" },
            { label: activeRoleData.title, href: `https://swarmauri.com/careers/${activeRoleData.id}` }
          ]
        });
        return [jobNode, breadcrumbs];
      } else {
        const listNodes = CAREER_ROLES.map(makeJobNode);
        const breadcrumbs = breadcrumbListSchema({
          id: "https://swarmauri.com/careers#breadcrumb",
          items: [
            { label: "Home", href: "https://swarmauri.com" },
            { label: "Careers", href: "https://swarmauri.com/careers" }
          ]
        });
        return [...listNodes, breadcrumbs];
      }
    } catch (e) {
      console.error("Failed to build Careers structured data", e);
      return null;
    }
  }, [activeRoleData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", github: "", message: "" });
    }, 6000);
  };

  return (
    <div className="space-y-12 py-6" id="careers-container">
      {activeRoleData ? (
        <SEO
          title={`${activeRoleData.title} Role`}
          description={activeRoleData.description}
          keywords={[activeRoleData.title, activeRoleData.department, "swarmauri", "careers", "python engineer"]}
          ogType="job"
        />
      ) : (
        <SEO
          title="Swarmauri Careers"
          description="Build the next era of composable python components. Join Swarmauri's asynchronous-first, contract-first contributors and talent network."
          keywords={["careers", "talent network", "python jobs", "remote developer", "swarmauri"]}
        />
      )}
      {/* JobPosting JSON-LD */}
      <StructuredData data={structuredData} />

      {/* Page Header */}
      <div className="border-b border-zinc-200 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans flex items-center space-x-2">
          <Briefcase className="w-8 h-8 text-indigo-600" />
          <span>Swarmauri Careers & Talent Network</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1 max-w-2xl">
          Build the next era of composable python components. We operate an asynchronous-first, contract-first open source contributors network.
        </p>
      </div>

      {activeRoleData ? (
        /* Detailed Role and Application Form Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <CareerRoleDetails role={activeRoleData} />
          </div>
          <div className="lg:col-span-5">
            <CareerApplicationForm
              formData={formData}
              setFormData={setFormData}
              submitted={submitted}
              handleSubmit={handleSubmit}
              roleTitle={activeRoleData.title}
            />
          </div>
        </div>
      ) : (
        /* Active Roles Grid List view */
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-zinc-900 font-sans flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-zinc-500" />
            <span>Active Engineering Roles ({CAREER_ROLES.length})</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="careers-grid">
            {CAREER_ROLES.map((role) => (
              <CareerRoleCard key={role.id} role={role} />
            ))}
          </div>

          {/* Education Block */}
          <section className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 md:p-8 space-y-4" id="talent-education">
            <h3 className="font-sans font-bold text-zinc-950 text-sm">How Our Contributor Hiring Loop Operates</h3>
            <p className="text-xs text-zinc-600 leading-relaxed max-w-3xl">
              We do not run traditional resume-based filters. Because Swarmauri is an organic open-source monorepo, our primary staffing loop reviews active GitHub pull requests. We evaluate contributors based on PEP adherence, unit test coverage, typing validation, and package decoupling efficiency.
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
