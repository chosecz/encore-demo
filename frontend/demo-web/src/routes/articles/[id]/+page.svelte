<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/Button.svelte";

  let { data, form } = $props();
  let article = $derived(data.article);
  let user = $derived(data.user);
  let nl2br = (text: string) => text.replace(/\n/g, "<br>");

  function confirmDelete() {
    return confirm("Are you sure you want to delete this article?");
  }
</script>

<svelte:head>
  <title>{article.title}</title>
</svelte:head>

<div class="article-detail">
  <h1>{article.title}</h1>

  <div class="metadata">
    <span class="status">Status: {article.status}</span>
    <span class="date">Created: {new Date(article.createdAt).toLocaleDateString()}</span>
    <span class="date">Updated: {new Date(article.updatedAt).toLocaleDateString()}</span>
    <span class="author">Author: {article.author.name}</span>
  </div>

  {#if article.imageUrl}
    <img class="article-image" src={article.imageUrl} alt={article.title} />
  {/if}

  <div class="description">
    <p>{@html nl2br(article.description)}</p>
  </div>

  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}

  {#if article.status === "draft" && article.authorId === user?.id}
    <div class="buttons">
      <form method="post" action="?/publish" use:enhance>
        <input type="hidden" name="articleId" value={article.id} />
        <Button type="submit" variant="primary">Publish</Button>
      </form>
      <form
        method="post"
        action="?/delete"
        use:enhance={(submitEvent) => {
          if (!confirmDelete()) {
            return submitEvent.cancel();
          }
        }}
      >
        <input type="hidden" name="articleId" value={article.id} />
        <Button type="submit" variant="secondary">Delete</Button>
      </form>
    </div>
  {/if}

  <a href="/articles" class="back-link">← Back to Articles</a>
</div>

<style>
  .buttons {
    display: flex;
    gap: 1rem;
  }

  .article-image {
    max-width: 100%;
    height: auto;
    margin-bottom: 1rem;
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
