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

export const EpisodeSchema = z.object({
    id: z.string(),
    name: z.string(),
    air_date: z.string(),
    episode: z.string(),
  });

  export const CharacterDetailSchema = z.object({
    character: z.object({
      id: z.string(),
      name: z.string(),
      image: z.string(),
      species: z.string(),
      status: z.string(),
      episode: z.array(EpisodeSchema),
    }),
  });

export type Character = z.infer<typeof CharacterSchema>;
export type CharactersData = z.infer<typeof CharactersSchema>;
export type CharacterDetailType = z.infer<typeof CharacterDetailSchema>;
