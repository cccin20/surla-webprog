const fallbackImage =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80";

export const toDisplayArticle = (article) => ({
  ...article,
  id: article._id || article.id || article.slug,
  name: article.slug || article.name,
  image: article.image || fallbackImage,
  content: Array.isArray(article.content)
    ? article.content
    : String(article.content || "")
        .split("\n\n")
        .filter(Boolean),
});

export default toDisplayArticle;
