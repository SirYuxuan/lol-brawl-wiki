import Image from "next/image";
import { Champion } from "@/lib/types";
import { getDifficultyLabel, getDifficultyColor, getRoleNameCN } from "@/lib/data";

interface ChampionCardProps {
  champion: Champion;
  onClick: () => void;
  isSelected: boolean;
}

export default function ChampionCard({ champion, onClick, isSelected }: ChampionCardProps) {
  const difficultyLabel = getDifficultyLabel(champion.difficulty);
  const difficultyColor = getDifficultyColor(champion.difficulty);
  const primaryRole = champion.roles[0];
  const primaryRoleCN = getRoleNameCN(primaryRole);

  return (
    <button
      onClick={onClick}
      className={`champion-card group w-full text-left ${isSelected ? 'ring-2 ring-gold' : ''}`}
    >
      <div className="aspect-3/4 relative">
        <Image
          src={champion.splashImage}
          alt={`${champion.name} - ${champion.title}`}
          fill
          className="object-cover object-top transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-bold mb-1 text-gold">{champion.name}</h3>
          <p className="text-sm mb-2 text-gold-light/80">{champion.title}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs px-2 py-1 rounded text-blue" style={{backgroundColor: 'rgb(10 200 185 / 0.2)'}}>
              {primaryRoleCN}
            </span>
            <span className={`text-xs px-2 py-1 rounded bg-opacity-20 ${difficultyColor}`}
              style={{backgroundColor: difficultyColor.includes('green') ? 'rgb(34 197 94 / 0.2)' : difficultyColor.includes('yellow') ? 'rgb(234 179 8 / 0.2)' : 'rgb(239 68 68 / 0.2)'}}>
              {difficultyLabel}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
