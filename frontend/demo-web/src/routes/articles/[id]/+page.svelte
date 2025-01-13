<script lang="ts">
  import { enhance } from "$app/forms";

  let { data, form } = $props();
  let article = $derived(data.article);
  let user = $derived(data.user);
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

  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}

  {#if article.status === "draft" && article.author_id === user?.id}
    <form method="post" action="?/publish" use:enhance>
      <input type="hidden" name="articleId" value={article.id} />
      <button type="submit">Publish</button>
    </form>
  {/if}

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
