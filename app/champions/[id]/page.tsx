import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { champions, getItemByName } from '@/lib/data';
import { ChampionDetail } from '@/lib/types';
import championDetailsData from '@/data/champion-details.json';

export default function ChampionPage({ params }: { params: { id: string } }) {
  const champion = champions.find((c) => c.id === params.id);

  if (!champion) {
    notFound();
  }

  // 获取英雄详情数据
  const detailsData = championDetailsData as Record<string, ChampionDetail>;
  const details = detailsData[params.id];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <Link
        href="/"
        className="inline-flex items-center mb-6 text-gold-light hover:text-gold transition-colors"
      >
        <span className="mr-2">←</span> 返回英雄列表
      </Link>

      {/* 英雄头部信息 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* 英雄大图 */}
        <div className="lg:col-span-1">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden border-2 border-gold/30">
            <Image
              src={champion.splashImage}
              alt={`${champion.name} - ${champion.title}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* 英雄基本信息 */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gold">
            {champion.name}
          </h1>
          <p className="text-xl text-gold-light mb-6">{champion.title}</p>

          {/* 属性 */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg border border-gold/30 bg-slate-800/30">
              <div className="text-sm text-gold-light/70 mb-1">攻击</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500"
                    style={{ width: `${(champion.attack / 10) * 100}%` }}
                  />
                </div>
                <span className="text-gold font-bold">{champion.attack}</span>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-gold/30 bg-slate-800/30">
              <div className="text-sm text-gold-light/70 mb-1">防御</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${(champion.defense / 10) * 100}%` }}
                  />
                </div>
                <span className="text-gold font-bold">{champion.defense}</span>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-gold/30 bg-slate-800/30">
              <div className="text-sm text-gold-light/70 mb-1">魔法</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-500"
                    style={{ width: `${(champion.magic / 10) * 100}%` }}
                  />
                </div>
                <span className="text-gold font-bold">{champion.magic}</span>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-gold/30 bg-slate-800/30">
              <div className="text-sm text-gold-light/70 mb-1">难度</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500"
                    style={{ width: `${(champion.difficulty / 10) * 100}%` }}
                  />
                </div>
                <span className="text-gold font-bold">{champion.difficulty}</span>
              </div>
            </div>
          </div>

          {/* 定位 */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-gold-light">定位</h3>
            <div className="flex flex-wrap gap-2">
              {champion.roles.map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 rounded-full text-sm font-medium capitalize"
                  style={{
                    backgroundColor: 'rgb(10 200 185 / 0.2)',
                    color: 'var(--color-blue)',
                  }}
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 英雄详情数据 */}
      {details ? (
        <div className="space-y-8">
          {/* 出装推荐 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gold">出装推荐</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {details.builds.map((build, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border border-gold/30 bg-slate-800/30"
                >
                  <h3 className="text-lg font-semibold mb-4 text-gold-light">
                    {build.name}
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {build.items.map((itemName, index) => {
                      // 支持用斜杠分隔的多个装备
                      const itemNames = itemName.split('/').map(name => name.trim());
                      const primaryItem = getItemByName(itemNames[0]);
                      const secondaryItem = itemNames[1] ? getItemByName(itemNames[1]) : null;

                      // 调试信息
                      if (itemNames.length > 1) {
                        console.log('装备:', itemName);
                        console.log('分割后:', itemNames);
                        console.log('主装备:', primaryItem);
                        console.log('备选装备:', secondaryItem);
                      }

                      if (!primaryItem) return null;

                      return (
                        <div
                          key={`${primaryItem.id}-${index}`}
                          className="flex flex-col items-center p-2 rounded bg-slate-700/50 hover:bg-slate-700 transition-colors"
                        >
                          <div className="relative w-12 h-12 mb-2">
                            {/* 主装备图标 */}
                            <Image
                              src={primaryItem.image}
                              alt={primaryItem.name}
                              fill
                              className="object-contain"
                            />
                            {/* 备选装备小图标 */}
                            {secondaryItem && (
                              <div className="absolute bottom-0 right-0 w-9 h-9 border border-gold/50 rounded-sm bg-slate-800 overflow-hidden">
                                <Image
                                  src={secondaryItem.image}
                                  alt={secondaryItem.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-center text-gold-light/80">
                            {primaryItem.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 海克斯推荐 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-gold">海克斯推荐</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 银色海克斯 */}
              <div className="p-6 rounded-lg border border-gray-400/30 bg-slate-800/30">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="text-gray-400">🥈</span>
                  <span className="text-gray-300">银色海克斯</span>
                </h3>
                <ul className="space-y-2">
                  {details.hextech.silver.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-gold-light/80 flex items-start gap-2"
                    >
                      <span className="text-gray-400">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 金色海克斯 */}
              <div className="p-6 rounded-lg border border-yellow-500/30 bg-slate-800/30">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="text-yellow-500">🥇</span>
                  <span className="text-yellow-400">金色海克斯</span>
                </h3>
                <ul className="space-y-2">
                  {details.hextech.gold.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-gold-light/80 flex items-start gap-2"
                    >
                      <span className="text-yellow-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 彩色海克斯 */}
              <div className="p-6 rounded-lg border border-purple-500/30 bg-slate-800/30">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <span className="text-purple-500">💎</span>
                  <span className="text-purple-400">彩色海克斯</span>
                </h3>
                <ul className="space-y-2">
                  {details.hextech.prismatic.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm text-gold-light/80 flex items-start gap-2"
                    >
                      <span className="text-purple-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 技能加点 */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gold">技能加点</h2>
            <div className="p-6 rounded-lg border border-gold/30 bg-slate-800/30">
              <p className="text-xl text-gold-light">{details.skillOrder}</p>
            </div>
          </section>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gold-light/70">
            该英雄的详细数据正在准备中...
          </p>
          <p className="text-sm text-gold-light/50 mt-2">
            数据文件位置: data/champion-details.json
          </p>
        </div>
      )}
    </div>
  );
}
