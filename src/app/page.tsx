import { Button } from "@/components/ui/button"
import Link from "next/link"

function page() {
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center bg-gradient-to-tr from-slate-600 to-red-600 gap-6">
      <Button className="h-[50px] text-[18px] flex items-center">
        <Link href={"/wedding"}>🕺 Wedding Anniversary 💃</Link>
      </Button>
      <Button className="h-[50px] text-[18px] flex items-center">
        <Link href={"/welcome"}>✨ Welcoming Little One ✨</Link>
      </Button>
    </div>
  )
}

export default page