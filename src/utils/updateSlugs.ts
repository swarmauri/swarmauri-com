import { UpdatePost } from "../types";

type UpdatePostWithLegacyPath = UpdatePost & {
  legacyPath?: string;
};

export function getUpdateSlug(post: UpdatePostWithLegacyPath): string {
  if (post.slug) return post.slug;

  if (post.legacyPath) {
    const legacySlug = post.legacyPath
      .split("/")
      .filter(Boolean)
      .at(-1);

    if (legacySlug) return legacySlug;
  }

  return post.id;
}
