import { Champion, Role, Position } from './types';
import championsData from '../data/champions.json';
import championPositionsData from '../data/champion-positions.json';
import itemsData from '../data/items.json';

// 导入真实的英雄数据
export const champions: Champion[] = championsData as Champion[];

// 导入装备数据
const itemsMap = new Map(
  (itemsData as any).items.map((item: any) => [item.name, item])
);

// 英雄位置映射
export const championPositions = championPositionsData as Record<string, string[]>;

// 位置定义（路）
export const positions: Position[] = [
  { id: 'all', name: '全部', icon: '🌟' },
  { id: 'top', name: '上单', icon: '⬆️' },
  { id: 'jungle', name: '打野', icon: '🌲' },
  { id: 'mid', name: '中路', icon: '⭐' },
  { id: 'adc', name: '下路', icon: '⬇️' },
  { id: 'support', name: '辅助', icon: '🛡️' },
];

// 定位定义（职业类型）
export const roles: Role[] = [
  { id: 'all', name: '全部', nameCN: '全部', icon: '🌟' },
  {
    id: 'fighter',
    name: 'Fighter',
    nameCN: '战士',
    icon: '⚔️',
  },
  {
    id: 'mage',
    name: 'Mage',
    nameCN: '法师',
    icon: '🔮',
  },
  {
    id: 'assassin',
    name: 'Assassin',
    nameCN: '刺客',
    icon: '🗡️',
  },
  {
    id: 'tank',
    name: 'Tank',
    nameCN: '坦克',
    icon: '🛡️',
  },
  {
    id: 'marksman',
    name: 'Marksman',
    nameCN: '射手',
    icon: '🏹',
  },
  {
    id: 'support',
    name: 'Support',
    nameCN: '辅助',
    icon: '💫',
  },
];

// 辅助函数：根据难度获取难度等级
export function getDifficultyLabel(difficulty: number): string {
  if (difficulty <= 3) return '简单';
  if (difficulty <= 6) return '中等';
  return '困难';
}

// 辅助函数：根据难度获取颜色
export function getDifficultyColor(difficulty: number): string {
  if (difficulty <= 3) return 'text-green-400';
  if (difficulty <= 6) return 'text-yellow-400';
  return 'text-red-400';
}

// 辅助函数：将英文职业转换为中文
export function getRoleNameCN(roleId: string): string {
  const roleMap: Record<string, string> = {
    fighter: '战士',
    mage: '法师',
    assassin: '刺客',
    tank: '坦克',
    marksman: '射手',
    support: '辅助',
  };
  return roleMap[roleId] || roleId;
}

// 辅助函数：根据装备名称获取装备信息
export function getItemByName(itemName: string): { id: string; name: string; image: string } | null {
  const item = itemsMap.get(itemName) as any;
  if (!item) {
    return null;
  }
  return {
    id: item.itemId,
    name: item.name,
    image: item.iconPath,
  };
}
