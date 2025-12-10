import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-md" style={{borderColor: 'rgb(200 155 60 / 0.2)', backgroundColor: 'rgb(15 23 42 / 0.95)'}}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span style={{color: 'var(--color-gold)'}}>LOL</span>
              <span style={{color: 'var(--color-blue)'}}> 海克斯大乱斗</span>
              <span style={{color: 'var(--color-gold-light)'}}> 一图流</span>
            </div>
          </Link>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">数据来源：</span>
            <a
              href="https://v.douyin.com/wD8z-6KnGxU/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-80"
              style={{color: 'var(--color-gold-light)'}}
              title="抖音：@乱斗Asuka（月遇花海）"
            >
              @乱斗Asuka（月遇花海）
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
