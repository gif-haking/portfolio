import { defineCollection, z } from 'astro:content';

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    year: z.string(),
    client: z.string().optional(),
    coverColor: z.string().default('var(--color-surface)'),
    published: z.boolean().default(true),
    image: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { work };
