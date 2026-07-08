import { SectionHeader } from "@/components/section-header";
import { Scoreboard } from "@/components/scoreboard";

export const metadata = { title: "scoreboard ⊹ prox vertical engine" };

export default function ScoreboardPage() {
  return (
    <div>
      <SectionHeader num="02" title="scoreboard" />
      <Scoreboard />
    </div>
  );
}
