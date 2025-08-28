"use client";
import { useState } from "react";
import Head from "next/head";

import { Team } from "@/utils/types";
import TeamHeader from "./componenets/TeamHeader";
import TeamGrid from "./componenets/TeamGrid";
import TeamModal from "./componenets/TeamModal";

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter teams based on search query
  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100">
      <Head>
        <title>Teams | Summer Planner</title>
        <meta name="description" content="Collaborate with your teams" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <TeamHeader
          teamCount={teams.length}
          onAddTeam={() => setShowModal(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <TeamGrid
          teams={filteredTeams}
          onEditTeam={(team) => console.log("Edit", team)}
          onDeleteTeam={(teamId) =>
            setTeams(teams.filter((t) => t.id !== teamId))
          }
        />

        {showModal && (
          <TeamModal
            onClose={() => setShowModal(false)}
            onSave={(newTeam) => {
              setTeams([...teams, { ...newTeam, id: Date.now().toString() }]);
              setShowModal(false);
            }}
          />
        )}
      </main>
    </div>
  );
}
