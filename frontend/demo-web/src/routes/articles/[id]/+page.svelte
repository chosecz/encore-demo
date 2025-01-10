<script lang="ts">
  const { data } = $props();
  const article = data.article;
</script>

<svelte:head>
  <title>{article.title} - Article Details</title>
</svelte:head>

<div class="article-detail">
  <h1>{article.title}</h1>

  <div class="metadata">
    <span class="status">Status: {article.status}</span>
    <span class="date">Created: {new Date(article.created_at).toLocaleDateString()}</span>
    <span class="date">Updated: {new Date(article.updated_at).toLocaleDateString()}</span>
  </div>

  <div class="description">
    <p>{article.description}</p>
  </div>

  <a href="/articles" class="back-link">← Back to Articles</a>
</div>

<style>
  .article-detail {
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .metadata {
    margin: 1rem 0;
    color: #666;
  }

  .metadata span {
    margin-right: 1.5rem;
  }

  .description {
    margin: 2rem 0;
    line-height: 1.6;
  }

  .back-link {
    display: inline-block;
    margin-top: 2rem;
    color: #0066cc;
    text-decoration: none;
  }

  .back-link:hover {
    text-decoration: underline;
  }
</style>
