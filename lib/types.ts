export interface Champion {
  id: string;
  heroId: string;
  name: string;
  title: string;
  alias: string;
  roles: string[];
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
  description: string;
  image: string;
  splashImage: string;
  instanceId: string;
  selectAudio: string;
  banAudio: string;
  keywords: string;
}

export type RoleType = 'all' | 'mage' | 'fighter' | 'tank' | 'assassin' | 'support' | 'marksman';
export type PositionType = 'all' | 'top' | 'jungle' | 'mid' | 'adc' | 'support';

export interface Role {
  id: RoleType;
  name: string;
  nameCN: string;
  icon: string;
}

export interface Position {
  id: PositionType;
  name: string;
  icon: string;
}

// 英雄详情数据结构
export interface ChampionDetail {
  builds: BuildGroup[];
  hextech: {
    silver: string[];
    gold: string[];
    prismatic: string[];
  };
  skillOrder: string;
}

export interface BuildGroup {
  name: string;
  items: string[];
}
