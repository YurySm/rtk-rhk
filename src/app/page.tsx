import Link from "next/link";

export default function Home() {
  return (
      <div
          className="max-w-[1440px] mx-auto min-h-screen px-1 pt-8 pb-20 font-[family-name:var(--font-geist-sans)]">
          <h1 className={'font-medium text-6xl'}>Главная</h1>
          <Link href={'/products'}>На страницу продуктов</Link>
      </div>
  )
}
