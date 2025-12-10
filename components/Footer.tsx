export default function Footer() {
  return (
    <footer className="border-t py-6" style={{borderColor: 'rgb(200 155 60 / 0.2)', backgroundColor: 'rgb(15 23 42 / 0.95)'}}>
      <div className="container mx-auto px-4">
        <div className="text-center text-sm" style={{color: 'rgb(240 230 210 / 0.5)'}}>
          <p className="mb-2">&copy; 2025 LoL Brawl Wiki. Built with Next.js & Tailwind CSS.</p>
          <p className="text-xs">
            本站数据来自英雄联盟官方API，不隶属于 Riot Games。
          </p>
        </div>
      </div>
    </footer>
  );
}
