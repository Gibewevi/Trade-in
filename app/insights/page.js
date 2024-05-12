import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import TweetDeck from '../components/insight/TweetDeck';

export default async function Page() {
    const tweets = await prisma.tweet.findMany();
    return (
        <div className="flex flex-col items-center justify-center w-full pt-[90px] bg-slate-200">
            <TweetDeck tweets={tweets}/>
        </div >
    );
}
