import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  infiniteFeed:publicProcedure.input(
    z.object({
      limit: z.number().optional(), 
      cursor:z.object({ id:z.string(),createdAt:z.date()}).optional()
    })
    ).query(async({input:{limit=10,cursor},ctx})=>{
      ctx.prisma.tweet.findMany({
    take:limit+1,
    cursor:cursor? {createdAt_id:cursor}:undefined,
    orderBy:[{createdAt:"desc"},{id:"desc"}]
  })
}),
  create: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input: { text }, ctx }) => {
      const tweet=ctx.prisma.tweet.create({
        data: { content: text, userId: ctx.session.user.id },
      });
      return tweet
    }),
});
