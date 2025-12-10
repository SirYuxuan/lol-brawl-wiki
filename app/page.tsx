'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import ChampionCard from '@/components/ChampionCard';
import ChampionFilters from '@/components/ChampionFilters';
import { champions, championPositions, getItemByName } from '@/lib/data';
import { PositionType, RoleType, ChampionDetail } from '@/lib/types';
import championDetailsData from '@/data/champion-details.json';

const ITEMS_PER_PAGE = 18;

export default function Home() {
  const [selectedPosition, setSelectedPosition] = useState<PositionType>('all');
  const [selectedRole, setSelectedRole] = useState<RoleType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedChampionId, setSelectedChampionId] = useState<string | null>(null);

  // 筛选英雄
  const filteredChampions = useMemo(() => {
    return champions.filter((champion) => {
      // 位置筛选
      const positionMatch =
        selectedPosition === 'all' ||
        championPositions[champion.id]?.includes(selectedPosition) ||
        false;

      // 定位筛选
      const roleMatch =
        selectedRole === 'all' || champion.roles.includes(selectedRole);

      // 搜索筛选
      const searchMatch =
        searchQuery === '' ||
        champion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        champion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        champion.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
        champion.keywords.toLowerCase().includes(searchQuery.toLowerCase());

      return positionMatch && roleMatch && searchMatch;
    });
  }, [selectedPosition, selectedRole, searchQuery]);

  // 分页
  const totalPages = Math.ceil(filteredChampions.length / ITEMS_PER_PAGE);
  const paginatedChampions = filteredChampions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // 当筛选条件改变时重置页码
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedPosition, selectedRole, searchQuery]);

  // 获取选中英雄的完整数据
  const selectedChampion = selectedChampionId
    ? champions.find(c => c.id === selectedChampionId)
    : null;

  // 获取选中英雄的详细数据（通过名称查找）
  const championDetails = selectedChampion
    ? (championDetailsData as Record<string, ChampionDetail>)[selectedChampion.name]
    : null;

  return (
    <div className="container mx-auto px-4 py-4">
      {/* 筛选栏 */}
      <div className="mb-4">
        <ChampionFilters
          selectedPosition={selectedPosition}
          selectedRole={selectedRole}
          searchQuery={searchQuery}
          onPositionChange={setSelectedPosition}
          onRoleChange={setSelectedRole}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* 主体左右布局 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* 左侧：英雄列表 */}
        <main className="lg:col-span-2">
          <div>
          {/* 结果统计 */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gold-light">
              共找到 <span className="text-gold font-bold">{filteredChampions.length}</span> 个英雄
            </p>
            {totalPages > 1 && (
              <p className="text-sm text-gold-light/70">
                第 {currentPage} / {totalPages} 页
              </p>
            )}
          </div>

            {/* 英雄网格 */}
            {paginatedChampions.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {paginatedChampions.map((champion) => (
                  <ChampionCard
                    key={champion.id}
                    champion={champion}
                    onClick={() => setSelectedChampionId(champion.id)}
                    isSelected={champion.id === selectedChampionId}
                  />
                ))}
              </div>

              {/* 分页 */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: currentPage === 1 ? 'rgb(30 41 59 / 0.5)' : 'var(--color-gold)',
                      color: currentPage === 1 ? 'var(--color-gold-light)' : 'rgb(15 23 42)',
                    }}
                  >
                    上一页
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      return (
                        page === 1 ||
                        page === totalPages ||
                        Math.abs(page - currentPage) <= 2
                      );
                    })
                    .map((page, index, array) => {
                      if (index > 0 && array[index - 1] !== page - 1) {
                        return (
                          <span key={`ellipsis-${page}`} className="px-2 py-2 text-gold-light">
                            ...
                          </span>
                        );
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className="px-4 py-2 rounded-lg font-medium transition-all"
                          style={{
                            backgroundColor:
                              currentPage === page
                                ? 'var(--color-gold)'
                                : 'rgb(30 41 59 / 0.5)',
                            color:
                              currentPage === page
                                ? 'rgb(15 23 42)'
                                : 'var(--color-gold-light)',
                          }}
                        >
                          {page}
                        </button>
                      );
                    })}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor:
                        currentPage === totalPages
                          ? 'rgb(30 41 59 / 0.5)'
                          : 'var(--color-gold)',
                      color:
                        currentPage === totalPages
                          ? 'var(--color-gold-light)'
                          : 'rgb(15 23 42)',
                    }}
                  >
                    下一页
                  </button>
                </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gold-light/70">未找到匹配的英雄</p>
              </div>
            )}
          </div>
        </main>

        {/* 右侧英雄详情 - 固定显示 */}
        <aside className="lg:col-span-1">
          <div className="p-4 rounded-lg border-2 border-gold/30 bg-slate-800/50 backdrop-blur-lg relative">
              {selectedChampion ? (
                <>
                  {/* 关闭按钮 */}
                  <button
                    onClick={() => setSelectedChampionId(null)}
                    className="absolute top-3 right-3 text-gold-light hover:text-gold transition-colors text-xl"
                  >
                    ×
                  </button>

                  {/* 英雄头部信息 */}
                  <div className="text-center mb-4 pb-3 border-b border-gold/20">
                    <h2 className="text-xl font-bold text-gold mb-1">{selectedChampion.name}</h2>
                    <p className="text-xs text-gold-light/80 mb-2">{selectedChampion.title}</p>

                    {/* 技能加点 */}
                    {championDetails && championDetails.skillOrder ? (
                      <p className="text-base text-gold-light">{championDetails.skillOrder}</p>
                    ) : (
                      <p className="text-xs text-gold-light/60">暂无技能加点数据</p>
                    )}
                  </div>

                  {/* 详细数据 */}
                  {championDetails ? (
                    <div className="space-y-3">
                      {/* 出装推荐 */}
                      <div className="p-3 rounded-lg bg-slate-700/50">
                        <h3 className="text-base font-bold text-gold mb-2">出装推荐</h3>
                        <div className="space-y-3">
                          {championDetails.builds.map((build, buildIndex) => (
                            <div key={buildIndex}>
                              <h4 className="text-sm font-semibold text-gold-light mb-2">{build.name}</h4>
                              <div className="grid grid-cols-6 gap-2">
                                {build.items.map((itemName, itemIndex) => {
                                  // 支持用斜杠分隔的多个装备
                                  const itemNames = itemName.split('/').map(name => name.trim());
                                  const primaryItem = getItemByName(itemNames[0]);
                                  const secondaryItem = itemNames[1] ? getItemByName(itemNames[1]) : null;

                                  if (!primaryItem) return null;

                                  return (
                                    <div key={itemIndex} className="relative group">
                                      <div className="aspect-square relative rounded overflow-hidden border border-gold/30">
                                        {/* 主装备图标 */}
                                        <Image
                                          src={primaryItem.image}
                                          alt={primaryItem.name}
                                          fill
                                          className="object-cover"
                                        />
                                        {/* 备选装备小图标 */}
                                        {secondaryItem && (
                                          <div className="absolute bottom-0 right-0 w-6 h-6 border border-gold/50 rounded-sm bg-slate-800 overflow-hidden">
                                            <Image
                                              src={secondaryItem.image}
                                              alt={secondaryItem.name}
                                              fill
                                              className="object-contain"
                                            />
                                          </div>
                                        )}
                                      </div>
                                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-xs text-gold-light rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                        {primaryItem.name}
                                        {secondaryItem && ` / ${secondaryItem.name}`}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 海克斯推荐 */}
                      <div className="p-3 rounded-lg bg-slate-700/50">
                        <h3 className="text-base font-bold text-gold mb-2">海克斯推荐</h3>
                        <div className="space-y-2">
                          <div>
                            <h4 className="text-xs font-semibold text-gray-400 mb-1.5">银色</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {championDetails.hextech.silver.map((hex, idx) => (
                                <span key={idx} className="text-xs px-1.5 py-0.5 rounded bg-gray-700 text-gray-300">
                                  {hex}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-yellow-400 mb-1.5">金色</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {championDetails.hextech.gold.map((hex, idx) => (
                                <span key={idx} className="text-xs px-1.5 py-0.5 rounded bg-yellow-900/30 text-yellow-300">
                                  {hex}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-purple-400 mb-1.5">彩色</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {championDetails.hextech.prismatic.map((hex, idx) => (
                                <span key={idx} className="text-xs px-1.5 py-0.5 rounded bg-purple-900/30 text-purple-300">
                                  {hex}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-slate-700/50">
                        <h3 className="text-base font-bold text-gold mb-2">出装推荐</h3>
                        <p className="text-xs text-gold-light/60">数据待填充...</p>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-700/50">
                        <h3 className="text-base font-bold text-gold mb-2">海克斯推荐</h3>
                        <p className="text-xs text-gold-light/60">数据待填充...</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gold-light/60 text-sm">请选择一个英雄查看详情</p>
                </div>
              )}
          </div>
        </aside>
      </div>
    </div>
  );
}
