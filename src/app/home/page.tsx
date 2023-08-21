import Topbar from '@/src/components/Topbar';

export default function Home() {
  return (
    <div className='home_container w-full max-w-6xl mx-auto bg-orange-500'>
    <section className='flex flex-col'>
      <Topbar />
      {/* Searh  / Notification */} 
      {/* Posts */}
      <h1 className="text-green-500">Hello World!!!!!</h1>
    </section>
    <section className='bg-cream'>
      {/* 차후 웹에서 이용할 공간 임시로 배경만 채움 */}
    </section>
    </div>
  );
}
