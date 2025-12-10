'use client';

import { positions, roles } from '@/lib/data';
import { PositionType, RoleType } from '@/lib/types';

interface ChampionFiltersProps {
  selectedPosition: PositionType;
  selectedRole: RoleType;
  searchQuery: string;
  onPositionChange: (position: PositionType) => void;
  onRoleChange: (role: RoleType) => void;
  onSearchChange: (query: string) => void;
}

export default function ChampionFilters({
  selectedPosition,
  selectedRole,
  searchQuery,
  onPositionChange,
  onRoleChange,
  onSearchChange,
}: ChampionFiltersProps) {
  return (
    <div className="flex gap-4 items-center">
      {/* 搜索框 */}
      <div className="w-64">
        <input
          type="text"
          placeholder="搜索英雄..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border-2 transition-all text-sm"
          style={{
            borderColor: 'rgb(200 155 60 / 0.3)',
            backgroundColor: 'rgb(30 41 59 / 0.5)',
            color: 'var(--color-gold-light)',
          }}
        />
      </div>

      {/* 位置筛选 */}
      <div className="flex gap-2">
        {positions.map((position) => (
          <button
            key={position.id}
            onClick={() => onPositionChange(position.id)}
            className="px-2 py-1.5 rounded-lg font-medium transition-all text-xs"
            style={{
              backgroundColor:
                selectedPosition === position.id
                  ? 'var(--color-gold)'
                  : 'rgb(30 41 59 / 0.5)',
              color:
                selectedPosition === position.id
                  ? 'rgb(15 23 42)'
                  : 'var(--color-gold-light)',
              borderWidth: '2px',
              borderColor:
                selectedPosition === position.id
                  ? 'var(--color-gold)'
                  : 'rgb(200 155 60 / 0.3)',
            }}
          >
            <span className="mr-1">{position.icon}</span>
            {position.name}
          </button>
        ))}
      </div>

      {/* 定位筛选 */}
      <div className="flex gap-2">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => onRoleChange(role.id)}
            className="px-2 py-1.5 rounded-lg font-medium transition-all text-xs"
            style={{
              backgroundColor:
                selectedRole === role.id
                  ? 'var(--color-blue)'
                  : 'rgb(30 41 59 / 0.5)',
              color:
                selectedRole === role.id
                  ? 'white'
                  : 'var(--color-gold-light)',
              borderWidth: '2px',
              borderColor:
                selectedRole === role.id
                  ? 'var(--color-blue)'
                  : 'rgb(10 200 185 / 0.3)',
            }}
          >
            <span className="mr-1">{role.icon}</span>
            {role.nameCN}
          </button>
        ))}
      </div>
    </div>
  );
}
