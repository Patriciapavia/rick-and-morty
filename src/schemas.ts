// src/schemas.ts
import { z } from 'zod';

export const CharacterSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string().url(),
  species: z.string(),
  status: z.string(),
  __typename: z.literal('Character'),
});

export const CharactersSchema = z.object({
  characters: z.object({
    results: z.array(CharacterSchema),
    __typename: z.literal('Characters'),
  }),
});

export type Character = z.infer<typeof CharacterSchema>;
export type CharactersData = z.infer<typeof CharactersSchema>;